import { Injectable } from "@angular/core";
import { WeaponStatTemplateData } from "../models/weapon_stat_template.data";
import { WeaponStatTemplate } from "../models/weapon_stat_template.model";
import { MeleeStatTemplateService } from "./melee-stat-template.service";
import { RangedStatTemplateService } from "./ranged-stat-template.service";

@Injectable({
  providedIn: 'root'
})
export class WeaponStatTemplateService {

  constructor(
    private meleeStatTemplateService: MeleeStatTemplateService,
    private rangedStatTemplateService: RangedStatTemplateService
  ) {

  }

  public emptyWeaponStatTemplate(): WeaponStatTemplateData {
    return {
      id: null,
      item_template_id: null,
      grip: '',
      roll_mod: null,
      critical_mod: null,
      base: '',
      melee_stat_template: null,
      ranged_stat_template: null
    };
  }

  public craftWeaponStatTemplate(weaponStatTemplateData: WeaponStatTemplateData): WeaponStatTemplate {
    const weaponStatTemplate: WeaponStatTemplate = new WeaponStatTemplate(
      weaponStatTemplateData.id,
      weaponStatTemplateData.item_template_id,
      weaponStatTemplateData.grip,
      weaponStatTemplateData.roll_mod,
      weaponStatTemplateData.critical_mod,
      weaponStatTemplateData.base
    );

    if (weaponStatTemplateData.melee_stat_template) {
      weaponStatTemplate.melee_stat_template = this.meleeStatTemplateService.craftMeleeStatTemplate(weaponStatTemplateData.melee_stat_template);
    }

    if (weaponStatTemplateData.ranged_stat_template) {
      weaponStatTemplate.ranged_stat_template = this.rangedStatTemplateService.craftRangedStatTemplate(weaponStatTemplateData.ranged_stat_template);
    }

    return weaponStatTemplate;
  }

}
