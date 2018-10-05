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
const docRef = ref.child("places"); /* Targetting to collection */

app.post("/set", function (req, res) {
  const { name, lat, lang, type, phone } = req.body;
  var obj = {
    name: name,
    lat: lat,
    lang: lang,
    type: type,
    phone: phone
  };

  var data = {};
  data[Date.now()] = obj;

  docRef.update(data).then(function (err, response) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  });
});

app.get("/get", function (req, res) {
  var newData = [];
  /* get saved data from Firebase Database */
  docRef.once("value", function (snapshot) {
    /* Response From Firebase Database */
    snapshot.forEach(function (data) {
      const mainData = data.val();
      newData.push(mainData);
    });
    res.send(newData);
  });
});

app.listen(5500, function (err, res) {
  if (!err) console.log("Server is Running");
});
