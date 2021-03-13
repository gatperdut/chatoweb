import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mustMatch(field: string): ValidatorFn {
  return (abstractControl: AbstractControl): (ValidationErrors | null) => {
    if (!abstractControl.parent) {
      return null;
    }

    const matchingAbstractControl: AbstractControl = abstractControl.parent.get(field);

    const match: boolean = abstractControl.value === matchingAbstractControl.value;

    return match ? null : { fieldsMismatched: true };
  }
}
