//From the reqest data, find the ip, language and operating system
var express = require("express");
var app = express();


app.get("/", function (req, res) {
    //the ip address
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    //the accepted language
    var lang = req.headers["accept-language"];
    
    //get only the first part of the language string
    lang = lang.split(",");
    lang = lang[0];
    
    //The operating system string
    var osSys = req.headers["user-agent"];
   
    //matches splits at the parentheses and retrieves the 2nd item in the array
    osSys = osSys.split(/[\(\)]/)[1];
    
    var result = {"ipaddress": ip, "language": lang, "software": osSys};

    res.send(JSON.stringify(result));
});

app.listen(process.env.PORT || 8080, function () {
  console.log("listening");
});