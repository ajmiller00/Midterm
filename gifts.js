var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";

http.createServer(function (req, res) {
	file1 = 'gifts.html';
    fs.readFile(file1, function(err, txt) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write(txt);
    });
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { console.log("Connection err: " + err); return; }
        
        var dbo = db.db("reveauchocolat");
        var coll = dbo.collection('products');
	    theQuery = {gift: true};
	    
		coll.find(theQuery).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("<!DOCTYPE html><html lang='en' dir='lt'><head><meta charset='utf-8'>");
		    	res.write("<meta name='keywords' content='chocolate, gourmet, fine, truffle, French, Cambridge, gifts, milk, dark, white, chocolatier, catering'>");
        		res.write("<meta name='viewport' content='width=device-width, initial-scale=1'>");
        		res.write("<link rel='stylesheet' type = 'text/css' href= 'style.css'>");
        		res.write("<link rel='preconnect' href='https://fonts.googleapis.com'>");
        		res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
        		res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
        		res.write("<link rel='preconnect' href='https://fonts.googleapis.com'>");
        		res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
        		res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
        		res.write("<link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");
        		res.write("<title>Rêve au Chocolat</title></head><body><header><a href='index.html'><img src='logo-06.png' class='header'/></a>");
            	res.write("<nav><ul><li><a href='about_us.html'>About Us</a></li><li><a href='products.html'>Shop</a> </li><li><a href='catering.html'>Catering</a></li>");
                res.write("<li><a style='text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></nav>");
				res.write("<div class='burger' id = 'bur'><img src='burger.png' class='burger' onclick='show()'></div>");
				res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'><li><a href='about_us.html'>About Us</a></li><li><a href='products.html'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></div></header>");
				
				res.write("<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Javascript~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->");

       			res.write("<script type='text/javascript'>");
				res.write("window.onload = function() { if (document.getElementById('bur').style.display == 'none') { document.getElementById('burger').style.display = 'none';}}");
				res.write("function costCalc() { const myArr = this.name.split('amount'); id = myArr[1]; cost = items[id].cost * this.selectedIndex; costs[id] = cost;}");
				res.write("function totCalc() { mes = ''; total = 0; for (i = 0; i < 15; i++) { if (costs[i] != 0) {");
				res.write("num = costs[i] / items[i].cost; mes += num + ' ' + items[i].name + ' $'; mes += costs[i] + '<br>'; total += costs[i]; } }");
				res.write("if (mes == '') {return;} mes += '<br>Total Price: $' + total; document.getElementById('totalMes').innerHTML = mes; }");
				res.write("function show() { if (document.getElementById('burger').style.display == 'none') { document.getElementById('burger').style.display = 'block';");
                res.write("} else { document.getElementById('burger').style.display = 'none'; } }");
                res.write(`function select(name) { s = ""; s = "<select name='" + name + "' size='1' onchange = 'costCalc.call(this)' >"; for (i = 0; i < 11; i++) {`);
                res.write(`s += "<option value='" + i + "'>" + i + "</option>";} s += "</select>";document.writeln(s)}`);
				// res.write("function select(name) { s = ''; s = '<select name=&quot;' + name + '&quot; size=&quot;1&quot; onchange = &quot;costCalc.call(this)&quot; >'; for (i = 0; i < 11; i++) {");
    //             res.write("s += '<option value=&quot;' + i + '&quot;>' + i + '</option>';} s += '</select>';document.writeln(s)}");
				res.write("function giftItem (name, cost) { this.name = name; this.cost = cost; }");

            	res.write("items = new Array(");
            	for (i=0; i<items.length; i++) {
            		res.write("new giftItem('" + items[i].name + "', " + items[i].price + ")");
            		if (i != items.length - 1) res.write(", ");
            	}
                res.write(")");
				res.write("costs = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);</script>");

				res.write("<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Javascript~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->");

				res.write("<form class='giftFor' action='index.html' method='pos'><div class='gifts'><h1>Gifts</h1><div style ='margin-top: 0px;' class='gItem'>");

				for (i=0; i<items.length; i++) {
					res.write("<img src='" + items[i].img + "' class='gift'");
					res.write("<h2>" + items[i].name + "</h2>");
					res.write("<h2> $" + items[i].price + "</h2>");
	                res.write("<h3 class = 'des'>"+ items[i].desc + "</h3>");
	                res.write("<!-- ~~~~~~~~~~~~~~~~Javascript~~~~~~~~~~~~~~~~~~~ -->");
	                res.write("<script type='text/javascript'> select('amount' + 0);</script>");
	                res.write("<!-- ~~~~~~~~~~~~~~~~Javascript~~~~~~~~~~~~~~~~~~~ -->");
	                res.write("</div>");
	            }

	            res.write("<h5 style='visibility: hidden;'>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h5>");
				res.write("</div><div class='total' onclick='totCalc()'><h3 id='total'>Get Total</h3></div><h3 id='totalMes' ></h3></form>");
				res.write("<footer>&copy; 2021 Rêve au Chocolat – 23 Fausse Street, Cambridge, MA – (617) 555 0113</footer></body></html>");




			  // //res.write("Items: ");
			  // //res.write(items.length);
			  // for (i=0; i<items.length; i++)
				 //  res.write(items[i].name + "<br>");
		    } 
		    res.end();
		  	db.close();
		});
	});

}).listen(8080);