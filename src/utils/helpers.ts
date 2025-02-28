import { RoomType } from "./type";

export const calculateRoomDimensions = (roomData: RoomType) => {
  // Proveravamo da li podaci o sobi nisu null ili prazni
  if (!roomData || !roomData.corners || roomData.corners.length === 0) {
    throw new Error("Invalid room data");
    }
    // console.log(roomData.corners)

  // Inicijalizacija minimum i maksimum vrednosti za x i y koordinate
  let minX = roomData.corners[0].x;
  let maxX = minX;
  let minY = roomData.corners[0].y;
    let maxY = minY;
    // console.log(minX)
    // console.log(maxX)

  // Petlja za pronalaženje minimum i maksimum koordinata
  for (const corner of roomData.corners) {
    const { x, y } = corner;

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

    // Računanje širine i dužine sobe
    // console.log(maxX, minX)
    // console.log(maxY, minY)
  const width = Math.abs(maxX) + Math.abs(minX);
    const length = Math.abs(maxY) + Math.abs(minY);
    console.log("ovoooooo",length)
    console.log("ovoooooo",width)

  return { length, width };
};
