import { WeaponStatTemplateData } from "./weapon_stat_template.data";

export class WeaponStatTemplate implements WeaponStatTemplateData {

  constructor(
    public readonly id: number,
    public readonly item_template_id: number,
    public grip: string,
    public roll_mod: number,
    public critical_mod: number,
    public base: string
  ) {

  }

}
