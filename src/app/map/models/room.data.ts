export type RoomStringIndex = 'nr_id' | 'er_id' | 'sr_id' | 'wr_id' | 'ur_id' | 'dr_id' | 'nd_id' | 'ed_id' | 'sd_id' | 'wd_id' | 'ud_id' | 'dd_id';

export interface RoomData {

  readonly id: number;

  readonly area_id: number;

  title: string;

  description: string;

  description_nighttime: string;

  arena: boolean;

  always_lit: boolean;

  enclosed: boolean;

  roughness_multiplier: number;

  nr_id: number;

  er_id: number;

  sr_id: number;

  wr_id: number;

  ur_id: number;

  dr_id: number;

  nd_id: number;

  ed_id: number;

  sd_id: number;

  wd_id: number;

  ud_id: number;

  dd_id: number;

}
