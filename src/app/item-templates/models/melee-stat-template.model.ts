import { MeleeStatTemplateData } from "./melee-stat-template.data";

export class MeleeStatTemplate implements MeleeStatTemplateData {

  constructor(
    public readonly id: number,
    public weapon_stat_template_id: number,
    public sheathed_desc: string
  ) {

  }

}
