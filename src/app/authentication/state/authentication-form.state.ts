export type FormState = {
  errors: string[],
  loading: boolean,
  success: boolean
};

export const formState = (): FormState => {
  return {
    errors: null,
    loading: false,
    success: false
  } as FormState;
};

export const clearFormState = (formState: FormState): void => {
  formState.errors = null;
  formState.loading = false;
  formState.success = false;
};
