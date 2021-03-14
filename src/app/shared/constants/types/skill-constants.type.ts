// TODO: Move to a model.
export type Skill = {

  readonly id: number;

  readonly name: string;

  readonly skill_category: string;

  readonly dependencies: string[];

};

// TODO: Move to a model.
export type Rank = {

  readonly id: number;

  readonly rate: string;

  readonly value: number;

  readonly bonus: number;

};

export type SkillConstants = {

  readonly list: { [key: string]: Skill[] };

  readonly names: { [key: string]: string[] }

  readonly labels: string[];

  readonly ranks: { [key: string]: Rank };

};
