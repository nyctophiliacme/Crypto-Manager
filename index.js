const Client = require('pg').Client;

const connectionString = "postgresql://pransh:root@localhost:5432/koinex";

const client = new Client({
	connectionString: connectionString,
});
client.connect();

var crypto = 'Bitcoin';
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
		// console.log(res.rows[0].id);
		res.rows.forEach(function(row)
		{
			console.log(row.price_per_unit);
		});
	}
	client.end();
});