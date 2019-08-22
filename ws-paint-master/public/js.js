const SVGStart = function () {


    this.addPoint = function (point) {
        this.pointVec = this.pointVec.concat(point);
    }.bind(this);

    this.onMouseUp = (e) => {
        this.draw = false;
        this.pointVec = [];
    }

    this.onMouseDown = (e) => {
        this.draw = true;
    }

    this.onMouseMove = (e) => {
        if (this.draw === true) {
            let data = {
                x: e.clientX,
                y: e.clientY
            };

            this.sendPoint(data);
        }
    };


    this.drawing = function (point) {
        if (this.draw === true) {

            console.log(point.x);
            console.log(point.y);
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'stroke', this.style.value);
            path.setAttributeNS(null, 'fill', 'transparent');
            path.setAttributeNS(null, 'stroke-width', this.width.value);

            this.path = path;
            this.addPoint([point.x, point.y]);
            path.setAttributeNS(null, 'd', `M ${this.pointVec.toString()}`);
            this.svg.appendChild(path);
        }
    }.bind(this);


    this.onChangeColor = function (e) {
        this.styleValue = e.value;
    }.bind(this);

    this.onChangeWidth = function (e) {
        this.widthValue = e.value;
    }.bind(this);


    this.onMouseLeave = (e) => {
        this.draw = false;
        console.log("Leave")
        this.path = null;
        this.pointVec = [];
    };


    this.fff = () => {
        console.log("asdasd");
    };

    this.init = () => {

        // this.ws = ws;
        this.svg = null;
        this.draw = false;
        this.style = null;
        this.width = null;

        this.styleValue = null;
        this.widthValue = null;
        this.pointVec = [];
        this.path = null;

        this.svg = document.querySelector('svg');
        this.svg.onmousedown = this.onMouseDown;

        this.svg.onmousemove = this.onMouseMove;
        this.svg.onmouseup = this.onMouseUp;
        this.svg.onmouseleave = this.onMouseLeave;
        //this.svg.onmouseenter = this.fff;

        this.draw = false;
        this.pointVec = [];
        this.path = null;

        this.style = document.getElementById('color');
        this.width = document.getElementById('width');
        this.style.onchange = this.onChangeColor;
        this.width.onchange = this.onChangeWidth;


        this.socket = io.connect('http://localhost');
        this.socket.on('connect', this.socketConnected);
        this.socket.on('disconnect', this.socketDisconnected);
        this.socket.on('data', this.socketReceivedData);

        this.client = [];
    };

    this.socketConnected = function () {
        console.log('Client has connected to the server!');
    }.bind(this);

    this.socketDisconnected = function () {
        console.log('Client has disconnected!');
    }.bind(this);

    this.socketReceivedData = function (data) {
        console.log('Received a message from the server!', data.point);
        console.log(`BOOM GOOD`);

        let viewPoint = {
            x: data.point.x,
            y: data.point.y
        };

        this.drawPoint(viewPoint);
        // console.log(` this is X ${data.point.x}`);
        // console.log(` this is Y ${data.point.y}`);
        //
        // console.log(`viewPoint`);
        // console.log(` this is X ${viewPoint.x}`);
        // console.log(` this is Y ${viewPoint.y}`);

        // let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // path.setAttributeNS(null, 'stroke', 'black'); //this.style.value
        // path.setAttributeNS(null, 'fill', 'transparent');
        // path.setAttributeNS(null, 'stroke-width', '6'); //this.width.value
        //
        // this.path = path;
        //
        // this.pointVec.push([viewPoint.x, viewPoint.y]);
        //
        // //this.addPoint([viewPoint.x, viewPoint.y]);
        //
        // console.log(this.pointVec);
        //
        // path.setAttributeNS(null, 'd', `M ${this.pointVec.toString()}`);
        // this.svg.appendChild(path);

    }.bind(this);

    this.drawPoint = function (point) {
        let viewPoint = {
            x: point.x,
            y: point.y
        };
        this.drawing(viewPoint);
    }.bind(this);

    this.sendPoint = function (point) {
        //console.log(point);

        //console.log(`Send data`);
        this.socket.emit('data', {
            point: point
        })
        //console.log(`Send may be good`);

        //console.log('Мама тащи огнетушитель у меня бомбит!!!!!!!!!!!!!!!!!!!!!!');

    }.bind(this);

};

// WsSocket = function () {
//
//     this.init = function (vier) {
//         this.svg = vier;
//         this.socket = io.connect('http://localhost:8080');
//         this.socket.on('connect', this.socketConnected);
//         this.socket.on('disconnect', this.socketDisconnected);
//         this.socket.on('data', this.socketReceivedData);
//     };
//
//
//     this.socketConnected = function () {
//         console.log('Client has connected to the server!');
//     };
//
//     this.socketDisconnected = function () {
//         console.log('Client has disconnected!');
//     };
//
//     this.socketReceivedData = function (data) {
//         console.log('Received a message from the server!', data);
//
//         this.drawPoint(data.point);
//     };
//
//     this.drawPoint = function (point) {
//         let viewPoint = {
//             x: point[0],
//             y: point[1]
//         };
//         this.svg.drawing(viewPoint);
//     };
//
//     this.sendPoint = function (point) {
//         console.log('Мама тащи огнитушитель у меня бомбит');
//         console.log(point);
//
//         this.socket.emit('data', {
//             point: point
//         })
//     }
//
//     function addPoint(point) {
//         this.sendPoint(point);
//         this.drawPoint(point);
//     };
// };


let svg = new SVGStart();

svg.init();


