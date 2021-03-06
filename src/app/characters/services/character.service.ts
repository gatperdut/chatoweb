import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { Character } from "../models/character.model";
import { CharacterData } from "../models/character.data";
import { AttributeSet } from "../models/attribute-set.model";
import { AttributeSetService } from "./attribute-set.service";
import { SkillSetService } from "./skill-set.service";
import { SkillSet } from "../models/skill-set.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private attributeSetService: AttributeSetService,
    private skillSetService: SkillSetService
  ) {

  }

  public craftCharacter(characterData: CharacterData): Character {
    const attributeSet: AttributeSet = this.attributeSetService.craftAttributeSet(characterData.attribute_set);

    const skillSet: SkillSet = this.skillSetService.craftSkillSet(characterData.skill_set);

    return new Character(
      characterData.id,
      characterData.player_id,
      characterData.name,
      characterData.image,
      characterData.short_desc,
      characterData.long_desc,
      characterData.full_desc,
      characterData.kwords,
      characterData.room_id,
      characterData.npc,
      characterData.gladiator,
      characterData.active,
      characterData.created_at,
      attributeSet,
      skillSet
    );
  }

}
