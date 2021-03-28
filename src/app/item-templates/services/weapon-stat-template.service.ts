import { Injectable } from "@angular/core";
import { WeaponStatTemplateData } from "../models/weapon_stat_template.data";
import { WeaponStatTemplate } from "../models/weapon_stat_template.model";

@Injectable({
  providedIn: 'root'
})
export class WeaponStatTemplateService {

  constructor(

  ) {

  }

  public emptyWeaponStatTemplate(): WeaponStatTemplateData {
    return {
      id: null,
      item_template_id: null,
      grip: '',
      roll_mod: null,
      critical_mod: null,
      base: ''
    };
  }

  public craftWeaponStatTemplate(weaponStatTemplateData: WeaponStatTemplateData): WeaponStatTemplate {
    return new WeaponStatTemplate(
      weaponStatTemplateData.id,
      weaponStatTemplateData.item_template_id,
      weaponStatTemplateData.grip,
      weaponStatTemplateData.roll_mod,
      weaponStatTemplateData.critical_mod,
      weaponStatTemplateData.base
    );
  }

}
