function Data() {
    this.x = 0;
    this.y = 0;
    this.width = null;
    this.style = null;
}

let dataDat = new Data();

const SVGStart = function () {

    this.onMouseUp = (e) => {
        this.draw = false;
        this.pointVec = [];
    }

    this.onMouseDown = (e) => {
        this.draw = true;
    };

    this.onMouseMove = (e) => {
        if (this.draw === true) {
            dataDat.x = e.offsetX;
            dataDat.y = e.offsetY;
            dataDat.style = this.style.value;
            dataDat.width = this.width.value;

            this.sendPoint(dataDat);
        }
    };

    this.onChangeColor = function (e) {
        dataDat.style = e.value;
        this.styleValue = e.value;
    };

    this.onChangeWidth = function (e) {
        dataDat.width = e.value;
        this.widthValue = e.value;
    };

    this.onMouseLeave = (e) => {
        this.draw = false;
        this.path = null;
        this.pointVec = [];
    };

    this.addPoint = function (point) {
        this.pointVec = this.pointVec.concat(point);
    };

    this.drawing = function (point) {
        if (this.draw || this.sendData) {
            console.log(point.x);
            console.log(point.y);
            console.log(point.style);
            console.log(point.width);
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'stroke', point.style);
            path.setAttributeNS(null, 'fill', 'transparent');
            path.setAttributeNS(null, 'stroke-width', point.width);

            this.path = path;
            this.addPoint([point.x, point.y]);
            path.setAttributeNS(null, 'd', `M ${this.pointVec.toString()}`);
            this.svg.appendChild(path);
            this.sendData = false;
            ;
        }
    }.bind(this);

    this.init = () => {

        this.svg = null;
        this.draw = false;
        this.style = null;
        this.width = null;

        this.pointVec = [];
        this.path = null;

        this.svg = document.querySelector('svg');
        this.svg.onmousedown = this.onMouseDown;

        this.svg.onmousemove = this.onMouseMove;
        this.svg.onmouseup = this.onMouseUp;
        this.svg.onmouseleave = this.onMouseLeave;

        this.draw = false;
        this.sendData = false;
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

    };

    this.socketConnected = function () {
        console.log('Client has connected to the server!');
    }.bind(this);

    this.socketDisconnected = function () {
        console.log('Client has disconnected!');
    }.bind(this);

    this.socketReceivedData = function (data) {
        console.log('Received a message from the server!', data.point);

        // let viewPoint = {
        //     x: data.point.x,
        //     y: data.point.y
        // };
        this.sendData = true;

        this.drawPoint(data.point);

    }.bind(this);

    this.drawPoint = function (point) {

        this.drawing(point);
    }.bind(this);

    this.sendPoint = function (point) {
        this.socket.emit('data', {
            point
        })
    }.bind(this);

};


let svg = new SVGStart();

svg.init();


