$(document).ready(function()
{
	dateHandler();
	changeHandlers();
	$('#submitButton').click(validate);
});	
function precisionRound(number, precision) 
{
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}
function dateHandler()
{
	n =  new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	if(d<10) 
	{
	    d = '0'+d;
	} 
	if(m<10) 
	{
	    m = '0'+m;
	} 
	$("input[name='date']").val(d + "/" + m + "/" + y);
	$("#datepicker").datepicker({
		changeMonth: true,
  		changeYear: true,
  		dateFormat: "dd/mm/yy"
	});
}
function changeHandlers()
{
	$("input[name='volume']").change(function() 
	{
		var temp = precisionRound($(this).val() * $("input[name='price_per_unit']").val(), 5);
    	$("input[name='price']").val(temp);
    	tradeFeesHelper();
	});

	$("input[name='price_per_unit']").change(function() 
	{
		var temp = precisionRound($(this).val() * $("input[name='volume']").val(), 5);
    	$("input[name='price']").val(temp);
    	tradeFeesHelper();
	});

	$("input[name='buy_or_sell']").change(function()
	{
		tradeFeesHelper();
	});
}
function tradeFeesHelper()
{
	if($("input[name='buy_or_sell']:checked").val() === 'buy')
	{
		$("input[name='fees']").val(precisionRound($("input[name='price']").val() * 0.0025, 5));
	}
	else if($("input[name='buy_or_sell']:checked").val() === 'sell')
	{
		$("input[name='fees']").val("0");
	}
	totalHelper();
}
function totalHelper()
{
	var tot = parseFloat($("input[name='price']").val()) + parseFloat($("input[name='fees']").val()) + parseFloat($("input[name='extra_fees']").val());
	// console.log(tot);
	$("input[name='total']").val(tot);
}
function validate(evt)
{
	evt.preventDefault();
	evt.stopPropagation();
	if( ! $("input[name='date']").val() )
	{	
		$("input[name='date']").focus();
		alert("Please enter the Date of Transaction!");
	}
	else if( ! $("input[name='volume']").val() )
	{	
		$("input[name='volume']").focus();
		alert("Please enter the volume!");
	}
	else if( ! $("input[name='price_per_unit']").val() )
	{	
		$("input[name='price_per_unit']").focus();
		alert("Please enter Price per Unit!");
	}
	else if( ! $("input[name='extra_fees']").val() )
	{	
		$("input[name='extra_fees']").focus();
		alert("Please enter the Extra Fees charged!");
	}
	else
	{
		insertFunction();
	}
}
function insertFunction()
{
	var tempDate = $('#datepicker').datepicker('getDate');
	var finalDate = $.datepicker.formatDate("yy-mm-dd", tempDate);
	console.log(finalDate);

	$.ajax({
		url: '/insertServer',
		type: 'post',
		data: {
			cryptocurrency: $("select[name='crypto']").val(),
			type: $("input[name='buy_or_sell']:checked").val(),
			date: finalDate,
			volume: $("input[name='volume']").val(),
			price_per_unit: $("input[name='price_per_unit']").val(),
			price: $("input[name='price']").val(),
			fees: $("input[name='fees']").val(),
			extra_fees: $("input[name='extra_fees']").val(),
			total: $("input[name='total']").val()
		},
		success: function(result)
		{
			console.log(result.result);
			if(result.result === 'success')
			{
				messageHandler("#success-top");
				setInterval(function()
				{
					window.location.replace("insert.html");
				},3000);
				// window.location.replace("insert.html");
			}
		},
		error: function(error)
		{
			messageHandler("#failure-top");
			console.log(error);
		}			
	});
}
function messageHandler(var1)
{
	$(var1).animate({
		top: "0px"
	}, 1000);

	setInterval(function()
	{
		$(var1).animate({
			top: "-50px"
		}, 1000);
	},2000);
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