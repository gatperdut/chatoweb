import * as _ from 'underscore';
import { AttributeSetData } from './attribute-set.data';
import { CharacterData } from './character.data'

export class AttributeSet implements AttributeSetData {

  constructor(
    readonly id: number,
    readonly character_id: number,
    public str: number,
    public con: number,
    public agi: number,
    public dex: number,
    public int: number,
    public wil: number,
    public pow: number
  ) {

  }

  public average(attributeNames: string[]): number {
    let total = 0.0;

    _.each(
      attributeNames,
      (attributeName: string): void => {
        total += this[attributeName as keyof AttributeSetData]
      }
    );

    return Math.round(total / attributeNames.length);
  }

}
