var cryptoPrices = new Array();
$(document).ready(function()
{
	makeAjaxCall().then(dataFromServer, errorHandler);
	$(".results").css('display', 'none');
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
function precisionRound(number, precision) 
{
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}
function displayData(result)
{
	var total_buy = 0, total_sell = 0, total_profit = 0;
	result.data.forEach(function(row)
	{
		// console.log(row.cryptocurrency);
		total_buy += row.net_buy_price;
		total_sell += row.net_sell_price;
		total_profit += row.current_profit;
		var attr = "Net Profit:", flag = "profit", cur_profit = row.current_profit;
		if(row.current_profit < 0)
		{
			attr = "Net Loss:";
			flag = "loss";
			cur_profit = Math.abs(row.current_profit);
		}
		if(row.net_buy_volume != 0)
		{

			var string = `
			<div class = "flip-container">
				<div class = "flipper">
					<div class = "front">
						<div class = 'cont-title'>
							`+row.cryptocurrency+`
						</div>
						<div class = "image-front">
							<img class = "crypto-image-front" src = "`+row.crypto_image+`">
						</div>
						<div class = 'cont-profit'>
							<div class = 'div-row'>
								<span class = 'attr-name'>`+attr+`</span>
								<span class = 'attr-value `+flag+`'>`+cur_profit+`</span>
							</div>
						</div>
						<div class = "cont-current">
							<div class = 'div-row'>
								<span class = 'attr-name'>Current Volume:</span>
								<span class = 'attr-value'>`+row.current_volume+`</span>
							</div>
							<div class = 'div-row'>
								<span class = 'attr-name'>Current Value:</span>
								<span class = 'attr-value'>`+row.current_value+`</span>
							</div>
						</div>
					</div>
					<div class = "back">
						<div class = "image-back">
							<img class = "crypto-image-back" src = "`+row.crypto_image+`">
						</div>
						<div class = "cont-buy">
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
						<div class = "cont-sell">
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
				</div>
			</div>`;
			$(".flex-container").append(string);
		}
	});
	
	$("#total-buy").text(precisionRound(total_buy,3));
	$("#total-sell").text(precisionRound(total_sell,3));
	$("#total-profit").text(precisionRound(total_profit,3));
	$("#total-profit").css('color', 'red');
	console.log(total_profit);
	if(total_profit < 0 )
	{
		$("#total-profit-attr").text("Net Loss:");
		$("#total-profit").css('color', '#e74c3c');
	}
	else
	{
		$("#total-profit-attr").text("Net Profit:");
		$("#total-profit").css('color', '#2ecc71');
	}
	$(".results").css('display', 'flex');
	flipperHandler();
}
function flipperHandler()
{
	$('.front').click(function() 
	{
    	$(this).parent().css({'transform' : 'rotateY(180deg)'});
	});
	$('.back').click(function() 
	{
    	$(this).parent().css({'transform' : 'rotateY(0deg)'});
	});
}
function errorHandler(error)
{
	console.log(error);
}
function siteSelector(n)
{
	var fileName;
	switch(n)
	{
		case "1": 
			fileName = "index.html";
			break;
		case "2":
			fileName = "insert.html";
			break;
		case "3":
			fileName = "display.html";
			break;
		default:
			fileName = "#";
	}
	window.location.replace(fileName);
}