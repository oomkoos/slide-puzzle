export interface Block {
  id: number;
  name: string;
  coordinates: number[];
  successCoordinates: number[];
  success: boolean;
  style: any;
}
