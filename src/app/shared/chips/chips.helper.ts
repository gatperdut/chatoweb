import { FormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";

export function addChip(event: MatChipInputEvent, formGroup: FormGroup, controlName: string): void {
  const input = event.input;
  const value = event.value || '';

  if (value.trim()) {
    formGroup.get(controlName).value.push(value.trim());
  }

  if (input) {
    input.value = '';
  }
}

export function removeChip(kword: string, formGroup: FormGroup, controlName: string): void {
  const index = formGroup.get(controlName).value.indexOf(kword);

  if (index >= 0) {
    formGroup.get(controlName).value.splice(index, 1);
  }
}
