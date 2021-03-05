import { formatDiagnosticsWithColorAndContext } from "typescript";
import { formState } from "../../state/authentication-form.state";

export enum Mode {
  Signin = 'SIGNIN',
  Signup = 'SIGNUP',
  Authenticated = 'AUTHENTICATED',
  PasswordReset = 'PASSWORD_RESET'
}

export class AuthenticationWidgetState {

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

  public readonly signup = formState();

  public readonly signin = formState();

  public readonly passwordReset = formState();

  public readonly signout = formState();

}
