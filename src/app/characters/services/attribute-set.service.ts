import { Injectable } from "@angular/core";
import { AttributeSet } from "../models/attribute-set.model";
import { AttributeSetData } from "../models/attribute-set.data";
import { ConstantsService } from "src/app/shared/constants/constants.service";
import * as _ from "underscore";
import { AttributeBonus } from "src/app/shared/constants/types/attribute-constants.type";

@Injectable({
  providedIn: 'root'
})
export class AttributeSetService {

  constructor(
    private constantsService: ConstantsService
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

  public name: { [key: string]: string } = {
    str: 'Strength',
    con: 'Constitution',
    agi: 'Agility',
    dex: 'Dexterity',
    int: 'Intelligence',
    wil: 'Willpower',
    pow: 'Power'
  }

  public index(value: number): number {
    let index: number = _.findIndex(
      this.constantsService.constants.attributes.bonus,
      (attributeBonus: AttributeBonus): boolean => {
        return attributeBonus.limit >= value;
      }
    );

    if (index < 0) {
      index = this.constantsService.constants.attributes.bonus.length - 1;
    }

    return index;
  }

  public label(value: number): string {
    let index: number = this.index(value);

    return this.constantsService.constants.attributes.bonus[index].label;
  }

  public bonus(value: number): number {
    let index: number = this.index(value);

    return this.constantsService.constants.attributes.bonus[index].bonus;
  }

}
