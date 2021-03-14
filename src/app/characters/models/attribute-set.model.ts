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

}
