
var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(process.env.VMC_APP_PORT || 3000);

var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {

  // Send message
  socket.on("C_to_S_message", function (data) {
    io.sockets.emit("S_to_C_message", {value:data.value});
  });

  // Broadcast
  socket.on("C_to_S_broadcast", function (data) {
    socket.broadcast.emit("S_to_C_message", {value:data.value});
  });

  // Send when it's disconnected
  socket.on("disconnect", function () {
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});