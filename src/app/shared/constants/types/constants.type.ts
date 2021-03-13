import { ArmorConstants } from "./armor-constants.type";
import { AttributeConstants } from "./attribute-constants.type";
import { FluidConstants } from "./fluid-constants.type";
import { IngredientConstants } from "./ingredient-constants.type";
import { SkillCategoryConstants } from "./skill-category-constants.type";
import { SkillConstants } from "./skill-constants.type";
import { WeaponConstants } from "./weapon-constants.type";

export type Constants = {

  weapons: WeaponConstants;

  armor: ArmorConstants;

  fluids: FluidConstants;

  ingredients: IngredientConstants;

  skills: SkillConstants;

  skill_categories: SkillCategoryConstants;

  attributes: AttributeConstants;

};

