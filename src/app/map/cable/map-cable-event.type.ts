import { RoomData } from "src/app/rooms/models/room.data";

export type MapCableEvent = {

  readonly model: string;

  readonly action: string;

  readonly room: RoomData;

};
