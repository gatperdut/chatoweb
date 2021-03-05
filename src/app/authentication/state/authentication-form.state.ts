type FormState = {
  errored: boolean,
  loading: boolean,
  success: boolean
};

export const formState = (): FormState => {
  return {
    errored: false,
    loading: false,
    success: false
  } as FormState;
};

export const clearFormState = (formState: FormState) => {
  formState.errored = false;
  formState.loading = false;
  formState.success = false;
};
