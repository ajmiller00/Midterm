// imports
const express = require("express")
const app = express()
const port = 3000
const http = require('http')
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";


var name= "", email = "", phone = "", address = "";


app.get('/', (req, res) => {


    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
        if(err) {
          return console.log(err); return;
        }

          var dbo = db.db("reveauchocolat");
          var collection = dbo.collection('users');

      console.log("Success!");

      console.log("before find");


	    theQuery = "";

      await collection.find(theQuery).toArray(function(err, items) {
        if (err) {
          console.log("Error: " + err);
			    res.end();
		  	  db.close();
		    }
		    else
		    {
          name = items[0].fname + " " + items[0].lname;
          console.log(name);
          email = items[0].email;
          console.log(email);
          phone = items[0].phone;
          console.log(phone);
          address = items[0].street + ", " + items[0].city + ", " + items[0].state + " " + items[0].zip;
          console.log(address);
          fs.readFile("header.html", function(err, txt) {
              res.write(txt);
              res.write("<body>");
                // res.write(" ");

                res.write("<div class='info'>");
                  res.write("<h1 style='background-color: #fcecc8;'>My Account</h1>");
                    res.write("<h2>Contact Information</h2>");
                    res.write("<p>Name: " + name + "</p>");
                    res.write("<p>Email: " + email + "</p>");
                    res.write("<p>Phone: " + phone + "</p>");

                    res.write("<h2>Shipping Information</h2>");
                    res.write("<p>Address: " + address + "</p>");

                res.write("</div>");

        			res.write("<footer style='background-color: #003267'>&copy; 2021 Rêve au Chocolat – 23 Fausse Street, Cambridge, MA – (617) 555 0113</footer> </body> </html>");
              res.end();
          });
		    	// res.write("<!DOCTYPE html><html lang='en'><head><script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=' crossorigin='anonymous'>");
		    	// res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
    			// res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
    			// res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
    			// res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");
          //
			    // res.write("<title>My Account</title><link rel = 'stylesheet' type = 'text/css' href = 'https://ajmiller00.github.io/Midterm/style.css'>");
          //
          // //infile styling
          // res.write("<style type='text/css'>")
          //   res.write("p{font-family: 'Amaranth', sans-serif;font-style: italic;weight: 600;font-size: 15px;text-align: center;color: #003267;margin-left: 5%;margin-right: 5%;}")
          //   res.write("body {font-family: 'Amaranth', sans-serif; background-color:#003267;margin-left: 0px;margin-right: 0px;}")
          //   res.write(".info {padding: 0 30% 30% 30%; margin:0; background-color: #fcecc8;}")
          //   res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p {text-align: left; font-size: 15px; font-weight:300; }");
          //
          // res.write("</style>")
          //
          // //header
       		// res.write("<header><a href='https://ajmiller00.github.io/Midterm/index.html'><img src='https://ajmiller00.github.io/Midterm/logo-06.png' class='header'/></a><nav>");
          // res.write("<ul><li><a href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a></li>");
          //           	res.write("<li><a href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
          //           	res.write("<li><a href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
          //           	res.write("<li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;'href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
          //           	res.write("<li><a href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li>");
          //           	res.write("<li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li></ul></nav>");
          //
    			// res.write("<div class='burger' id = 'bur'><img src='burger.png' class='burger' onclick='show()'></div><div class='oBurger' id = 'burger'>");
          //       	res.write("<ul id = 'burgerUl'><li><a href='https://ajmiller00.github.io/Midterm/about_us.html'>About Us</a></li>");
          //           	res.write("<li><a href='https://reveauchocolat-products.herokuapp.com/'>Shop</a> </li>");
          //           	res.write("<li><a href='https://ajmiller00.github.io/Midterm/catering.html'>Catering</a> </li>");
          //           	res.write("<li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;'href='https://reveauchocolat-gifts.herokuapp.com/'>Gifts</a> </li>");
          //           	res.write("<li><a href='https://ajmiller00.github.io/Midterm/workshops_events.html'>Events</a> </li>");
          //           	res.write("<li><a href='https://ajmiller00.github.io/Midterm/contact.html' >Contact Us</a> </li></ul></div></header>");

          //html body

		    }//end else
		    // res.end();
		  	db.close();
		});
	});

});





app.listen(port, () => console.info("listening on port ${port}"))
