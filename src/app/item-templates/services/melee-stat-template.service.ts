import { Injectable } from "@angular/core";
import { MeleeStatTemplateData } from "../models/melee-stat-template.data";
import { MeleeStatTemplate } from "../models/melee-stat-template.model";

@Injectable({
  providedIn: 'root'
})
export class MeleeStatTemplateService {

  constructor(

  ) {

  }

  public emptyMeleeStatTemplate(): MeleeStatTemplateData {
    return {
      id: null,
      weapon_stat_template_id: null,
      sheathed_desc: ''
    };
  }

  public craftMeleeStatTemplate(meleeStatTemplateData: MeleeStatTemplateData): MeleeStatTemplate {
    const meleeStatTemplate: MeleeStatTemplate = new MeleeStatTemplate(
      meleeStatTemplateData.id,
      meleeStatTemplateData.weapon_stat_template_id,
      meleeStatTemplateData.sheathed_desc
    );

    return meleeStatTemplate;
  }

}
