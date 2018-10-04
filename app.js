const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const admin = require("firebase-admin");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testmap-f1508.firebaseio.com"
});

// Get a database reference to our blog
const db = admin.database();
const ref = db.ref("/");

app.post("/set", function(req, res) {
  const { name, lat, lang, type, phone } = req.body;
  console.log('Body => ',req.body)
  var docRef = ref.child("places");

  var obj = {
    name: name,
    lat: lat,
    lang: lang,
    type: type,
    phone: phone
  };

  var data = {};
  data[Date.now()] = obj;

  docRef.update(data).then(function(err, response) {
    if (!err) res.json(data);
  });
});

app.get("/get", function(req, res) {
  var docRef = ref.child("places");
  docRef.orderByValue().on("value", function(snapshot) {
    var newData = [];
    snapshot.forEach(function(data) {
      newData.push(data.val());
    });
    res.json(newData);
  });
});

app.listen(5500, function(err, res) {
  if (!err) console.log("Server is Running");
});
