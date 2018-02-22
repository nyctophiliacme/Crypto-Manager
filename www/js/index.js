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
function insertFunction()
{
	window.location = "insert.html"
}
function displayFunction()
{
	window.location = "display.html"
}