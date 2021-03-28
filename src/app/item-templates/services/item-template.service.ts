import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { ItemTemplateData } from "../models/item-template.data";
import { ItemTemplate } from "../models/item-template.model";

@Injectable({
  providedIn: 'root'
})
export class ItemTemplateService {

  constructor(

  ) {

  }

  public emptyItemTemplate(): ItemTemplateData {
    return {
      id: null,
      code: '',
      short_desc: '',
      long_desc: '',
      full_desc: '',
      kwords: [],
      weight: 100,
      is_sheath: false,
      is_quiver: false,
      possible_slots: []
    };
  }

  public craftItemTemplate(itemTemplateData: ItemTemplateData): ItemTemplate {
    return new ItemTemplate(
      itemTemplateData.id,
      itemTemplateData.code,
      itemTemplateData.short_desc,
      itemTemplateData.long_desc,
      itemTemplateData.full_desc,
      itemTemplateData.kwords,
      itemTemplateData.weight,
      itemTemplateData.is_sheath,
      itemTemplateData.is_quiver,
      itemTemplateData.possible_slots
    );
  }

  public craftItemTemplates(itemTemplatesData: ItemTemplateData[]): ItemTemplate[] {
    return _.map(
      itemTemplatesData,
      this.craftItemTemplate
    );
  }

}
