import { MeleeStatTemplate } from "./melee-stat-template.model";
import { RangedStatTemplate } from "./ranged-stat-template.model";
import { WeaponStatTemplateData } from "./weapon_stat_template.data";

export class WeaponStatTemplate implements WeaponStatTemplateData {

  public melee_stat_template: MeleeStatTemplate;

  public ranged_stat_template: RangedStatTemplate;

  constructor(
    public readonly id: number,
    public readonly item_template_id: number,
    public grip: string,
    public roll_mod: number,
    public critical_mod: number,
    public base: string
  ) {
    this.melee_stat_template = null;
    this.ranged_stat_template = null;
  }

  public get isMelee(): boolean {
    return !!this.melee_stat_template;
  }

  public get isRanged(): boolean {
    return !!this.ranged_stat_template;
  }

}
