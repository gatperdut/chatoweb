export interface SkillSetData {

  readonly id: number;

  readonly character_id: number;

  // Melee
  melee: number;

  light_edge: number;

  medium_edge: number;

  heavy_edge: number;

  medium_blunt: number;

  heavy_blunt: number;

  light_pierce: number;

  medium_pierce: number;

  polearm: number;

  // Ranged
  ranged: number;

  archery: number;

  crossbow: number;

  // Martial
  martial: number;

  armor_use: number;

  block: number;

  parry: number;

  dual_wield: number;

  throwing: number;

  // Athletics
  athletics: number;

  body_development: number;

  brawl: number;

  dodge: number;

  // Communication
  communication: number;

  quenya: number;

  telerin: number;

  sindarin: number;

  adunaic: number;

  westron: number;

  rohirric: number;

  khuzdul: number;

  entish: number;

  valarin: number;

  black_speech: number;

  cirth: number;

  sarati: number;

  tengwar: number;

  // Forging
  forging: number;

  metalworking: number;

}
