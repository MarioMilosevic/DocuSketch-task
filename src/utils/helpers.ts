import { RoomType } from "./type";

export const calculateRoomDimensions = (roomData: RoomType) => {
  if (!roomData || !roomData.corners || roomData.corners.length === 0) {
    throw new Error("Invalid room data");
  }
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  roomData.corners.forEach((corner) => {
    const { x, y } = corner;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });

  const width = Math.abs(maxX - minX);
  const length = Math.abs(maxY - minY);

  return { length, width };
};
