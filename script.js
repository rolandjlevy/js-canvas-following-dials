const touchEnabled = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const moveEvent = touchEnabled() ? 'ontouchmove' : 'onmousemove';

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const lineWidth = 3;
const lineCap = 'butt';
const colour = 'black';

class Mesh {
  constructor(id, lineWidth, lineCap, colour) {
    const $ = (elem) => document.querySelector(elem);
    this.rect = $(id).getBoundingClientRect();
    this.ctx = $(id).getContext('2d');
    this.width = $(id).width;
    this.height = $(id).height;
    this.lineWidth = lineWidth;
    this.lineCap = lineCap;
    this.colour = colour;
    console.log(this.rect.left, this.rect.top)
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
    this.drawLine(
      {start_x: this.rect.left, start_y:this.rect.top}, 
      {end_x:x - this.rect.left, end_y:y - this.rect.top}
    );
    // this.drawLine(
    //   {start_x: this.rect.left, start_y:this.rect.top + this.height}, 
    //   {end_x:this.rect.left + x, end_y:this.rect.top + y + this.height}
    // );
    // this.drawLine(
    //   {start_x: this.rect.left + this.width, start_y:this.rect.top + this.height}, 
    //   {end_x:this.rect.left + x+ this.width, end_y: this.rect.top + y + this.height}
    // );
    // this.drawLine(
    //   {start_x: this.rect.left + this.width, start_y:this.rect.top + this.height}, 
    //   {end_x:x, end_y:y}
    // );
  }
}

const m_1 = new Mesh('#container-1', lineWidth, lineCap, colour);
const m_2 = new Mesh('#container-2', lineWidth, lineCap, colour);
const m_3 = new Mesh('#container-3', lineWidth, lineCap, colour);
const m_4 = new Mesh('#container-4', lineWidth, lineCap, colour);
const m_5 = new Mesh('#container-5', lineWidth, lineCap, colour);
const m_6 = new Mesh('#container-6', lineWidth, lineCap, colour);
const m_7 = new Mesh('#container-7', lineWidth, lineCap, colour);
const m_8 = new Mesh('#container-8', lineWidth, lineCap, colour);
const m_9 = new Mesh('#container-9', lineWidth, lineCap, colour);

document[moveEvent] = (event) => {
  const evt = touchEnabled() ? event.touches[0] : event;
  const x = evt.clientX;
  const y = evt.clientY;
  m_1.drawMesh(x, y);
  m_2.drawMesh(x, y);
  m_3.drawMesh(x, y);
  m_4.drawMesh(x, y);
  m_5.drawMesh(x, y);
  m_6.drawMesh(x, y);
  m_7.drawMesh(x, y);
  m_8.drawMesh(x, y);
  m_9.drawMesh(x, y);
}