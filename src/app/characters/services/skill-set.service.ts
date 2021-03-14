import { Injectable } from "@angular/core";
import { ConstantsService } from "src/app/shared/constants/constants.service";
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

}
