import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { _booleanHash } from "../types/player-query.type";

@Injectable({
  providedIn: 'root'
})
export class PlayerRoleService {

  public roles: string[] = [
    'regular',
    'admin',
    'owner'
  ];

  constructor(

  ) {

  }

  public rolesHash(): _booleanHash {
    const result: _booleanHash = {};

    _.each.bind(this)(
      this.roles,
      (role: string) => {
        result[role] = false;
      }
    );

    return result;
  }

}
