export class ClientCredentials {
  constructor(
    public readonly user: string,
    public readonly password: string,
    public readonly isPasswordHashed: boolean = false,
  ) {}
}
