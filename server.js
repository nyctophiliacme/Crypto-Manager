var express = require('express');
app = express();
bodyParser = require('body-parser');
path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'www')));

const Client = require('pg').Client;
const connectionString = "postgresql://pransh:root@localhost:5432/koinex";
const client = new Client({
	connectionString: connectionString,
});
client.connect();
app.post('/insertServer',function(request, response){
	response.setHeader('Content-Type', 'application/json');

	var cryptocurrency = request.body.cryptocurrency;
	var type = 1;
	if(request.body.type === 'sell')
	{
		type = 2;
	}
	var date = request.body.date;
	var volume = parseFloat(request.body.volume);
	var price_per_unit = parseFloat(request.body.price_per_unit);
	var price = parseFloat(request.body.price);
	var fees = parseFloat(request.body.fees);
	var extra_fees = parseFloat(request.body.extra_fees);
	var total = parseFloat(request.body.total);
	const qry = {
		name: 'insert-transaction',
		text: 'INSERT INTO TRADE(cryptocurrency, type, date, volume, price_per_unit, price, fees, extra_fees, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
		values: 				[cryptocurrency, type, date, volume, price_per_unit, price, fees, extra_fees, total]
	}
	console.log(qry);
	client.query(qry, 
		function(err, res){
			if(err)
			{
				console.log(err);
				response.send(JSON.stringify({
					result: 'error'
				}));			
			}
			else
			{
				console.log("Success");
				response.send(JSON.stringify({
					result: 'success'
				}));			
			}
		});
});
app.listen(3000, function () {
	console.log('Server is running. Point your browser to: http://localhost:3000');
});

var cryptos = [ 'bitcoin', 'ethereum', 'litecoin', 'ripple', 'bitcoin-cash' ];
var cryptoDisplayName = ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)', 'Ripple (XRP)', 'Bitcoin Cash (BCH)'];

function precisionRound(number, precision) 
{
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

app.post('/displayServer',function(request, response){
  	response.setHeader('Content-Type', 'application/json');

  	console.log("In displayServer");
  	var data = new Array();
  	var jsonData = request.body.jsonData;
  	var cryptoPrice = new Array();
  	jsonData.forEach(function(row)
	{
		cryptoPrice.push(row.price);
	});
	// console.log(cryptoPrice);
    calculateResults().then(sendResults, errorHandler);

    function calculateResults()
    {
    	var promiseObj = new Promise(function(resolve, reject)
    	{
    		var count = 0;
	    	cryptos.forEach(function(crypto)
			{
				var sum = 0;
				const qry = {
					name: 'fetch-transaction',
					text: 'SELECT * FROM trade WHERE cryptocurrency = $1',
					values: [crypto]
				}
				client.query(qry, (err, res) => 
				{
					if(err)
					{
						console.log("err");
						reject(err);
					}
					else
					{
						var net_buy_volume = 0, net_buy_price = 0, net_sell_volume = 0, net_sell_price = 0;
						res.rows.forEach(function(row)
						{
							// console.log(row);
							if(row.type == 1)
							{
								net_buy_volume += parseFloat(row.volume);
								net_buy_price += parseFloat(row.total);
							}
							else if(row.type == 2)
							{
								net_sell_volume += parseFloat(row.volume);
								net_sell_price += parseFloat(row.total);
							}
						});
						var current_invest = net_buy_price - net_sell_price;
						var current_volume = net_buy_volume - net_sell_volume;
						var current_value = current_volume * cryptoPrice[count];
						var current_profit = current_value + net_sell_price - net_buy_price;
						var avg_buy_cost = 0;
						if(net_buy_volume !=0 )
						{
							avg_buy_cost = net_buy_price / net_buy_volume;
						}
						var avg_sell_cost = 0;
						if(net_sell_volume !=0 )
						{
							avg_sell_cost = net_sell_price / net_sell_volume;
						}
						var temp = {
							"cryptocurrency" : cryptoDisplayName[count],
							"net_buy_volume" : precisionRound(net_buy_volume,5),
							"net_buy_price" : precisionRound(net_buy_price,3),
							"net_sell_volume" : precisionRound(net_sell_volume,5),
							"net_sell_price" : precisionRound(net_sell_price,3),
							"current_invest" : current_invest,
							"current_volume" : precisionRound(current_volume, 5),
							"current_value" : precisionRound(current_value, 3),
							"current_profit" : precisionRound(current_profit,2),
							"avg_buy_cost": precisionRound(avg_buy_cost,5),
							"avg_sell_cost": precisionRound(avg_sell_cost,5),
						}; 
						data.push(temp);
						count++;
						if(cryptos.length == count)
        				{
          					resolve();
        				}
					}
				});	
			});
		});	
		return promiseObj;
    }
    function sendResults()
  	{
  		// console.log(data);
		response.send(JSON.stringify({
			result: 'success',
			data: data
		}));
    }
    function errorHandler(error)
	{
		console.log(error);
	}
});