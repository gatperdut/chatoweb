import { MeleeStatTemplateData } from "./melee-stat-template.data";
import { RangedStatTemplateData } from "./ranged-stat-template.data";

export interface WeaponStatTemplateData {

  readonly id: number;

  item_template_id: number;

  grip: string;

  roll_mod: number;

  critical_mod: number;

  base: string;

  melee_stat_template: MeleeStatTemplateData;

  ranged_stat_template: RangedStatTemplateData;

}
