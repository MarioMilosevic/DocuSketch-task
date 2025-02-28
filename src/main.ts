// import "./style.css";
// import { RoomType } from "./utils/type";
// import simpleData from "./data/simple.json";
// import tShapeData from "./data/t_shape.json";
// import triangleData from "./data/triangle.json";
// import { calculateRoomDimensions } from "./utils/helpers";

// const simpleRoomDimensions = calculateRoomDimensions(simpleData);
// console.log(simpleRoomDimensions);

// // let length, width

// const app = document.querySelector("#app");
// if (app) {
//   app.innerHTML = `
//     <canvas class="roomCanvas"></canvas>
//     `;
//   }
//   // <div class="info">
//   //     <p><strong>Length:</strong> <span id="lengthValue">${simpleRoomDimensions.length}</span></p>
//   //     <p><strong>Width:</strong> <span id="widthValue">${simpleRoomDimensions.width}</span></p>
//   // </div>
//   // <button id="changeDimensions">Change Length & Width</button>

// const canvas = document.querySelector(".roomCanvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight;
// console.log(window)

// // canvas.width = simpleRoomDimensions.width + 200;
// // canvas.height = simpleRoomDimensions.length + 200;

// function drawRoom(room: RoomType) {
//   ctx?.clearRect(0, 0, canvas.width, canvas.height); // Očistimo canvas pre novog crtanja

//   const offsetX = 100; // Offset za pozicioniranje sobe unutar canvas-a
//   const offsetY = 100; // Offset za pozicioniranje sobe unutar canvas-a

//   room.walls.forEach((wall) => {
//     const startCorner = room.corners.find((corner) =>
//       corner.wallStarts.some((start) => start.id === wall.id)
//     );
//     const endCorner = room.corners.find((corner) =>
//       corner.wallEnds.some((end) => end.id === wall.id)
//     );
//     const { x: startX, y: startY } = startCorner;
//     const { x: endX, y: endY } = endCorner;
//     console.log(startX, endX, startY, endY);
//     // /////////////
//     const w = ctx?.canvas.width
//     const h = ctx?.canvas.height
//     // ctx?.setTransform(1, 0, 0, 1, 0, 0)
//     // ctx?.clearRect(0, 0, w, h)
//     // ctx?.setTransform(1,0,0,1, w/2, h/2)
//     // ctx?.moveTo(startX, startY)
//     // ctx.fillStyle = "white";
//     // ctx?.fillRect(10, 90, -3, 50);
//     // ctx?.fillRect(startX, startY, endX, endY);
//     ctx.beginPath();
//     ctx.moveTo(Math.abs(startX), Math.abs(startY));
//     ctx.lineTo(Math.abs(endX), Math.abs(endY));
//     // ctx.lineTo(100, 25);
//     ctx.fill();
//   });
// }


// drawRoom(simpleData);
// // ctx?.beginPath();
// // ctx?.moveTo(startX + offsetX, startY + offsetY);
// // ctx?.lineTo(endX + offsetX, endY + offsetY);
// // ctx?.stroke();

import "./style.css";
import { RoomType } from "./utils/type";
import simpleData from "./data/simple.json";
import tShapeData from "./data/t_shape.json";
import triangleData from "./data/triangle.json";
import { calculateRoomDimensions } from "./utils/helpers";

const simpleRoomDimensions = calculateRoomDimensions(tShapeData);
console.log(simpleRoomDimensions);

const app = document.querySelector("#app");
if (app) {
  app.innerHTML = `<canvas class="roomCanvas"></canvas>`;
}

const canvas = document.querySelector(".roomCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawRoom(room: RoomType) {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate min and max coordinates to adjust position
  const minX = Math.min(...room.corners.map((corner) => corner.x));
  const minY = Math.min(...room.corners.map((corner) => corner.y));
  const maxX = Math.max(...room.corners.map((corner) => corner.x));
  const maxY = Math.max(...room.corners.map((corner) => corner.y));

  const roomWidth = maxX - minX;
  const roomHeight = maxY - minY;

  // Calculate scale factor to fit the room within the canvas
  const scale = Math.min(
    (canvas.width - 200) / roomWidth, // Leave some margin
    (canvas.height - 200) / roomHeight
  );

  ctx.save(); // Save current state
  ctx.translate(100 - minX * scale, 100 - minY * scale); // Move to visible area
  ctx.scale(scale, scale); // Scale to fit canvas

  ctx.strokeStyle = "black";
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

  ctx.restore(); // Restore canvas state
}

drawRoom(triangleData);
