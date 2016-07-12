var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
function Client(name, socket){
	this.name = name;
	this.socket = socket;
}

var clients = [];
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('identification', function(name, socket){
		clients.push(new Client(name, socket));
		io.emit('new connection', name);
	})
  socket.on('chat message', function(msg){
		io.emit('chat message', msg);
  });
});

http.listen(3000,  function(){
	console.log('listening on *:3000');
});
