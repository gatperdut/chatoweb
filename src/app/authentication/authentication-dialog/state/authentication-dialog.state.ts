import { FormState, formState } from "../../state/authentication-form.state";

export enum Mode {
  Signin = 'SIGNIN',
  Signup = 'SIGNUP',
  Authenticated = 'AUTHENTICATED',
  PasswordReset = 'PASSWORD_RESET'
}

export class AuthenticationDialogState {

  public readonly mode = {
    current: Mode.Signin as Mode,
    set: (mode: Mode): void => {
      this.mode.current = mode;
    },
    is: {
      signin: (): boolean => {
        return this.mode.current === Mode.Signin;
      },
      signup: (): boolean => {
        return this.mode.current === Mode.Signup;
      },
      authenticated: (): boolean => {
        return this.mode.current === Mode.Authenticated;
      },
      passwordReset: (): boolean => {
        return this.mode.current === Mode.PasswordReset;
      }
    }
  };

  public readonly signup: FormState = formState();

  public readonly signin: FormState = formState();

  public readonly passwordReset: FormState = formState();

  public readonly signout: FormState = formState();

}
