const { MongoClient } = require('mongodb');
const fs = require('fs');
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";
{/* <link rel = "stylsheet" type = "text/css" href = "css/style.css"></link> */}
const express = require('express');
const { runInContext } = require('vm');
const app = express();

var port = process.env.PORT || 3000;
// var port = 8080;

const client = new MongoClient(url);
app.use(express.static('public'));
// app.use('/css', express.static(__dirname + '/public/css'));

app.get('', (req, res) => {
    fs.readFile('cart.html', function (err, txt) {
        if (err) throw (err);
        res.writeHead(200, {'Content-Type': 'text/html'});

        res.write(txt);
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if(err) { return console.log(err); }

            var dbo = db.db('reveauchocolat');
            var user = dbo.collection('users');
            var currUser = dbo.collection('current');
			currUser.findOne({current: "current"}, function (err, currUser) {
			var query = {
				email : currUser.email
			}
		    user.findOne(query, function (err, result ){
				res.write("<title>Cart</title><link rel = 'stylesheet' type = 'text/css' href = 'style.css'>");
				res.write("<div id = 'cart'>")
				res.write("<table>");
				res.write("<thead>");
				res.write("<th style = 'width: 50%;'>Item</th>");
				res.write("<th style = 'width: 15%;'>Quantity</th>");
				res.write("<th style = 'width: 15%;'>Price</th>");
				res.write("<th style = 'width: 20%;'>Total</th>");
				res.write("</thead>");
				res.write("<tr>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("<th class = 'border-bottom'></th>");
				res.write("</tr>");
				var cart = result.cart;
				for (i = 0; i < cart.length; i++)
				{
					var item = cart[i].cart_item;
					var quantity = cart[i].cart_quantity;
					var price = cart[i].cart_price;
					var total = quantity * price;
					res.write("<tr>");
					res.write("<td style = 'width: 20%;'>" + item + "</td>");
					res.write("<td style = 'width: 15%;'>" + quantity + "</td>");
					res.write("<td style = 'width: 15%;'> $" + price + "</td>");
					res.write("<td style = 'width: 20%;'> $" + total + "</td>");
					res.write("</tr>")
				}
				res.write("</table>");
				res.write("<form method = 'POST' action = '/checkout'>")
				res.write("<input type = 'submit' value = 'Checkout' class = 'button'></input>")
				res.write("</form>")
				res.write("</div>")
			});

		}); 
    })
	    res.end();
    })
})


app.post('/checkout', (req, res) => {
    res.send("Your order has been processed");
})

app.listen(port);
