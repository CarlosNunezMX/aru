export declare class LeoAuth {
    private DateRegex;
    private DateFormat;
    private Params;
    private SecretKey;
    private Type;
    private SecretKeyLength;
    constructor();
    format(): string;
    private GetRandomCharts;
    private GetRandom;
    private reduce;
    private PrepareEncrypt;
    getSecretKey(): string;
    setSecretKey(secret: string): void;
    encrypt(): string;
}
