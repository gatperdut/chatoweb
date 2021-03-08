export type AuthenticationSigninResponse = {

  readonly data: {

    readonly id: number,

    readonly email: string,

    readonly nickname: string,

    readonly role: string,

    readonly created_at: string,

    readonly access_locked: boolean,

    readonly confirmed: boolean,

    readonly image: string

  }

}
