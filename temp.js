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
