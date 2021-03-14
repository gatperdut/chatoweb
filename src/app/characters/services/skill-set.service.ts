import { Injectable } from "@angular/core";
import { ConstantsService } from "src/app/shared/constants/constants.service";
import * as _ from "underscore";
import { Character } from "../models/character.model";
import { SkillSetData } from "../models/skill-set.data";
import { SkillSet } from "../models/skill-set.model";

@Injectable({
  providedIn: 'root'
})
export class SkillSetService {

  constructor(
    private constantsService: ConstantsService
  ) {

  }

  public craftSkillSet(skillSetData: SkillSetData): SkillSet {
    return new SkillSet(
      skillSetData.id,
      skillSetData.character_id,
      // Melee
      skillSetData.melee,
      skillSetData.light_edge,
      skillSetData.medium_edge,
      skillSetData.heavy_edge,
      skillSetData.medium_blunt,
      skillSetData.heavy_blunt,
      skillSetData.light_pierce,
      skillSetData.medium_pierce,
      skillSetData.polearm,
      // Ranged
      skillSetData.ranged,
      skillSetData.archery,
      skillSetData.crossbow,
      // Martial
      skillSetData.martial,
      skillSetData.armor_use,
      skillSetData.block,
      skillSetData.parry,
      skillSetData.dual_wield,
      skillSetData.throwing,
      // Athletics
      skillSetData.athletics,
      skillSetData.body_development,
      skillSetData.brawl,
      skillSetData.dodge,
      // Communication
      skillSetData.communication,
      skillSetData.quenya,
      skillSetData.telerin,
      skillSetData.sindarin,
      skillSetData.adunaic,
      skillSetData.westron,
      skillSetData.rohirric,
      skillSetData.khuzdul,
      skillSetData.entish,
      skillSetData.valarin,
      skillSetData.black_speech,
      skillSetData.cirth,
      skillSetData.sarati,
      skillSetData.tengwar,
      // Forging
      skillSetData.forging,
      skillSetData.metalworking,
    );
  }

  public skillCategoryRate(character: Character, skillCategoryName: string) {
    const dependencies: string[] = _.findWhere(
      this.constantsService.constants.skill_categories.all,
      { name: skillCategoryName}
    )
    .dependencies;

    const average = character.attribute_set.average(dependencies);

    switch(true) {
      case (average <= 15): {
        return 'limited';
      }
      case (average <= 35): {
        return 'below_average';
      }
      case (average <= 65): {
        return 'standard';
      }
      case (average <= 85): {
        return 'above_average';
      }
      case (average <= 100): {
        return 'plus';
      }
    }

    throw new Error('Unknown attributes average value.');
  }

  public skillCategoryLabel(characterData: CharacterData, skillCategoryName: string): string {
    return 'superhuman';
  }

  public skillCategoryBonus(characterData: CharacterData, skillCategoryName: string): number {
    return 88;
  }

}
