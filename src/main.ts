import "./style.css";
import { RoomType } from "./utils/type";
import simpleData from './data/simple.json'
import tShapeData from './data/t_shape.json'
import triangleData from "./data/triangle.json"
import { calculateRoomDimensions } from "./utils/helpers";

console.log(simpleData)
console.log(tShapeData)
console.log(triangleData)

const app = document.querySelector("#app");
if (app) {
  app.innerHTML = `
    <canvas id="roomCanvas" width="500" height="500"></canvas>
    <div class="info">
        <p><strong>Length:</strong> <span id="lengthValue">-</span></p>
        <p><strong>Width:</strong> <span id="widthValue">-</span></p>
    </div>
    <button id="changeDimensions">Change Length & Width</button>
  `;
}

const simpleRoomDimensions = calculateRoomDimensions(simpleData)
const tshapeRoomDimensions = calculateRoomDimensions(tShapeData)
const triangleRoomDimensions = calculateRoomDimensions(triangleData)

console.log(simpleRoomDimensions)
console.log(tshapeRoomDimensions)
console.log(triangleRoomDimensions)



console.log(app)

