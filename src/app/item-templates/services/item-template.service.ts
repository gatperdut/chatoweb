import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { ItemTemplateData } from "../models/item-template.data";
import { ItemTemplate } from "../models/item-template.model";
import { WeaponStatTemplateService } from "./weapon-stat-template.service";

@Injectable({
  providedIn: 'root'
})
export class ItemTemplateService {

  constructor(
    private weaponStatTemplateService: WeaponStatTemplateService
  ) {

  }

  public emptyItemTemplate(weaponStatTemplate: boolean): ItemTemplateData {
    const itemTemplateData: ItemTemplateData = {
      id: null,
      code: '',
      short_desc: '',
      long_desc: '',
      full_desc: '',
      kwords: [],
      weight: 0,
      is_sheath: false,
      is_quiver: false,
      possible_slots: [],
      weapon_stat_template: null
    };

    if (weaponStatTemplate) {
      itemTemplateData.weapon_stat_template = this.weaponStatTemplateService.emptyWeaponStatTemplate()
    }

    return itemTemplateData;
  }

  public craftItemTemplate(itemTemplateData: ItemTemplateData): ItemTemplate {
    const itemTemplate: ItemTemplate = new ItemTemplate(
      itemTemplateData.id,
      itemTemplateData.code,
      itemTemplateData.short_desc,
      itemTemplateData.long_desc,
      itemTemplateData.full_desc,
      itemTemplateData.kwords,
      itemTemplateData.weight,
      itemTemplateData.is_sheath,
      itemTemplateData.is_quiver,
      itemTemplateData.possible_slots,
      null
    );

    if (itemTemplateData.weapon_stat_template) {
      itemTemplate.weapon_stat_template = this.weaponStatTemplateService.craftWeaponStatTemplate(itemTemplateData.weapon_stat_template);
    }

    return itemTemplate;
  }

  public craftItemTemplates(itemTemplatesData: ItemTemplateData[]): ItemTemplate[] {
    return _.map(
      itemTemplatesData,
      this.craftItemTemplate.bind(this)
    );
  }

}
