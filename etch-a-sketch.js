const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');

const shakebutton = document.querySelector('.shake');

// ctx configurations
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

// constants
const MOVE_AMOUNT = 40;
let hue = 0;

const {width, height} = canvas

let x = Math.floor(Math.random() * width);
let y= Math.floor(Math.random() * height);

ctx.strokeStyle = `hsl(100, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();


function handleKey(e){
    e.preventDefault();
    if(e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

function draw({key}) {
    hue+=1
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch (key) {
        case "ArrowUp":
          y -= MOVE_AMOUNT;
          break;
        case "ArrowRight":
          x += MOVE_AMOUNT;
          break;
        case "ArrowDown":
          y += MOVE_AMOUNT;
          break;
        case "ArrowLeft":
          x -= MOVE_AMOUNT;
          break;
        default:
          break;
      }
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  var isIdle = true;
  function drawstart(event) {
    ctx.beginPath();
    ctx.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    isIdle = false;
  }
  function drawmove(event) {
    if (isIdle) return;
    ctx.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    ctx.stroke();
  }
  function drawend(event) {
    if (isIdle) return;
    hue+=1
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    drawmove(event);
    isIdle = true;
  }
window.addEventListener('keyup', handleKey);

canvas.addEventListener('mousedown', drawstart, false);
canvas.addEventListener('mousemove', drawmove, false);
canvas.addEventListener('mouseup', drawend, false);

function clearCanvas() {
    canvas.classList.add('shake');
    canvas.addEventListener("animationend", function() {
        console.log("done the shake!");
        canvas.classList.remove("shake");
    }, { once: true });
    ctx.clearRect(0, 0, width, height);
}

shakebutton.addEventListener("click", clearCanvas);