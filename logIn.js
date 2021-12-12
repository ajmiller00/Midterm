const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";
const fs = require('fs')
var crypto = require('crypto');
var qs = require('querystring');

exports.LogInAuth = async (email, password) => {
  var name = "";

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, async (err, db) => {
      if (err) return reject(err)

      const coll = await (db.db("reveauchocolat").collection('users'))

      try {
       const items = await (await coll.find({ "email": email })).toArray()
       console.log("Items: ");
        for (i = 0; i < items.length; i++) {
          console.log(i + ": " + items[i].fname + " by: " + items[i].lname);
          console.log("Print here : " + name);
          var hash = crypto.createHash('md5').update(items[i].salt + password).digest('hex');
          console.log(hash);
          if (hash == items[i].password) {
            // console.log("yaaaas we made it");
            name = items[i].email.toString();
          } else {
            name = "FAILURE";
          }
        }
      } catch (e) {
        return reject(e)
      }

      console.log("Success!");
      db.close();
      console.log("Print " + name);

      return resolve(name)

    });
  });
};

// (async () => {
//   console.log(await this.LogInAuth('abigail.miller@tufts.edu', 'abby123'));
// })()
