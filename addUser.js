const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";
const fs = require('fs');
var crypto = require('crypto');
const csv = require('csv-parser');

exports.addUser = async function (pdata) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
        if(err) { return console.log(err); return;}
            console.log("hereee");
          var dbo = db.db("reveauchocolat");
          var collection = dbo.collection('users');
          const collc = await (db.db("reveauchocolat").collection('current'));

          console.log(pdata['fname']);

          await collection.find({"email" : pdata['email']}).toArray(async function(err, items) {
            	if (err) {
            		console.log("Error: " + err);
            	} else {
                    if (items.length > 0) {
                        console.log("Email already exists");
                        await collc.updateOne({ "current" : "current" }, {$set: {"email" : "FAILURE"}});
                        return "FAILURE"
                    } else {
                        let salt = (Math.random() + 1).toString(36).substring(7);
                        var password = crypto.createHash('md5').update(salt + pdata['pass']).digest('hex');
                        console.log(password);
                        var newData = {"fname":pdata['fname'], "lname":pdata['lname'], "email":pdata['email'], "phone":{"$numberLong":pdata['phone']},"street":pdata['street'], "city":pdata['city'], "state":pdata['state'], "zip":pdata['zip'], "password": password, "cart":[""], "salt":salt};

                        await collection.insertOne(newData, function(err, res) {
                            if(err) { console.log("Insert Error: " + err); return; }
                            console.log("New document inserted!");
                        });
                        await collc.updateOne({ "current" : "current" }, {$set: {"email" : pdata['email']}});
                        return pdata['email'];
                    }
            	}

              console.log("Success!");
              db.close();
          });

    });
};
