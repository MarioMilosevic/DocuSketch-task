import "./style.css";
import { RoomType } from "./utils/type";
import tShapeRoom from "./data/t_shape.json";

const app = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `
    <h1 class="title">DocuSketch Task</h1>
  <canvas class="roomCanvas"></canvas>
  <div class="info">
    <div class="dimensions">
      <p>Length: <span id="length"></span></p>
      <p>Width: <span id="width"></span></p>
    </div>
    <button class="button">Rotate</button>
  </div>
`;

const canvas = document.querySelector(".roomCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const length = document.querySelector("#length");
const width = document.querySelector("#width");
const button = document.querySelector(".button") as HTMLButtonElement;

canvas.width = app.offsetWidth;
canvas.height = app.offsetHeight / 2;

let isRotated = false;

function drawRoom(room: RoomType, rotate: boolean) {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  const minX = Math.min(...room.corners.map((corner) => corner.x));
  const minY = Math.min(...room.corners.map((corner) => corner.y));
  const maxX = Math.max(...room.corners.map((corner) => corner.x));
  const maxY = Math.max(...room.corners.map((corner) => corner.y));

  const roomWidth = maxX - minX;
  const roomHeight = maxY - minY;

  const scale = Math.min(
    (canvas.width - 100) / roomWidth,
    (canvas.height - 100) / roomHeight
  );

  const centerX = (maxX + minX) / 2;
  const centerY = (maxY + minY) / 2;

  if (rotate) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 2);
  } else {
    ctx.translate(canvas.width / 2, canvas.height / 2);
  }

  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);

  if (length && width) {
    length.textContent = Math.round(roomHeight * scale).toString();
    width.textContent = Math.round(roomWidth * scale).toString();
  }

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  room.walls.forEach((wall) => {
    const startCorner = room.corners.find((corner) =>
      corner.wallStarts.some((start) => start.id === wall.id)
    );
    const endCorner = room.corners.find((corner) =>
      corner.wallEnds.some((end) => end.id === wall.id)
    );

    if (!startCorner || !endCorner) return;

    ctx.beginPath();
    ctx.moveTo(startCorner.x, startCorner.y);
    ctx.lineTo(endCorner.x, endCorner.y);
    ctx.stroke();
  });

  ctx.restore();
}

drawRoom(tShapeRoom, isRotated);

button.addEventListener("click", () => {
  isRotated = !isRotated;
  drawRoom(tShapeRoom, isRotated);
});
