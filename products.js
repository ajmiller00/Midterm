var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");

const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";

var port = process.env.PORT || 3000;
// var port = 8080;

app.get('/', (req, res) => {

    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { console.log("Connection err: " + err); return; }
        
        var dbo = db.db("reveauchocolat");
        var coll = dbo.collection('products');
	    
	    theQuery0 = {gift: false};

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

			res.write("<title>General Product Catalog</title><link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style.css'>");
			res.write("<link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style_haijun.css'>")
    			res.write("<style type = 'text/css'> body { font-family: 'Amaranth', sans-serif; } .img { max-width: 290px; max-height: 330px; background-size: cover; }");
        		res.write(".column { float: left; width: 25%; padding: 10px; height: 600px; border-right: 2px solid #003267; border-left: 2px solid #003267; font-weight: 600pt; font-size: 24pt; text-align:center; box-sizing: border-box;}");
        		res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p { font-size: 15px; font-weight:300; }");
       			res.write("#products { background-color: #FCECC8; } #message { text-align:center; } #submit { text-align:center; }");
        		res.write("@media (max-width: 991px) { .column { width: 50%; } } @media (max-width:767px) { .img { max-width:200px; } }");
       			res.write("@media (max-width:479px) { h4 { font-size:20px; } .img { max-width: 150px; } } </style></head>");

       			res.write("<header><div class='a' style='text-align:center; position: relative;'><div class='loginburger' style='position:absolute;'>");
              		res.write("<img src='https://ajmiller00.github.io/Midterm/acc_icon.png' width='30px'><a class = 'burger' href='https://reveauchocolat-myaccount.herokuapp.com/'>Profile</a>");
              		res.write("<a class = 'burger' href='https://reveauchocolat-login.herokuapp.com/'>Log In</a></div>");
			res.write("<div class='logo' style='display: inline-block;'><a href='https://ajmiller00.github.io/Midterm/index.html'><img src='https://ajmiller00.github.io/Midterm/logo-06.png' class='header'/></a></div></div>");
			res.write("<nav><ul><li><a href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
                  	res.write("<li><a href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
                  	res.write("<li><a href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    			res.write("<li><a href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
                  	res.write("<li><a href='https://reveauchocolat-cart.herokuapp.com/' style='padding:10px 20px; background-color: #ff9933; color: #003267;border: none;margin-top:  10px;cursor:pointer;-webkit-border-radius: 5px;border-radius: 4px;'>My Cart</a> </li>");
              		res.write("</ul></nav>");

          		res.write("<div class='burger' id = 'bur'><img src='https://ajmiller00.github.io/Midterm/burger.png' class='burger' onclick='show()'></div>");
			res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'>");
			res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
                  	res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
                  	res.write("<li><a class = 'burger' href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    			res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
                        res.write("<li></li><li></li><li><a class = 'burger' href='https://reveauchocolat-cart.herokuapp.com/'>My Cart</a></li></ul></div></header>");
			res.write("<body>");

                res.write("<div id = 'products'><h1>General Catalog</h1><div class='choose' style='text-align:center;'>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#chocobars>Chocolate Bars</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#ccmf>Chocolate Classics + Mixed Fruits</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#st>Signature Truffles</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#chocoBakery>Chocolate Bakery</a> &nbsp; &nbsp; &nbsp;</h3></div><br><br>");
                
			res.write("<form method = 'POST' action = '/add'>")
		    	res.write("<script language = 'javascript'>");
    			res.write("function product(name, cost) { this.name = name; this.cost = cost; } ");
		    	res.write("menuItems = new Array(");
		    	for (i=0; i<items.length; i++) {
            		res.write("new product(\"" + items[i].name + "\", " + items[i].price + ")");
					if (i != items.length - 1) res.write(", ");
            	}
                res.write(");");
				
				res.write("function makeSelect(name, minRange, maxRange){ var t= \"\"; t = \"<select name='\" + name + \"' size='1'>\"; for (j=minRange; j<=maxRange; j++)"); //
				res.write("t += \"<option value=\" + j+ \">\" + j + \"</option>\"; t+= \"</select>\"; return t; }"); // 
				
				res.write("$(document).ready(function() { $('#submit').click(function() { var totalQuantity = 0; var totalCost = 0; var msg = ''; for (i = 0; i< menuItems.length; i++) {");
                res.write("var quan = document.getElementById('quan' + i).value; if (quan != 0) { var cost = (menuItems[i].cost * quan); msg += quan + ' ' + menuItems[i].name + ' $' + cost + '<br>';");
                res.write("totalCost += parseFloat(cost);}} msg += 'Total Price: $' + totalCost; document.getElementById('totalMes').innerHTML = msg; });});");
        		res.write("function show() { if (document.getElementById('burger').style.display =='none') { document.getElementById('burger').style.display = 'block'; } else {");
        		res.write("document.getElementById('burger').style.display = 'none'; } } </script> ");
        		
		    }
		});
	    
	    theQuery1 = {gift: false, category: "Chocolate Bars"};
	    
		coll.find(theQuery1).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
            	res.write("<div id = \"chocobars\"><h2> &nbsp; &nbsp;Chocolate Bars</h2>");
            	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=\"https://ajmiller00.github.io/Midterm/" + items[i].img + "\">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	                res.write("<script language = 'javascript'>makeSelect('quan' + " + i + ", 0, 10);</script>");
	            }

		    } 
		});
	
		theQuery2 = {gift: false, category: "Chocolate Classics + Mixed Fruits"};

		coll.find(theQuery2).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("</div><h3>&nbsp;</h3><br><div id=\"ccmf\"><h2> &nbsp; &nbsp; Chocolate Classics + Mixed Fruits </h2>");
	        	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=\"https://ajmiller00.github.io/Midterm/" + items[i].img + "\">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	                res.write("<script language = 'javascript'>makeSelect('quan' + " + i + ", 0, 10);</script>");
	            }
		    } 
		});

		theQuery3 = {gift: false, category: "Signature Truffles"};

		coll.find(theQuery3).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("</div><h3>&nbsp;</h3><br><div id=\"st\"><h2> &nbsp; &nbsp; Signature Truffles </h2>");
	        	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=\"https://ajmiller00.github.io/Midterm/" + items[i].img + "\">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	    			res.write("<script language = 'javascript'>makeSelect('quan' + " + i + ", 0, 10);</script>");
	            }
		    } 
		});

		theQuery4 = {gift: false, category: "Chocolate Bakery"};

		coll.find(theQuery4).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("</div><h3>&nbsp;</h3><br><div id=\"chocoBakery\"><h2> &nbsp; &nbsp; Chocolate Bakery </h2>");
	        	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=\"https://ajmiller00.github.io/Midterm/" + items[i].img + "\">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	    			res.write("<script language = 'javascript'>makeSelect('quan' + " + i + ", 0, 10);</script>");
	            }
	            res.write("</div><br><br><h3>&nbsp;</h3></div>");

	            res.write("<script language='javascript'> function abc() { for (i = 0; i < menuItems.length; i++) { select = makeSelect('quan' + i, 0, 10); document.getElementsByName('product')[i].innerHTML = menuItems[i].name;");
                res.write("document.getElementsByName('price')[i].innerHTML = '$' + menuItems[i].cost.toFixed(2) + '&nbsp;&nbsp;&nbsp;&nbsp;' + select; }}");
				res.write("window.onload = abc;</script>");
			res.write("<div style = 'text-align:center'>")
    			res.write("<input type = 'submit' value = 'Add to Cart' class = 'button' style = 'text-align:center'>");
			res.write("</div>")
			res.write("<input type = 'hidden' name = 'item' value = '24'></form>");
    			res.write("<footer>&copy; 2021 Rêve au Chocolat – 23 Fausse Street, Cambridge, MA – (617) 555 0113</footer> </body> </html>");

		    } 
		    	res.end();
		  	db.close();
		});

	});

});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/add', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
	 
	if (err) throw err;
	var numItems = String(req.body.item);
    	var dbo = db.db('reveauchocolat');
	var products = dbo.collection('products');
	var currUser = dbo.collection('current');
	var user = dbo.collection('users');
	res.write("<!DOCTYPE html><html lang='en'><head><script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=' crossorigin='anonymous'>");
		    	res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
    			res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
    			res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
    			res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");

			res.write("<title>General Product Catalog</title><link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style.css'>");
			res.write("<link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style_haijun.css'>")
    			res.write("<style type = 'text/css'> body { font-family: 'Amaranth', sans-serif; } .img { max-width: 290px; max-height: 330px; background-size: cover; }");
        		res.write(".column { float: left; width: 25%; padding: 10px; height: 600px; border-right: 2px solid #003267; border-left: 2px solid #003267; font-weight: 600pt; font-size: 24pt; text-align:center; box-sizing: border-box;}");
        		res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p { font-size: 15px; font-weight:300; }");
       			res.write("#products { background-color: #FCECC8; } #message { text-align:center; } #submit { text-align:center; }");
        		res.write("@media (max-width: 991px) { .column { width: 50%; } } @media (max-width:767px) { .img { max-width:200px; } }");
       			res.write("@media (max-width:479px) { h4 { font-size:20px; } .img { max-width: 150px; } } </style></head>");

       			res.write("<header><div class='a' style='text-align:center; position: relative;'><div class='loginburger' style='position:absolute;'>");
              		res.write("<img src='https://ajmiller00.github.io/Midterm/acc_icon.png' width='30px'><a class = 'burger' href='https://reveauchocolat-myaccount.herokuapp.com/'>Profile</a>");
              		res.write("<a class = 'burger' href='https://reveauchocolat-login.herokuapp.com/'>Log In</a></div>");
			res.write("<div class='logo' style='display: inline-block;'><a href='https://ajmiller00.github.io/Midterm/index.html'><img src='https://ajmiller00.github.io/Midterm/logo-06.png' class='header'/></a></div></div>");
			res.write("<nav><ul><li><a href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
                  	res.write("<li><a href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
                  	res.write("<li><a href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    			res.write("<li><a href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
                  	res.write("<li><a href='https://reveauchocolat-cart.herokuapp.com/' style='padding:10px 20px; background-color: #ff9933; color: #003267;border: none;margin-top:  10px;cursor:pointer;-webkit-border-radius: 5px;border-radius: 4px;'>My Cart</a> </li>");
              		res.write("</ul></nav>");

          		res.write("<div class='burger' id = 'bur'><img src='https://ajmiller00.github.io/Midterm/burger.png' class='burger' onclick='show()'></div>");
			res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'>");
			res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a> </li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
                  	res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
                  	res.write("<li><a class = 'burger' href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
    			res.write("<li><a class = 'burger' href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li><li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li>");
                        res.write("<li></li><li></li><li><a class = 'burger' href='https://reveauchocolat-cart.herokuapp.com/'>My Cart</a></li></ul></div></header>");
			res.write("<body>");
		let quan = [];
		quan.push(req.body.quan0);
		quan.push(req.body.quan1);
		quan.push(req.body.quan2);
		quan.push(req.body.quan3);
		quan.push(req.body.quan4);
		quan.push(req.body.quan5);
		quan.push(req.body.quan6);
		quan.push(req.body.quan7);
		quan.push(req.body.quan8);
		quan.push(req.body.quan9);
		quan.push(req.body.quan10);
		quan.push(req.body.quan11);
		if (numItems > 12)
		{
			quan.push(req.body.quan12);
			quan.push(req.body.quan13);
			quan.push(req.body.quan14);
			quan.push(req.body.quan15);
			quan.push(req.body.quan16);
			quan.push(req.body.quan17);
			quan.push(req.body.quan18);
			quan.push(req.body.quan19);
			quan.push(req.body.quan20);
			quan.push(req.body.quan21);
			quan.push(req.body.quan22);
			quan.push(req.body.quan23);
		}
		
		currUser.findOne({current: "current"}, function (err, currUser) {
			if (err) throw err;
			var query = {
				email : currUser.email
			}
			quan.forEach(function(item, index, array) {
				// If user quantity is not zero
				if ((item != "0") && (item != undefined))
				{
					console.log(item, index);
					if (numItems > 12) {
						var productQuery = {
							id : String(index),
							gift: false
						};
					} else {
						var productQuery = {
							id: String(index),
							gift: true
						}
					}
					console.log("About to log query");
					console.log(productQuery);
					// Find Product item
					products.findOne(productQuery, function (err, product) {
						if (err) throw err;
						// Adding the item to users cart
						user.updateOne (
							query,
							{ $push: 
								{ cart : {
									cart_item : product.name,
									cart_quantity: item,
									cart_price: product.price
									}
								}
							}
						)
					})

				}
			});
		}); // end finding curr user
	    res.write("Added to Cart");
	    res.end();
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
