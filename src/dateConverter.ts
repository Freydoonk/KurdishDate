import CurrentDateInfo from "./currentDateInfo";

export default class DateConverter {
    private readonly gregorianEpoch: number;
    private readonly persianEpoch: number;
    private readonly islamicEpoch: number;
    private readonly julianEpoch1970: number;
    private readonly kurdishYearDiff: number;
    private currentDate: CurrentDateInfo;

    constructor(currentDateInfo: CurrentDateInfo) {
        this.currentDate = currentDateInfo;

        this.gregorianEpoch = 1721425.5;
        this.persianEpoch = 1948320.5;
        this.islamicEpoch = 1948439.5;
        this.julianEpoch1970 = 2440587.5; // Julian date at Unix epoch: 1970-01-01
        this.kurdishYearDiff = 1321;
    }

    public calcGregorian(dateArray: number[]): void {
        if (dateArray[0] || dateArray[0] === 0) {
            this.currentDate.gregorian.year = dateArray[0];
        }
        if (dateArray[1] || dateArray[1] === 0) {
            this.currentDate.gregorian.month = dateArray[1];
        }
        if (dateArray[2] || dateArray[2] === 0) {
            this.currentDate.gregorian.day = dateArray[2];
        }
        if (dateArray[3] || dateArray[3] === 0) {
            this.currentDate.gregorian.hour = dateArray[3];
        }
        if (dateArray[4] || dateArray[4] === 0) {
            this.currentDate.gregorian.minute = dateArray[4];
        }
        if (dateArray[5] || dateArray[5] === 0) {
            this.currentDate.gregorian.second = dateArray[5];
        }
        if (dateArray[6] || dateArray[6] === 0) {
            this.currentDate.gregorian.millisecond = dateArray[6];
        }

        this.updateFromGregorian();
    }

    public calcPersian(dateArray: number[]): void {
        if (dateArray[0]) {
            this.currentDate.persian.year = dateArray[0];
        }
        if (dateArray[1]) {
            this.currentDate.persian.month = dateArray[1];
        }
        if (dateArray[2]) {
            this.currentDate.persian.day = dateArray[2];
        }
        if (dateArray[3]) {
            this.currentDate.gregorian.hour = dateArray[3];
        }
        if (dateArray[4]) {
            this.currentDate.gregorian.minute = dateArray[4];
        }
        if (dateArray[5]) {
            this.currentDate.gregorian.second = dateArray[5];
        }
        if (dateArray[6]) {
            this.currentDate.gregorian.millisecond = dateArray[6];
        }

        const julianDay = this.persianToJulianDay(
            this.currentDate.persian.year,
            this.currentDate.persian.month,
            this.currentDate.persian.day);
        this.setJulian(julianDay);
    }

    public calcKurdish(dateArray: number[]): void {
        if (dateArray[0]) {
            dateArray[0] = dateArray[0] - this.kurdishYearDiff;
        }

        this.calcPersian(dateArray);
    }

    public calcIslamic(dateArray: number[]): void {
        if (dateArray[0]) {
            this.currentDate.islamic.year = dateArray[0];
        }
        if (dateArray[1]) {
            this.currentDate.islamic.month = dateArray[1];
        }
        if (dateArray[2]) {
            this.currentDate.islamic.day = dateArray[2];
        }
        if (dateArray[3]) {
            this.currentDate.gregorian.hour = dateArray[3];
        }
        if (dateArray[4]) {
            this.currentDate.gregorian.minute = dateArray[4];
        }
        if (dateArray[5]) {
            this.currentDate.gregorian.second = dateArray[5];
        }
        if (dateArray[6]) {
            this.currentDate.gregorian.millisecond = dateArray[6];
        }

        const julianDay = this.islamicToJulianDay(
            this.currentDate.islamic.year,
            this.currentDate.islamic.month,
            this.currentDate.islamic.day);
        this.setJulian(julianDay);
    }

    public isGregorianLeap(year: number): boolean {
        return ((year % 4) === 0) && (!(((year % 100) === 0) && ((year % 400) !== 0)));
    }

    public isSolarLeap(year: number): boolean {
        return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
    }

    public isIslamicLeap(year: number): boolean {
        return (((year * 11) + 14) % 30) < 11;
    }

    private gregorianToJulianDay(year: number, month: number, day: number): number {
        return (this.gregorianEpoch - 1) +
            (365 * (year - 1)) +
            Math.floor((year - 1) / 4) +
            (-Math.floor((year - 1) / 100)) +
            Math.floor((year - 1) / 400) +
            Math.floor((((367 * month) - 362) / 12) +
                ((month <= 2) ? 0 :
                    (this.isGregorianLeap(year) ? -1 : -2)
                ) +
                day);
    }

    private julianDayToGregorian(julianDay: number): number[] {
        const wjd = Math.floor(julianDay - 0.5) + 0.5;
        const depoch = wjd - this.gregorianEpoch;
        const quadricent = Math.floor(depoch / 146097);
        const dqc = this.mod(depoch, 146097);
        const cent = Math.floor(dqc / 36524);
        const dcent = this.mod(dqc, 36524);
        const quad = Math.floor(dcent / 1461);
        const dquad = this.mod(dcent, 1461);
        const yindex = Math.floor(dquad / 365);

        let year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;

        if (!((cent === 4) || (yindex === 4))) {
            year++;
        }

        const dayOfYear = wjd - this.gregorianToJulianDay(year, 1, 1);
        const leapadj = ((wjd < this.gregorianToJulianDay(year, 3, 1)) ? 0 : (this.isGregorianLeap(year) ? 1 : 2));
        const month = Math.floor((((dayOfYear + leapadj) * 12) + 373) / 367);
        const day = (wjd - this.gregorianToJulianDay(year, month, 1)) + 1;

        return [year, month, day];
    }

    private persianToJulianDay(year: number, month: number, day: number): number {
        const epbase = year - ((year >= 0) ? 474 : 473);
        const epyear = 474 + this.mod(epbase, 2820);

        return day +
            ((month <= 7) ?
                ((month - 1) * 31) :
                (((month - 1) * 30) + 6)
            ) +
            Math.floor(((epyear * 682) - 110) / 2816) +
            (epyear - 1) * 365 +
            Math.floor(epbase / 2820) * 1029983 +
            (this.persianEpoch - 1);
    }

    private julianDayToPersian(julianDay: number): number[] {
        julianDay = Math.floor(julianDay) + 0.5;

        const depoch = julianDay - this.persianToJulianDay(475, 1, 1);
        const cycle = Math.floor(depoch / 1029983);
        const cyear = this.mod(depoch, 1029983);

        let ycycle;
        if (cyear === 1029982) {
            ycycle = 2820;
        } else {
            const aux1 = Math.floor(cyear / 366);
            const aux2 = this.mod(cyear, 366);
            ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) + aux1 + 1;
        }

        let year = ycycle + (2820 * cycle) + 474;
        if (year <= 0) {
            year--;
        }

        const dayOfYear = (julianDay - this.persianToJulianDay(year, 1, 1)) + 1;
        const month = (dayOfYear <= 186) ? Math.ceil(dayOfYear / 31) : Math.ceil((dayOfYear - 6) / 30);
        const day = (julianDay - this.persianToJulianDay(year, month, 1)) + 1;
        return [year, month, day];
    }

    private islamicToJulianDay(year: number, month: number, day: number): number {
        return (day +
            Math.ceil(29.5 * (month - 1)) +
            (year - 1) * 354 +
            Math.floor((3 + (11 * year)) / 30) +
            this.islamicEpoch) - 1;
    }

    private julianDayToIslamic(julianDay: number): number[] {
        julianDay = Math.floor(julianDay) + 0.5;

        const year = Math.floor(((30 * (julianDay - this.islamicEpoch)) + 10646) / 10631);
        const month = Math.min(12, Math.ceil((julianDay - (29 + this.islamicToJulianDay(year, 1, 1))) / 29.5) + 1);
        const day = (julianDay - this.islamicToJulianDay(year, month, 1)) + 1;
        return [year, month, day];
    }

    private mod(a: number, b: number): number {
        return a - (b * Math.floor(a / b));
    }

    private gregorianWeekDayToPersianWeekDay(weekday: number): number {
        if (weekday + 2 === 8) {
            return 1;
        } else if (weekday + 2 === 7) {
            return 7;
        } else {
            return weekday + 2;
        }
    }

    private setJulian(julianDay: number): void {
        this.currentDate.julianDay = julianDay;
        this.updateFromJulian();
    }

    private updateFromJulian(): void {
        const julianDay = this.currentDate.julianDay;
        const date = this.julianDayToGregorian(julianDay);
        this.currentDate.gregorian.year = date[0];
        this.currentDate.gregorian.month = date[1] - 1;
        this.currentDate.gregorian.day = date[2];

        this.updateFromGregorian();
    }

    private updateFromGregorian(): void {
        const year = this.currentDate.gregorian.year;
        const mon = this.currentDate.gregorian.month;
        const day = this.currentDate.gregorian.day;
        const hour = 0; // this.currentDate.gregorian.hour;
        const min = 0; // this.currentDate.gregorian.minute;
        const sec = 0; // this.currentDate.gregorian.second;

        this.currentDate.primaryDate = new Date(
            year,
            mon,
            day,
            this.currentDate.gregorian.hour,
            this.currentDate.gregorian.minute,
            this.currentDate.gregorian.second,
            this.currentDate.gregorian.millisecond,
        );

        const weekday = this.currentDate.primaryDate.getDay();

        this.currentDate.timezone = this.currentDate.primaryDate.getTimezoneOffset();

        this.currentDate.gregorian.year = this.currentDate.primaryDate.getFullYear();
        this.currentDate.gregorian.month = this.currentDate.primaryDate.getMonth();
        this.currentDate.gregorian.day = this.currentDate.primaryDate.getDate();
        this.currentDate.gregorian.weekday = weekday + 1; // Move to 1 indexed number
        this.currentDate.gregorian.isLeap = this.isGregorianLeap(year);

        //  Update Julian day
        // ---------------------------------------------------------------------------
        const julianDay = this.gregorianToJulianDay(year, mon + 1, day) +
            (Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0);
        this.currentDate.julianDay = julianDay;

        //  Update Persian Calendar
        // ---------------------------------------------------------------------------
        const persianDate = this.julianDayToPersian(julianDay);
        this.currentDate.persian.year = persianDate[0];
        this.currentDate.persian.month = persianDate[1] - 1;
        this.currentDate.persian.day = persianDate[2];
        this.currentDate.persian.weekday = this.gregorianWeekDayToPersianWeekDay(weekday);
        this.currentDate.persian.isLeap = this.isSolarLeap(persianDate[0]);

        //  Update kurdish Calendar
        // ---------------------------------------------------------------------------
        this.currentDate.kurdish.year = this.currentDate.persian.year + this.kurdishYearDiff;
        this.currentDate.kurdish.month = this.currentDate.persian.month;
        this.currentDate.kurdish.day = this.currentDate.persian.day;
        this.currentDate.kurdish.weekday = this.currentDate.persian.weekday;
        this.currentDate.kurdish.isLeap = this.currentDate.persian.isLeap;

        //  Update Islamic Calendar
        // ---------------------------------------------------------------------------
        const islamicDate = this.julianDayToIslamic(julianDay);
        this.currentDate.islamic.year = islamicDate[0];
        this.currentDate.islamic.month = islamicDate[1] - 1;
        this.currentDate.islamic.day = islamicDate[2];
        this.currentDate.islamic.weekday = this.currentDate.persian.weekday;
        this.currentDate.islamic.isLeap = this.isIslamicLeap(persianDate[0]);

        //  Update Unix time()
        // ---------------------------------------------------------------------------
        const unixTime = (julianDay - this.julianEpoch1970) * (60 * 60 * 24 * 1000);
        this.currentDate.unixTime = Math.round(unixTime / 1000);
    }
}
