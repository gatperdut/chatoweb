import { Injectable } from "@angular/core";
import { ConstantsService } from "src/app/shared/constants/services/constants.service";
import { SkillCategory, SkillCategoryRank } from "src/app/shared/constants/types/skill-category-constants.type";
import { SkillRank } from "src/app/shared/constants/types/skill-constants.type";
import * as _ from "underscore";
import { CharacterData } from "../models/character.data";
import { SkillSetData } from "../models/skill-set.data";
import { SkillSet } from "../models/skill-set.model";
import { AttributeSetService } from "./attribute-set.service";

@Injectable({
  providedIn: 'root'
})
export class SkillSetService {

  constructor(
    private constantsService: ConstantsService,
    private attributeSetService: AttributeSetService
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

  public rate(characterData: CharacterData, dependencies: string[]): string {
    const average = this.attributeSetService.average(characterData.attribute_set, dependencies);

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

  public skillCategoryRate(characterData: CharacterData, skillCategoryName: string): string {
    const dependencies: string[] = _.findWhere(
      this.constantsService.constants.skill_categories.all,
      { name: skillCategoryName}
    )
    .dependencies;

    return this.rate(characterData, dependencies);
  }

  public skillRate(characterData: CharacterData, skillName: string): string {
    const dependencies: string[] = _.findWhere(
      this.constantsService.constants.skills.list.all,
      { name: skillName }
    )
    .dependencies;

    return this.rate(characterData, dependencies);
  }

  public skillCategoryLabel(characterData: CharacterData, skillCategoryName: string): string {
    return 'superhuman';
  }

  public skillCategoryBonus(characterData: CharacterData, skillCategoryName: string): number {
    const skillCategoryRateName = this.skillCategoryRate(characterData, skillCategoryName);

    const skillCategoryRank: number = characterData.skill_set[skillCategoryName as keyof SkillSetData];

    const constantsSkillCategoryRanks: SkillCategoryRank[] = this.constantsService.constants.skill_categories.ranks[skillCategoryRateName]

    return _.findWhere(
      constantsSkillCategoryRanks,
      { value: skillCategoryRank }
    )
    .bonus;
  }

  public skillBonus(characterData: CharacterData, skillName: string): number {
    const skillCategoryName = _.findWhere(
      this.constantsService.constants.skills.list.all,
      { name: skillName }
    ).skill_category;

    const skillCategoryBonus: number = this.skillCategoryBonus(characterData, skillCategoryName)

    const skillRateName = this.skillRate(characterData, skillName);

    const skillRank: number = characterData.skill_set[skillName as keyof SkillSetData];

    const constantsSkillRanks: SkillRank[] = this.constantsService.constants.skills.ranks[skillRateName];

    return skillCategoryBonus + _.findWhere(
      constantsSkillRanks,
      { value: skillRank }
    )
    .bonus;
  }

  public skillLabel(characterData: CharacterData, skillName: string): string {
    const skillBonus: number = this.skillBonus(characterData, skillName);

    return this.constantsService.constants.skills.labels[Math.floor(skillBonus / 10)];
  }

}
