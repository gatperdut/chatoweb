// TODO: Move to a model.
export type AttributeBonus = {

  readonly id: number;

  readonly limit: number;

  readonly bonus: number;

  readonly label: string;

};

export type AttributeConstants = {

  readonly list: string[];

  readonly bonus: AttributeBonus[];

};
