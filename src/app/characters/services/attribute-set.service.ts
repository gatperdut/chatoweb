import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { AttributeSet } from "../models/attribute-set.model";
import { AttributeSetData } from "../models/attribute-set.data";

@Injectable({
  providedIn: 'root'
})
export class AttributeSetService {

  constructor(

  ) {

  }

  public craftAttributeSet(attributeSetData: AttributeSetData): AttributeSet {
    return new AttributeSet(
      attributeSetData.id,
      attributeSetData.character_id,
      attributeSetData.str,
      attributeSetData.con,
      attributeSetData.agi,
      attributeSetData.dex,
      attributeSetData.int,
      attributeSetData.wil,
      attributeSetData.pow
    );
  }

  public attributeName: { [key: string]: string } = {
    str: 'Strength',
    con: 'Constitution',
    agi: 'Agility',
    dex: 'Dexterity',
    int: 'Intelligence',
    wil: 'Willpower',
    pow: 'Power'
  }

}
