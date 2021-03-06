export type FormState = {
  error: string,
  loading: boolean,
  success: boolean
};

export const formState = (): FormState => {
  return {
    error: null,
    loading: false,
    success: false
  } as FormState;
};

export const clearFormState = (formState: FormState) => {
  formState.error = null;
  formState.loading = false;
  formState.success = false;
};
