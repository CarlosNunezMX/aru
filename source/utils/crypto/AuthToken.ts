export class LeoAuth {
    private DateRegex =  /(\d{1,2})\/(\d{1,2})\/(\d{4}),\s(\d{1,2}):(\d{1,2}):(\d{2})[\.\,](\d{3})/;
    private DateFormat = "$1$2$3$4$5$6$7";
    private Params = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: "3", timeZone: "GMT-0" };
    private SecretKey: string;
    private Type = "KEY2H0l4l30"
    private SecretKeyLength: number;
    constructor(){
        this.SecretKey = this.getSecretKey();
        this.SecretKeyLength = this.SecretKey.length;
    }
    format(): string{
        const CurrentDate = new Date();
        
        // @ts-ignore
        const Preparated = CurrentDate.toLocaleDateString(new Intl.Locale('en-GB'), this.Params);
        // @ts-ignore
        return Preparated.replace(this.DateRegex, this.DateFormat)
    }

    private GetRandomCharts(): string{
        let str = "";
        for(let i = Math.floor(this.SecretKeyLength / this.Type.length + 1); i > 0;)
            (str += this.Type), i--;
        return str.substring(0, this.SecretKeyLength)
    }

    private GetRandom(min: number, max: number){
        return Math.floor(Math.random() * (max - min) + min);
    }

    private reduce(n: number){ return 122 - n + 1; }

    private PrepareEncrypt(){
        const rand = this.GetRandom(33, 44)
        const reduced = this.reduce(rand);
        const randKey = this.GetRandomCharts();
        return {rand, reduced, randKey}
    }
    getSecretKey(){
        return `secretKey${this.format()}crypto`;
    }

    setSecretKey(secret: string): void{
        this.SecretKey = secret;
        this.SecretKeyLength = secret.length;
    }
    encrypt(): string{
        const randomStuff = this.PrepareEncrypt();
        for (var a, i = "", s = 0; s < this.SecretKeyLength; s++)
            (a = this.SecretKey.charCodeAt(s) - randomStuff.rand + randomStuff.randKey.charCodeAt(s) - randomStuff.rand), 
            (i += String.fromCharCode((a % randomStuff.reduced) + randomStuff.rand));
        return (i += "~" + String.fromCharCode(randomStuff.rand));
    }
}