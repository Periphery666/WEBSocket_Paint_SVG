let http = require('http'),
    fs = require('fs'),
    io = require('socket.io'),
    port = 8080,
    server;
let clients = [];
let picturesValue = [];

server = http.createServer(function (req, res) {
    console.log(new Date() + ": " + req.method + " " + req.url);

    var file = "public" + ((req.url === "/") ? "/index.html" : req.url);
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, function (error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {
                        "Content-Type": 'text/html'
                    });
                    res.end(content);
                }
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });


}).listen(port, function () {
    console.log((new Date()) + ": ws-paint started on port " + port);
});

io.listen(server).sockets.on('connection', function (socket) {
    clients.push(socket);
    console.log("НОВЫЙ ТЮЛЕНЬ");
    if (picturesValue) {
        for (let i = 0; i < picturesValue.length; i++) {
			console.log(`НОВЫЙ ТЮЛЕНЬ лови рыбу ${i} `);
			socket.emit('data', picturesValue[i]);
        }
    }
    socket.on('data', function (data) {
        //console.log(`GOOD DATA`);

        //console.log(data);
        picturesValue.push(data);
        for (let i = 0; i < clients.length; i++) {
            clients[i].emit('data', data);
        }

        //TODO SAVE TO MODEL
    });
});



// let http 	= require('http'),
// 	fs 	 	= require('fs'),
// 	io 		= require('socket.io'),
// 	port 	= 8080,
// 	server;
// let clients = [];
//
//
// server = http.createServer(function(req, res) {
// 	console.log(new Date() + ": " + req.method + " " + req.url);
//
// 	var file = "public" + ((req.url === "/") ? "/index.html" : req.url);
// 	fs.exists(file, function(exists) {
// 		if (exists) {
// 			fs.readFile(file, function(error, content) {
// 				if (error) {
// 					res.writeHead(500);
// 					res.end();
// 				}
// 				else {
// 					res.writeHead(200, {
// 						"Content-Type": 'text/html'
// 					});
// 					res.end(content);
// 				}
// 			});
// 		}
// 		else {
// 			res.writeHead(404);
// 			res.end();
// 		}
// 	});
//
//
// }).listen(port, function() {
// 	console.log((new Date()) + ": ws-paint started on port " + port);
// });
//
//
//
//
// io.listen(server).sockets.on('connection', function (socket) {
//
// 	console.log(`МАМА У МЕНЯ БОМБИТ + НОВЫЙ ОЛЕНЬ`);
//
// 	clients.push(socket);
//
//     socket.on('data', function (data) {
// 		console.log(`МАМА У МЕНЯ БОМБИТ`);
//         console.log(data);
//         // for (let i = 0; i < clients.length; i++) {
//         //     clients[i].broadcast.emit('data', data);
//         // }
//     });
// });


// let express = require('express');
// let app = express();
// let server = require('http').Server(app);
// let io = require('socket.io');
// let clients = [];
//
//
// app.use(express.static('/public'));
//
// app.get('/', function (req, res) {
//     res.sendFile('/index.html');
// });
//
// io.listen(server).sockets.on('connection', function (socket) {
//
//     clients.push(socket);
//
//     socket.on('data', function (data) {
//         console.log(data);
//         for (let i = 0; i < clients.length; i++) {
//             clients[i].broadcast.emit('data', data);
//         }
//     });
// });
//
//
// io.listen(server).sockets.on('disconnect', function (socket) {
//
//     const index = clients.indexOf(socket);
//     if (index > -1) {
//         clients.splice(index, 1);
//     }
//
// });
//
// io.listen(8080);


// io.sockets.on('connection', function (socket) {
//     socket.emit('usersonconnect', online);
//     online++;
//     // console.log("socket connection created");
//     //socket.send(socket.id);
//     currentConnections[socket.id] = {socket: socket};
//     socket.on('setPseudo', function (data) {
//         currentConnections[socket.id].Pseudo = data;
//         user = {'sessid': socket.id, 'name': data};
//         usersarray.push(user);
//         socket.broadcast.emit('users', usersarray);
//     });
//
//
//     socket.on('typing', function (input) {
//         var data = {'message': input, 'pseudo': currentConnections[socket.id].Pseudo};
//         socket.broadcast.emit('message', data);
//         //console.log(data);
//     });
//
//
//     socket.on('disconnect', function () {
//         let index = 0;
//         usersarray.forEach(function (value, index) {
//             if (value.sessid === socket.id) {
//                 index = index;
//             }
//
//         });
//         usersarray.splice(index, 1);
//         //usersarray[0].cnt = online-1;
//         socket.broadcast.emit('users', usersarray);
//         online--;
//
//     });
