const touchEnabled = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const moveEvent = touchEnabled() ? 'ontouchmove' : 'onmousemove';

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const lineWidth = 2;
const lineCap = 'butt';
const mode = 'colours'; // colours or bw
let x, y;

class Mesh {
  constructor(id, lineWidth, lineCap, colour) {
    const $ = (elem) => document.querySelector(elem);
    this.id = id;
    this.ctx = $(id).getContext('2d');
    this.rect = $(id).getBoundingClientRect();
    this.width = $(id).width;
    this.height = $(id).height;
    this.lineWidth = lineWidth;
    this.lineCap = lineCap;
    this.colour = mode === 'colours' ? colour : 'white';
  }
  drawLine({start_x, start_y}, {end_x, end_y}) {
    this.ctx.beginPath();
    this.ctx.moveTo(start_x, start_y);
    this.ctx.lineTo(end_x, end_y);
    this.ctx.closePath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.lineCap;
    this.ctx.strokeStyle = this.colour;
    this.ctx.globalAlpha = 0.05;
    this.ctx.stroke();
  }
  drawMesh(x, y) {
    this.mousePos = {end_x:x - this.rect.left, end_y:y - this.rect.top};
    this.drawLine( {start_x: 0, start_y:0}, this.mousePos );
    this.drawLine( {start_x: this.width, start_y:0}, this.mousePos );
    this.drawLine( {start_x: 0, start_y:this.height}, this.mousePos );
    this.drawLine( {start_x: this.width, start_y:this.height}, this.mousePos );
  }  
  updateSize(w, h) {
    this.width = w;
    this.height = h;
    this.rect = $(this.id).getBoundingClientRect();
  }
}

const colours = [
  'crimson',
  'orangered',
  'orange',
  'gold',
  'yellowgreen',
  'seagreen',
  'royalblue',
  'indigo',
  'darkmagenta'
];

let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const meshes = new Object();

colours.forEach((col, index) => {
  const id = `canvas-${index + 1}`;
  const canvas = document.createElement('canvas');
  const options = { width: screenWidth / 3, height: screenHeight / 3, id };
  Object.assign(canvas, options);
  $('.wrapper').appendChild(canvas);
  meshes[`m_${col}`] = new Mesh(`#${id}`, lineWidth, lineCap, col);
});

document[moveEvent] = (event) => {
  const evt = touchEnabled() ? event.touches[0] : event;
  x = evt.clientX;
  y = evt.clientY;
  colours.forEach((col, index) => {
    meshes[`m_${col}`].drawMesh(x, y);
  });
}

// run init from Mesh class so it resets all attributes
const resizer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    screenWidth = entry.contentRect.width;
    screenHeight = entry.contentRect.height;
  });
  colours.forEach((col, index) => {
    meshes[`m_${col}`].updateSize(screenWidth / 3, screenHeight / 3);
  });
});

resizer.observe($('body'));