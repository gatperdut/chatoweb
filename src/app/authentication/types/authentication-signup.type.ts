export type AuthenticationSignup = {

  readonly status: string;

  readonly data: {

    readonly id: number;

    readonly provider: string;

    readonly uid: string;

    readonly email: string;

    readonly nickname: string;

    readonly allow_password_change: boolean;

    readonly image: string;

    readonly role: string;

    readonly created_at: string;

    readonly updated_at: string;

  }

}
