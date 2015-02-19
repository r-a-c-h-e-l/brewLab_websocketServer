var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 2000});
var five = require("johnny-five");

server.on("connection",function(client) {
  console.log("friend connected");
  // here the phase will connect.
  // the type of phase and


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
      console.log(temp_x);
      var temp = JSON.stringify(temp_x);
      client.send(temp);
      temp_y = temp_x

    }
    // console.log(data.celsius + "°C", data.fahrenheit + "°F");
  });
});
  // start running tempClient.js
  // spawn a child process
  client.on("close", function() {

  });
});




// var five = require("johnny-five"),
//     bumper, led,
//     board = new five.Board(),
//     io = require('socket.io').listen(8080);
//
// io.sockets.on('connection', function (socket) {
//     board.on('on', function(){
//         socket.emit('on');
//     });
//     board.on('off', function(){
//         socket.emit('off');
//     });
// });
//
// board.on("ready", function() {
//   bumper = new five.Button(2);
//   led = new five.Led(8);
//
//   bumper.on("down", function() {
//     board.emit('on');
//     led.on();
//   }).on("up", function() {
//     board.emit('off');
//     led.off();
//   });
// });
