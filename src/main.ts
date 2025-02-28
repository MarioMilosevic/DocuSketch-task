import "./style.css";
import { RoomType } from "./utils/type";
import simpleRoom from "./data/simple.json";
import tShapeRoom from "./data/t_shape.json";
import triangleRoom from "./data/triangle.json";

const objects = [simpleRoom, tShapeRoom, triangleRoom];
const randomObject = objects[Math.floor(Math.random() * objects.length)];

const app = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `
      <canvas class="roomCanvas"></canvas>
      <div class="info">
        <div class="dimensions">
          <p>Length:<span id="length"></span></p>
          <p>Width:<span id="width"></span></p>
        </div>
        <button class="button">Change Length & Width</button>
      </div>
  `;

const canvas = document.querySelector(".roomCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
let length = document.querySelector("#length");
let width = document.querySelector("#width");
const button = document.querySelector(".button") as HTMLButtonElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawRoom(room: RoomType) {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const minX = Math.min(...room.corners.map((corner) => corner.x));
  const minY = Math.min(...room.corners.map((corner) => corner.y));
  const maxX = Math.max(...room.corners.map((corner) => corner.x));
  const maxY = Math.max(...room.corners.map((corner) => corner.y));

  const roomWidth = maxX - minX;
  const roomHeight = maxY - minY;

  const scale = Math.min(
    (canvas.width - 200) / roomWidth, 
    (canvas.height - 200) / roomHeight
  );
  ctx.translate(100 - minX * scale, 100 - minY * scale); 

  ctx.scale(scale, scale); 

  const objectWidthOnCanvas = roomWidth * scale;
  const objectHeightOnCanvas = roomHeight * scale;

  if (length && width) {
    length.textContent = Math.round(objectHeightOnCanvas).toString();
    width.textContent = Math.round(objectWidthOnCanvas).toString();
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

drawRoom(randomObject);

button.addEventListener("click", () => {
  console.log("radi");
});
