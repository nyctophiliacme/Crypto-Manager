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
	if(request.body.type == 'sell')
	{
		type = 2;
	}
	var date = request.body.date;
	var volume = parseFloat(request.body.volume);
	var price_per_unit = parseFloat(request.body.price_per_unit);
	var extra_fees = parseFloat(request.body.extra_fees);

	const qry = {
		name: 'insert-transaction',
		text: 'INSERT INTO TRADE(cryptocurrency, type, date, volume, price_per_unit, extra_fees) VALUES ($1, $2, $3, $4, $5, $6)',
		values: [cryptocurrency, type, date, volume, price_per_unit, extra_fees]
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
	console.log(request.body.cryptocurrency);
	console.log("Check");
});
app.listen(3000, function () {
	console.log('Server is running. Point your browser to: http://localhost:3000');
});

var cryptos = [ 'bitcoin', 'ethereum', 'litecoin', 'ripple', 'bitcoin-cash' ];

app.post('/displayServer',function(request, response){
  	response.setHeader('Content-Type', 'application/json');

  	console.log("In displayServer");
  	var data = new Array();

    func1(func2);    
    function func1(callback)
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
			client.query(qry, (err, res) => {
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.rows.forEach(function(row)
					{
						sum += parseFloat(row.price_per_unit);
					});
					var temp = {
						"cryptocurrency" : crypto,
						"sum" : sum
					}; 
					data.push(temp);
					count++;
				}
				// console.log(data);
				if(cryptos.length == count)
				{
					callback();
				}
			});	
		});
    }
    function func2()
  	{
  		console.log(data);
		response.send(JSON.stringify({
			result: 'success',
			data: data
		}));
    }
});