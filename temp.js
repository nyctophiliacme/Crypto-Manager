var http = requestuire("http");
var conString = "postgresql://pransh:root@localhost:5432/koinex";
const Pool = requestuire('pg').Pool;

const pool = new Pool({
  user: 'pransh',
  host: 'localhost',
  database: 'koinex',
  password: 'root',
  port: 5432,
});

pool.query("INSERT INTO TRADE(cryptocurrency, type, date, volume, price_per_unit, price, fees, total) values ('Bitcoin', 1, '2017-05-11', 5.0, 2.0, 10.0, 1.0, 11.0)", function(err, res){
  if(err)
  	{
  		console.log(err);
  	}
  	else
	{
		console.log("Query ran Successfully");
	}
  pool.end();
})

const Client = requestuire('pg').Client;

const client = new Client({
  user: 'pransh',
  host: 'localhost',
  database: 'koinex',
  password: 'root', 
  port: 5432,
});
client.connect();

client.query("INSERT INTO TRADE(cryptocurrency, type, date, volume, price_per_unit, price, fees, total) values ('Bitcoin', 1, '2017-05-11', 5.0, 2.0, 10.0, 1.0, 11.0)", function(err, res){
  if(err)
  	{
  		console.log(err);
  	}
  	else
	{
		console.log("Query ran Successfully");
	}
  client.end();
});










//Callback

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



    //Bad UI

    <div class = 'container'>
    <div class = 'cont-title'>
      Ripple (XRP)
    </div>
    <div class = 'cont-profit'>
      <div class = 'div-row'>
        <span class = 'attr-name'>Net Profit:</span>
        <span class = 'attr-value profit-loss'>123.0</span>
      </div>
    </div>
    <div class = 'cont-net'>
      <div class = 'net-item'>
        <div class = 'div-row'>
          <span class = 'attr-name'>Net Buy Volume:</span>
          <span class = 'attr-value'>40</span>
        </div>
        <div class = 'div-row'>
          <span class = 'attr-name'>Price:</span>
          <span class = 'attr-value'>343</span>
        </div>
        <div class = 'div-row'>
          <span class = 'attr-name'>Average Cost:</span>
          <span class = 'attr-value'>3434</span>
        </div>
      </div>
      <div class = 'net-item position-right'>
        <div class = 'div-row'>
          <span class = 'attr-name'>Net Sell Volume:</span>
          <span class = 'attr-value'>40</span>
        </div>
        <div class = 'div-row'>
          <span class = 'attr-name'>Price:</span>
          <span class = 'attr-value'>343</span>
        </div>
        <div class = 'div-row'>
          <span class = 'attr-name'>Average Cost:</span>
          <span class = 'attr-value'>3434</span>
        </div>
      </div>
    </div>
    <div class = 'cont-current'>
      <div class = 'div-row'>
        <span class = 'attr-name'>Current Volume:</span>
        <span class = 'attr-value'>40</span>
      </div>
      <div class = 'div-row'>
        <span class = 'attr-name'>Current Value:</span>
        <span class = 'attr-value'>40</span>
      </div>
    </div>
  </div>



  <style type="text/css">
    body
    {
      margin: 0 15%;
        background-color: #ecf0f1;  
    }
    .container
    {
      background-color: #2c3e50;
      margin-bottom: 30px;
      color: #f1f2f6;
      padding: 10px;
      border-radius: 10px;
    }
    .div-row
    {
      display: table-row; 
    }
    .div-row span
    {
      padding: 3px 8px;
      display: table-cell;
    }
    .profit-loss
    {
      color: #2ecc71;
    }
    .cont-net
    {
      display: flex;
      justify-content: space-between;
    }
    .attr-name
    {
      text-align: right;
      font-family: "Comic Sans MS", cursive, sans-serif;
      /*font-size: 1.1em;*/
      letter-spacing: 1.2px;
    }
    .attr-value
    {
      color: #48dbfb;
      font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    }
    .profit
    {
      color: #2ecc71;
    }
    .loss
    {
      color: #e74c3c;
    }
    .position-right
    {
      margin-right: 5%;
    }
    .cont-net
    {
      border-bottom: solid #f1f2f6 2px;
      border-top: solid #f1f2f6 2px;
      padding: 15px 0;
    }
    .cont-current
    {
      padding: 15px 0;
    }
    .cont-profit
    {
      padding: 15px 0;
      font-size: 1.05em;
    }
    .cont-profit .attr-value
    {
      font-weight: bold;
      
    }
    .cont-title
    {
      background-color: #f1f2f6;
      color: #2c3e50;
      border: 1px solid #2c3e50;
      border-radius: 5px;
      padding: 8px 15px 8px 15px;
      font-family: Verdana;
      font-weight: bold;
      font-size: 1.2em;
      display: inline-block;
    }
  </style>