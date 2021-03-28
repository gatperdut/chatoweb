import { Injectable } from "@angular/core";
import { RangedStatTemplateData } from "../models/ranged-stat-template.data";
import { RangedStatTemplate } from "../models/ranged-stat-template.model";

@Injectable({
  providedIn: 'root'
})
export class RangedStatTemplateService {

  constructor(

  ) {

  }

  public emptyRangedStatTemplate(): RangedStatTemplateData {
    return {
      id: null,
      weapon_stat_template_id: null,
      missile_type: 'arrow',
      ranges_suitability: ['point_blank', 'short_range', 'medium_range', 'long_range'],
      can_remain_loaded: false
    };
  }

  public craftRangedStatTemplate(rangedStatTemplateData: RangedStatTemplateData): RangedStatTemplate {
    const rangedStatTemplate: RangedStatTemplate = new RangedStatTemplate(
      rangedStatTemplateData.id,
      rangedStatTemplateData.weapon_stat_template_id,
      rangedStatTemplateData.missile_type,
      rangedStatTemplateData.ranges_suitability,
      rangedStatTemplateData.can_remain_loaded
    );

    return rangedStatTemplate;
  }

}
