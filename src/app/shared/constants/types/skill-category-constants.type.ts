// TODO: Move to a model.
export type SkillCategory = {

  readonly id: number;

  readonly name: string;

  readonly dependencies: string[];

};

// TODO: Move to a model.
export type CategoryRank = {

  readonly id: number;

  readonly rate: string;

  readonly value: number;

  readonly bonus: number;

};

export type SkillCategoryConstants = {

  readonly all: SkillCategory[];

  readonly names: string[];

  readonly ranks: { [key: string]: CategoryRank };

};
