var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 2000});
var five = require("johnny-five");
var tempArray =[];

server.on("connection",function(client) {
  console.log("friend connected");

  var board = new five.Board();
  board.on("ready", function() {
    var temperature = new five.Temperature({
      controller: "TMP36",
      pin: "A0",
    });
    var temp_y = 0;
    temperature.on("change", function(err, data) {
      var temp_x = Math.floor(data.fahrenheit);
      if (temp_y != temp_x) {
        var temp = JSON.stringify(temp_x);
        tempArray.push(temp_x);
        client.send(temp);
        temp_y = temp_x
      }
    // console.log(data.celsius + "°C", data.fahrenheit + "°F");
    });
  });

  client.on('message', function(message) {
    var messageParsed = JSON.parse(message);
    console.log(messageParsed);
    if (messageParsed.msg === "stop") {
      var tempsArray = JSON.stringify(tempArray);
      console.log(tempsArray);
      var obj = {
        temps: tempsArray,
      }
      client.send(JSON.stringify(obj));

      var stop = function () {
        process.exit();
      }
      setTimeout(stop, 3000);
    }
  });

  client.on("close", function() {

  });
});
