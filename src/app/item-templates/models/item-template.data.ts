import { WeaponStatTemplateData } from "./weapon_stat_template.data";

export interface ItemTemplateData {

  readonly id: number;

  readonly code: string;

  short_desc: string;

  long_desc: string;

  full_desc: string;

  kwords: string[];

  weight: number;

  is_sheath: boolean;

  is_quiver: boolean;

  possible_slots: string[];

  weapon_stat_template: WeaponStatTemplateData;

}
