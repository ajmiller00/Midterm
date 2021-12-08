var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";

var port = 8080;

app.get('/', (req, res) => {

    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { console.log("Connection err: " + err); return; }
        
        var dbo = db.db("reveauchocolat");
        var coll = dbo.collection('products');
	    
	    theQuery0 = {gift: true};

	    coll.find(theQuery0).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("<!DOCTYPE html><html lang='en'><head><script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=' crossorigin='anonymous'>");
		    	res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
    			res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
    			res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
    			res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");

				res.write("<title>Gifts</title><link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style.css'>");
    			res.write("<style type = 'text/css'> body { font-family: 'Amaranth', sans-serif; } .img { max-width: 290px; max-height: 330px; background-size: cover; }");
        		res.write(".column { float: left; width: 25%; padding: 10px; height: 600px; border-right: 2px solid #003267; border-left: 2px solid #003267; font-weight: 600pt; font-size: 24pt; text-align:center; box-sizing: border-box;}");
        		res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p { font-size: 15px; font-weight:300; }");
       			res.write("#products { background-color: #FCECC8; } #message { text-align:center; } #submit { text-align:center; }");
        		res.write("@media (max-width: 991px) { .column { width: 50%; } } @media (max-width:767px) { .img { max-width:200px; } }");
       			res.write("@media (max-width:479px) { h4 { font-size:20px; } .img { max-width: 150px; } } </style></head>");

       			res.write("<body><header><a href='index.html'><img src='https://ajmiller00.github.io/Midterm/logo-06.png' class='header'/></a>");
            	res.write("<nav><ul><li><a href='about_us.html'>About Us</a></li><li><a href='products.html' style='text-decoration: underline; text-underline-position: under; box-sizing: border-box;'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></nav>");
				res.write("<div class='burger' id = 'bur'><img src='https://ajmiller00.github.io/Midterm/burger.png' class='burger' onclick='show()'></div>");
				res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'><li><a href='about_us.html'>About Us</a></li><li><a href='products.html'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></div></header>");

                res.write("<div id = 'products'><h1>Gifts</h1>");
                
		    	res.write("<script language = 'javascript'>");
    			res.write("function product(name, cost) { this.name = name; this.cost = cost; } ");
		    	res.write("menuItems = new Array(");
		    	for (i=0; i<items.length; i++) {
            		res.write("new product(\"" + items[i].name + "\", " + items[i].price + ")");
					if (i != items.length - 1) res.write(", ");
            	}
                res.write(");");
				
				res.write("function makeSelect(name, minRange, maxRange){ var t= \"\"; t = \"<select id='\" + name + \"' size='1'>\"; for (j=minRange; j<=maxRange; j++)"); //
				res.write("t += \"<option value=\" + j+ \">\" + j + \"</option>\"; t+= \"</select>\"; return t; }"); // 
				
				res.write("$(document).ready(function() { $('#submit').click(function() { var totalQuantity = 0; var totalCost = 0; var msg = ''; for (i = 0; i< menuItems.length; i++) {");
                res.write("var quan = document.getElementById('quan' + i).value; if (quan != 0) { var cost = (menuItems[i].cost * quan); msg += quan + ' ' + menuItems[i].name + ' $' + cost + '<br>';");
                res.write("totalCost += parseFloat(cost);}} msg += 'Total Price: $' + totalCost; document.getElementById('totalMes').innerHTML = msg; });});");
        		res.write("function show() { if (document.getElementById('burger').style.display =='none') { document.getElementById('burger').style.display = 'block'; } else {");
        		res.write("document.getElementById('burger').style.display = 'none'; } } </script> ");
        		
            	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=\"https://ajmiller00.github.io/Midterm/" + items[i].img + "\">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	                res.write("<script language = 'javascript'>makeSelect(\"quan\" + " + i + ", 0, 10);</script>");
	            }

	            res.write("<br><br><h3>&nbsp;</h3></div>");

	            res.write("<script language='javascript'> function abc() { for (i = 0; i < menuItems.length; i++) { select = makeSelect('quan' + i, 0, 10); document.getElementsByName('product')[i].innerHTML = menuItems[i].name;");
                res.write("document.getElementsByName('price')[i].innerHTML = '$' + menuItems[i].cost.toFixed(2) + '&nbsp;&nbsp;&nbsp;&nbsp;' + select; }}");
				res.write("window.onload = abc;</script>");

    			res.write("<div class = 'total' id ='submit'><h3 id = 'total'>Get Total</h3></div><h3 id = 'totalMes'></h3>");
    			res.write("<footer>&copy; 2021 Rêve au Chocolat – 23 Fausse Street, Cambridge, MA – (617) 555 0113</footer> </body> </html>");

		    } 
		    res.end();
		  	db.close();
		});
	});

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
