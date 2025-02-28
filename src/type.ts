export type RoomType = {
  walls: {
    id: string;
  }[];
  corners: {
    id: string;
    x: number;
    y: number;
    wallStarts: {
      id: string;
    };
    wallEnds: {
      id: string;
    };
  }[];
};
