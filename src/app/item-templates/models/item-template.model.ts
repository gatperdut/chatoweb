import { ItemTemplateData } from "./item-template.data";

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
  ) {

  }

}
