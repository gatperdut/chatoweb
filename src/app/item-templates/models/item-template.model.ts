import { ItemTemplateData } from "./item-template.data";
import { WeaponStatTemplate } from "./weapon_stat_template.model";

export class ItemTemplate implements ItemTemplateData {

  constructor(
    public readonly id: number,
    public code: string,
    public short_desc: string,
    public long_desc: string,
    public full_desc: string,
    public kwords: string[],
    public weight: number,
    public is_sheath: boolean,
    public is_quiver: boolean,
    public possible_slots: string[],
    public weapon_stat_template: WeaponStatTemplate
  ) {
    this.weapon_stat_template = null;
  }

  public get isWeapon(): boolean {
    return !!this.weapon_stat_template;
  }

  public get isMelee(): boolean {
    return this.isWeapon && this.weapon_stat_template.isMelee
  }

  public get isRanged(): boolean {
    return this.isWeapon && this.weapon_stat_template.isRanged
  }

}
