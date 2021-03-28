import { RangedStatTemplateData } from "./ranged-stat-template.data";

export class RangedStatTemplate implements RangedStatTemplateData {

  constructor(
    public readonly id: number,
    public weapon_stat_template_id: number,
    public missile_type: string,
    public ranges_suitability: string[],
    public can_remain_loaded: boolean
  ) {

  }

}
