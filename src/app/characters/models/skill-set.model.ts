import { SkillSetData } from "./skill-set.data";

export class SkillSet implements SkillSetData {

  constructor(
    public readonly id: number,
    public readonly character_id: number,
    // Melee
    public melee: number,
    public light_edge: number,
    public medium_edge: number,
    public heavy_edge: number,
    public medium_blunt: number,
    public heavy_blunt: number,
    public light_pierce: number,
    public medium_pierce: number,
    public polearm: number,
    // Ranged
    public ranged: number,
    public archery: number,
    public crossbow: number,
    // Martial
    public martial: number,
    public armor_use: number,
    public block: number,
    public parry: number,
    public dual_wield: number,
    public throwing: number,
    // Athletics
    public athletics: number,
    public body_development: number,
    public brawl: number,
    public dodge: number,
    // Communication
    public communication: number,
    public quenya: number,
    public telerin: number,
    public sindarin: number,
    public adunaic: number,
    public westron: number,
    public rohirric: number,
    public khuzdul: number,
    public entish: number,
    public valarin: number,
    public black_speech: number,
    public cirth: number,
    public sarati: number,
    public tengwar: number,
    // Forging
    public forging: number,
    public metalworking: number,
  ) {

  }

}
