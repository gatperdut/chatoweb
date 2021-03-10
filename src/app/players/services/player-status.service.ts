import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { _booleanHash } from "../types/player-query.type";

@Injectable({
  providedIn: 'root'
})
export class PlayerStatusService {

  public status: string[] = [
    'confirmed',
    'unconfirmed',
    'locked'
  ];

  constructor(

  ) {

  }

}
