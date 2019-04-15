const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// default ctx
// canvas clear
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// color initialize
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// ctx.fillRect(50, 10, 100, 40);

let painting = false;
let filling = false;

function startPainting(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  painting = true;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log(`Creating Path In`, x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log(`Creating Line In`, x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  console.log(color);
  clearBtn.style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
    event.target.style.backgroundColor = "";
    event.target.style.color = "";
  } else {
    filling = true;
    mode.innerText = "Paint";
    event.target.style.backgroundColor = "#0579ff";
    event.target.style.color = "#ffffff";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    console.log("drowing");
  }
}

function handleclearBtnClick() {
  const color = ctx.fillStyle;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  console.log(clearBtn.style.backgroundColor);
}

function handleCM(event) {
  event.preventDefault();
}

function handlesaveBtnClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "MyCanvas.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(potato =>
  potato.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleclearBtnClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handlesaveBtnClick);
}
