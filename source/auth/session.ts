export class Session {
  constructor(
    public sessionID: string,
    public userID: string,
    public readonly expiration: Date,
  ) {}
  public isExpirated(): boolean {
    return this.expiration >= new Date();
  }
}
