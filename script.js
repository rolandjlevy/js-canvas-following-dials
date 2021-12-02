const touchEnabled = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const moveEvent = touchEnabled() ? 'ontouchmove' : 'onmousemove';

const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);

const canvas_1 = $("#container-1");
const ctx_1 = canvas_1.getContext('2d');
const w_1 = canvas_1.width;
const h_1 = canvas_1.height;

const canvas_2 = $("#container-2");
const ctx_2 = canvas_2.getContext('2d');
const w_2 = canvas_2.width;
const h_2 = canvas_2.height;

const canvas_3 = $("#container-3");
const ctx_3 = canvas_3.getContext('2d');
const w_3 = canvas_3.width;
const h_3 = canvas_3.height;

const canvas_4 = $("#container-4");
const ctx_4 = canvas_4.getContext('2d');
const w_4 = canvas_4.width;
const h_4 = canvas_4.height;

const lineWidth = 1;
const lineCap = 'butt';

document[moveEvent] = (event) => {
  const evt = touchEnabled() ? event.touches[0] : event;
  const x = evt.clientX;
  const y = evt.clientY;

  drawLine(ctx_1, new Point(0, 0), new Point(x, y), 'red');
  drawLine(ctx_1, new Point(0, h_1), new Point(x, y), 'orange');
  drawLine(ctx_1, new Point(w_1, 0), new Point(x, y), 'yellow');
  drawLine(ctx_1, new Point(w_1, h_1), new Point(x, y), 'pink');
  
  drawLine(ctx_2, new Point(0, 0), new Point(x, y), 'red');
  drawLine(ctx_2, new Point(0, h_2), new Point(x, y), 'orange');
  drawLine(ctx_2, new Point(w_2, 0), new Point(x, y), 'yellow');
  drawLine(ctx_2, new Point(w_2, h_2), new Point(x, y), 'pink');

  drawLine(ctx_3, new Point(0, 0), new Point(x, y), 'red');
  drawLine(ctx_3, new Point(0, h_3), new Point(x, y), 'orange');
  drawLine(ctx_3, new Point(w_3, 0), new Point(x, y), 'yellow');
  drawLine(ctx_3, new Point(w_3, h_3), new Point(x, y), 'pink');

  drawLine(ctx_4, new Point(0, 0), new Point(x, y), 'red');
  drawLine(ctx_4, new Point(0, h_4), new Point(x, y), 'orange');
  drawLine(ctx_4, new Point(w_4, 0), new Point(x, y), 'yellow');
  drawLine(ctx_4, new Point(w_4, h_4), new Point(x, y), 'pink');
}

class Point {
  constructor(x, y) {
    this.x = x - 10;
    this.y = y - 10;
  }
}

const drawLine = (ctx, start, end, color) => {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.closePath();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;
  ctx.strokeStyle = 'black';
  ctx.globalAlpha = 0.1;
  ctx.stroke();
}


