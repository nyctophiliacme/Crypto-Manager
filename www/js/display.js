var cryptoPrices = new Array();
$(document).ready(function()
{
	makeAjaxCall().then(dataFromServer, errorHandler);
});	
function makeAjaxCall()
{
	var promiseObj = new Promise(function(resolve, reject)
	{
		$.ajax({
			url: 'https://koinex.in/api/ticker',
			type: 'get',
			success: function(result)
			{
				// console.log(result);
				cryptoPrices.push(
					{crypto: "bitcoin", price: result.prices.BTC},
					{crypto: "ethereum", price: result.prices.ETH},
					{crypto: "litecoin", price: result.prices.LTC},
					{crypto: "ripple", price: result.prices.XRP},
					{crypto: "bitcoin-cash", price: result.prices.BCH}
				);
				// console.log(cryptoPrices);
				resolve();
			},
			error: function(error)
			{
				console.log("error");
				reject(error);
			}
		});
	});
	return promiseObj;
}

function dataFromServer()
{
	$.ajax({
		url: '/displayServer',
		type: 'post',
		data: {
			jsonData: cryptoPrices
		},
		success: function(result)
		{
			console.log(result);
			displayData(result);
		},
		error: function(error)
		{
			console.log(error);
		}			
	});
}
function displayData(result)
{
	result.data.forEach(function(row)
	{
		console.log(row.cryptocurrency);
		var attr = "Net Profit:", flag = "profit", cur_profit = row.current_profit;
		if(row.current_profit < 0)
		{
			attr = "Net Loss:";
			flag = "loss";
			cur_profit = abs(row.current_profit);
		}
		if(row.net_buy_volume != 0)
		{
			var string = `
			<div class = 'container'>
				<div class = 'cont-title'>
					`+row.cryptocurrency+`
				</div>
				<div class = 'cont-profit'>
					<div class = 'div-row'>
						<span class = 'attr-name'>`+attr+`</span>
						<span class = 'attr-value `+flag+`'>`+cur_profit+`</span>
					</div>
				</div>
				<div class = 'cont-net'>
					<div class = 'net-item'>
						<div class = 'div-row'>
							<span class = 'attr-name'>Net Buy Volume:</span>
							<span class = 'attr-value'>`+row.net_buy_volume+`</span>
						</div>
						<div class = 'div-row'>
							<span class = 'attr-name'>Price:</span>
							<span class = 'attr-value'>`+row.net_buy_price+`</span>
						</div>
						<div class = 'div-row'>
							<span class = 'attr-name'>Average Cost:</span>
							<span class = 'attr-value'>`+row.avg_buy_cost+`</span>
						</div>
					</div>
					<div class = 'net-item position-right'>
						<div class = 'div-row'>
							<span class = 'attr-name'>Net Sell Volume:</span>
							<span class = 'attr-value'>`+row.net_sell_volume+`</span>
						</div>
						<div class = 'div-row'>
							<span class = 'attr-name'>Price:</span>
							<span class = 'attr-value'>`+row.net_sell_price+`</span>
						</div>
						<div class = 'div-row'>
							<span class = 'attr-name'>Average Cost:</span>
							<span class = 'attr-value'>`+row.avg_sell_cost+`</span>
						</div>
					</div>
				</div>
				<div class = 'cont-current'>
					<div class = 'div-row'>
						<span class = 'attr-name'>Current Volume:</span>
						<span class = 'attr-value'>`+row.current_volume+`</span>
					</div>
					<div class = 'div-row'>
						<span class = 'attr-name'>Current Value:</span>
						<span class = 'attr-value'>`+row.current_value+`</span>
					</div>
				</div>
			</div>`
			$("body").append(string);
		}
	});
}
function errorHandler(error)
{
	console.log(error);
}