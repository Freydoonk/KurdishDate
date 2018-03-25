import DateInfo from "./dateInfo";
import DateInfoFull from "./dateInfoFull";

export default class CurrentDateInfo {
    public gregorian: DateInfoFull;
    public islamic: DateInfo;
    public persian: DateInfo;
    public kurdish: DateInfo;
    public primaryDate: Date;
    public unixTime: number;
    public julianDay: number;
    public timezone: number;

    constructor() {
        this.primaryDate = null;
        this.unixTime = 0;
        this.julianDay = 0;
        this.timezone = 0;

        this.gregorian = new DateInfoFull();
        this.gregorian.year = 0;
        this.gregorian.month = 0;
        this.gregorian.day = 0;
        this.gregorian.isLeap = false;
        this.gregorian.weekday = 0;
        this.gregorian.hour = 0;
        this.gregorian.minute = 0;
        this.gregorian.second = 0;
        this.gregorian.millisecond = 0;

        this.kurdish = new DateInfo();
        this.kurdish.year = 0;
        this.kurdish.month = 0;
        this.kurdish.day = 0;
        this.kurdish.isLeap = false;
        this.kurdish.weekday = 0;

        this.islamic = new DateInfo();
        this.islamic.year = 0;
        this.islamic.month = 0;
        this.islamic.day = 0;
        this.islamic.isLeap = false;
        this.islamic.weekday = 0;

        this.persian = new DateInfo();
        this.persian.year = 0;
        this.persian.month = 0;
        this.persian.day = 0;
        this.persian.isLeap = false;
        this.persian.weekday = 0;
    }
}
