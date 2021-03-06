import CurrentDateInfo from "./currentDateInfo";
import DateConverter from "./dateConverter";
import DateInfo from "./dateInfo";
import { CalendarType, DatePartKey, LocaleType } from "./declarations";
import En from "./locale/en";
import Fa from "./locale/fa";
import Ku from "./locale/ku";
import LocaleBase from "./locale/localeBase";
import RangeName from "./rangeName";

export default class KurdishDate {
    public static toCalendar(calendarType: CalendarType): typeof KurdishDate {
        const d = KurdishDate;
        d.calendarType = calendarType;
        return d;
    }

    public static toLocale(localeType: LocaleType): typeof KurdishDate {
        const d = KurdishDate;
        d.localeType = localeType;
        return d;
    }

    private static localeType: LocaleType = LocaleType.ku;
    private static calendarType: CalendarType = CalendarType.Kurdish;

    private dateConverter: DateConverter;
    private localeType: LocaleType;
    private locale: LocaleBase;
    private calendarType: CalendarType;
    private currentDate: CurrentDateInfo;
    private formatDigit: boolean;

    constructor(input?: any) {
        this.calendarType = KurdishDate.calendarType;
        this.currentDate = new CurrentDateInfo();
        this.formatDigit = true;

        this.toLocale(KurdishDate.localeType);

        this.dateConverter = new DateConverter(this.currentDate);
        this.setup(input);
        return this;
    }

    public toCalendar(calendarType: CalendarType): KurdishDate {
        this.calendarType = calendarType;
        return this;
    }

    public toLocale(localeType: LocaleType): KurdishDate {
        this.localeType = localeType;

        switch (localeType) {
            case LocaleType.fa:
                this.locale = new Fa();
                break;

            case LocaleType.ku:
                this.locale = new Ku();
                break;

            default:
                this.locale = new En();
                break;
        }

        return this;
    }

    public toDate(): Date {
        return this.currentDate.primaryDate;
    }

    public toUtc(): KurdishDate {
        let utcStamp;
        const offsetMils = this.timezone() * 60 * 1000;

        if (this.timezone() < 0) {
            utcStamp = this.valueOf() + offsetMils;
        } else {
            utcStamp = this.valueOf() - offsetMils;
        }

        const utcDate = new Date(utcStamp);
        this.setup(utcDate);
        return this;
    }

    public toArray(): number[] {
        return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
    }

    public clone(): KurdishDate {
        const syncedKurdishDate = this.getSyncedClass();
        return new syncedKurdishDate(this.currentDate.primaryDate);
    }

    public year(year?: number): number {
        if (year || year === 0) {
            this.setupFromDateArray([
                year,
                this.month(),
                this.date(),
                this.hour(),
                this.minute(),
                this.second(),
                this.millisecond(),
            ]);
        }

        return this.calendar().year;
    }

    public month(month?: number): number {
        if (month || month === 0) {
            this.setupFromDateArray([
                this.year(),
                month,
                this.date(),
            ]);
        }

        return this.calendar().month + 1;
    }

    public day(): number {
        return this.calendar().weekday;
    }

    public date(date?: number): number {
        if (date || date === 0) {
            this.setupFromDateArray([
                this.year(),
                this.month(),
                date,
            ]);
        }

        return this.calendar().day;
    }

    public hour(hour?: number): number {
        if (hour || hour === 0) {
            this.setupFromDateArray([
                this.year(),
                this.month(),
                this.date(),
                hour,
            ]);
        }

        return this.currentDate.primaryDate.getHours();
    }

    public minute(minute?: number): number {
        if (minute || minute === 0) {
            this.setupFromDateArray([
                this.year(),
                this.month(),
                this.date(),
                this.hour(),
                minute,
            ]);
        }

        return this.currentDate.primaryDate.getMinutes();
    }

    public second(second?: number): number {
        if (second || second === 0) {
            this.setupFromDateArray([
                this.year(),
                this.month(),
                this.date(),
                this.hour(),
                this.minute(),
                second,
            ]);
        }

        return this.currentDate.primaryDate.getSeconds();
    }

    public millisecond(millisecond?: number): number {
        if (millisecond || millisecond === 0) {
            this.setupFromDateArray([
                this.year(),
                this.month(),
                this.date(),
                this.hour(),
                this.minute(),
                this.second(),
                millisecond,
            ]);
        }

        return this.currentDate.gregorian.millisecond;
    }

    public timezone(timezone?: number): number {
        if (timezone || timezone === 0) {
            this.currentDate.timezone = timezone;
        }

        return this.currentDate.timezone;
    }

    public unix(timestamp?: number): number {
        let output: string;
        if (timestamp) {
            this.setup(timestamp * 1000);
        }

        const str = this.currentDate.primaryDate.valueOf().toString();
        output = str.substring(0, str.length - 3);

        return parseInt(output, 10);
    }

    public valueOf(): number {
        return this.currentDate.primaryDate.valueOf();
    }

    public firstWeekDayOfMonth(year?: number, month?: number): number {
        year = year ? year : this.year();
        month = month ? month : this.month();

        const syncedKurdishDate = this.getSyncedClass();
        return new syncedKurdishDate([year, month, 1]).day();
    }

    public daysInMonth(year?: number, month?: number): number {
        year = year ? year : this.year();
        month = month ? month : this.month();
        if (this.calendarType === CalendarType.Kurdish || this.calendarType === CalendarType.Persian) {
            if (month < 1 || month > 12) {
                return 0;
            } else if (month < 7) {
                return 31;
            } else if (month < 12) {
                return 30;
            } else if (this.dateConverter.isSolarLeap(year)) {
                return 30;
            }

            return 29;
        } else if (this.calendarType === CalendarType.Gregorian) {
            return new Date(year, month, 0).getDate();
        } else {
            if (month < 1 || month > 12) {
                return 0;
            } else if (month % 2 === 1) {
                return 30;
            } else if (month === 12 && this.dateConverter.isIslamicLeap(year)) {
                return 30;
            }

            return 29;
        }
    }

    public format(inputString?: string): string {
        // tslint:disable-next-line:max-line-length
        const formattingTokens = /([[^[]*])|(\\)?(Mo|MM?M?M?|Do|DD?D?D?|ddddd?|dddd?|ddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|X|LT|ll?l?l?|LL?L?L?)/g;
        const info = {
            year: this.year(),
            month: this.month(),
            hour: this.hour(),
            minute: this.minute(),
            second: this.second(),
            date: this.date(),
            timezone: this.timezone(),
            unix: this.unix(),
        };

        const checkLocaleDigit = (input: number | string): string => {
            if (this.formatDigit) {
                return this.locale.toLocaleDigit(input.toString());
            } else {
                return input.toString();
            }
        };

        const replaceFunction = (input: string): string => {
            switch (input) {
                // AM/PM
                case ("a"):
                    return this.locale.checkAmPmHour(info.hour);

                // Hours (Int)
                case ("H"):
                    return checkLocaleDigit(info.hour);

                case ("HH"):
                    return checkLocaleDigit(this.leftZeroPad(info.hour, 2));

                case ("h"):
                    return checkLocaleDigit(info.hour % 12);

                case ("hh"):
                    return checkLocaleDigit(this.leftZeroPad(info.hour % 12, 2));

                // Minutes
                case ("m"):
                    return checkLocaleDigit(this.leftZeroPad(info.minute, 2));

                // Two Digit Minutes
                case ("mm"):
                    return checkLocaleDigit(this.leftZeroPad(info.minute, 2));

                // Second
                case ("s"):
                    return checkLocaleDigit(info.second);

                case ("ss"):
                    return checkLocaleDigit(this.leftZeroPad(info.second, 2));

                // Day (Int)
                case ("D"):
                    return checkLocaleDigit(info.date);

                // Return Two Digit
                case ("DD"):
                    return checkLocaleDigit(this.leftZeroPad(info.date, 2));

                // Return day Of Month
                case ("DDD"): {
                    const t = this.startOf(DatePartKey.Year);
                    return checkLocaleDigit(this.leftZeroPad(this.diff(t, DatePartKey.Day), 3));
                }

                // Return Day of Year
                case ("DDDD"): {
                    const t = this.startOf(DatePartKey.Year);
                    return checkLocaleDigit(this.leftZeroPad(this.diff(t, DatePartKey.Day), 3));
                }

                // Return day Of week
                case ("d"):
                    return checkLocaleDigit(this.calendar().weekday);

                // Return Day Name
                case ("dd"):
                    return this.weekNameMin(this.calendar().weekday);

                // Return week day name abbr
                case ("ddd"):
                    return this.weekNameShort(this.calendar().weekday);

                case ("dddd"):
                    return this.weekName(this.calendar().weekday);

                // Return Week Of Year
                case ("w"): {
                    const t = this.startOf(DatePartKey.Year);
                    const day = Math.floor(this.diff(t, DatePartKey.Day) / 7) + 1;
                    return checkLocaleDigit(day);
                }

                // Return Week Of Year
                case ("ww"): {
                    const t = this.startOf(DatePartKey.Year);
                    const weekOfYear = Math.floor(this.diff(t, DatePartKey.Day) / 7) + 1;
                    const day = this.leftZeroPad(weekOfYear, 2);
                    return checkLocaleDigit(day);
                }

                // Month  (Int)
                case ("M"):
                    return checkLocaleDigit(info.month);

                // Two Digit Month (Str)
                case ("MM"):
                    return checkLocaleDigit(this.leftZeroPad(info.month, 2));

                // Abbr String of Month (Str)
                case ("MMM"):
                    return this.monthNameShort(info.month);

                // Full String name of Month (Str)
                case ("MMMM"):
                    return this.monthName(info.month);

                // Year
                // Two Digit Year (Str)
                case ("YY"): {
                    const yearDigitArray = info.year.toString().split("");
                    return checkLocaleDigit(yearDigitArray[2] + yearDigitArray[3]);
                }
                // Full Year (Int)
                case ("YYYY"):
                    return checkLocaleDigit(info.year);

                case ("Z"): {
                    let flag = "+";
                    let hours = Math.floor(-1 * info.timezone / 60);
                    let minutes = -1 * info.timezone % 60;

                    if (minutes < 0) {
                        minutes *= -1;
                    }
                    if (hours < 0) {
                        flag = "-";
                        hours *= -1;
                    }

                    const z = flag + this.leftZeroPad(hours, 2) + ":" + this.leftZeroPad(minutes, 2);
                    return checkLocaleDigit(z);
                }

                case ("ZZ"): {
                    let flag = "+";
                    let hours = Math.floor(-1 * info.timezone / 60);
                    let minutes = -1 * info.timezone % 60;

                    if (minutes < 0) {
                        minutes *= -1;
                    }
                    if (hours < 0) {
                        flag = "-";
                        hours *= -1;
                    }
                    const z = flag + this.leftZeroPad(hours, 2) + "" + this.leftZeroPad(minutes, 2);
                    return checkLocaleDigit(z);
                }

                case ("X"):
                    return this.unix().toString();

                // 8:30 PM
                case ("LT"):
                    return this.format("H:m a");

                // 09/04/1986
                case ("L"):
                    return this.format("YYYY/MM/DD");

                // 9/4/1986
                case ("l"):
                    return this.format("YYYY/M/D");

                // September 4th 1986
                case ("LL"):
                    return this.format("MMMM DD YYYY");

                // Sep 4 1986
                case ("ll"):
                    return this.format("MMM DD YYYY");

                // September 4th 1986 8:30 PM
                case ("LLL"):
                    return this.format("MMMM YYYY DD  H:m  a");

                // Sep 4 1986 8:30 PM
                case ("lll"):
                    return this.format("MMM YYYY DD  H:m  a");

                // Thursday, September 4th 1986 8:30 PM
                case ("LLLL"):
                    return this.format("dddd D MMMM YYYY  H:m  a");

                // Thu, Sep 4 1986 8:30 PM
                case ("llll"):
                    return this.format("ddd D MMM YYYY  H:m  a");

                default:
                    return this.format("YYYY-MM-DD HH:mm:ss a");
            }
        };

        if (inputString) {
            return inputString.replace(formattingTokens, replaceFunction);
        } else {
            inputString = "YYYY-MM-DDTHH:mm:ssZ";
            return inputString.replace(formattingTokens, replaceFunction);
        }
    }

    public startOf(key: DatePartKey): KurdishDate {
        const syncedKurdishDate = this.getSyncedClass();
        let startDate: KurdishDate;

        switch (key) {
            case DatePartKey.Year:
                startDate = new syncedKurdishDate([this.year(), 1, 1]);
                break;

            case DatePartKey.Month:
                startDate = new syncedKurdishDate([this.year(), this.month(), 1]);
                break;

            case DatePartKey.Day:
                startDate = new syncedKurdishDate([this.year(), this.month(), this.date(), 0, 0, 0]);
                break;

            case DatePartKey.Hour:
                startDate = new syncedKurdishDate([this.year(), this.month(), this.date(), this.hour(), 0, 0]);
                break;

            case DatePartKey.Minute:
                startDate = new syncedKurdishDate([this.year(), this.month(), this.date()
                    , this.hour(), this.minute(), 0]);
                break;

            case DatePartKey.Second:
                startDate = new syncedKurdishDate([this.year(), this.month(), this.date()
                    , this.hour(), this.minute(), this.second()]);
                break;

            case DatePartKey.Millisecond:
                startDate = this.clone();
                break;

            case DatePartKey.Week:
                startDate = new syncedKurdishDate([this.year(), this.month()
                    , this.date() - (this.calendar().weekday - 1)]);
                break;

            default:
                startDate = this.clone();
                break;
        }

        return startDate;
    }

    public endOf(key: DatePartKey): KurdishDate {
        const syncedKurdishDate = this.getSyncedClass();
        let endDate: KurdishDate;

        switch (key) {
            case DatePartKey.Year:
                const days = this.isLeapYear() ? 30 : 29;
                endDate = new syncedKurdishDate([this.year(), 12, days, 23, 59, 59]);
                break;

            case DatePartKey.Month:
                const monthDays = this.daysInMonth(this.year(), this.month());
                endDate = new syncedKurdishDate([this.year(), this.month(), monthDays, 23, 59, 59]);
                break;

            case DatePartKey.Day:
                endDate = new syncedKurdishDate([this.year(), this.month(), this.date(), 23, 59, 59]);
                break;

            case DatePartKey.Hour:
                endDate = new syncedKurdishDate([this.year(), this.month(), this.date(), this.hour(), 59, 59]);
                break;

            case DatePartKey.Minute:
                endDate = new syncedKurdishDate([this.year(), this.month(), this.date()
                    , this.hour(), this.minute(), 59]);
                break;

            case DatePartKey.Second:
                endDate = new syncedKurdishDate([this.year(), this.month(), this.date()
                    , this.hour(), this.minute(), this.second()]);
                break;

            case DatePartKey.Millisecond:
                endDate = this.clone();
                break;

            case DatePartKey.Week:
                const weekDayNumber = this.calendar().weekday;
                endDate = new syncedKurdishDate([this.year(), this.month(), this.date() + (7 - weekDayNumber)]);
                break;

            default:
                endDate = this.clone();
                break;
        }

        return endDate;
    }

    public add(key: DatePartKey, value: number): KurdishDate {
        switch (key) {
            case DatePartKey.Year:
                this.year(value + this.year());
                break;

            case DatePartKey.Month:
                const oldDate = this.date();
                const newMonth = this.month() + value;
                const thisMonthDaysCount = this.daysInMonth(this.year(), newMonth);
                if (oldDate >= thisMonthDaysCount) {
                    this.date(thisMonthDaysCount);
                }
                this.month(newMonth);
                break;

            case DatePartKey.Day:
                const oldHour = this.hour();
                const newDateFromDay = this.valueOf() + (value * 24 * 60 * 60 * 1000);
                this.unix(newDateFromDay / 1000);
                this.hour(oldHour);
                break;

            case DatePartKey.Hour:
                const newDateFromHour = this.valueOf() + (value * 60 * 60 * 1000);
                this.unix(newDateFromHour / 1000);
                break;

            case DatePartKey.Minute:
                const newDateFromMinute = this.valueOf() + (value * 60 * 1000);
                this.unix(newDateFromMinute / 1000);
                break;

            case DatePartKey.Second:
                const newDateFromSecond = this.valueOf() + (value * 1000);
                this.unix(newDateFromSecond / 1000);
                break;

            case DatePartKey.Millisecond:
                const newMillisecond = this.valueOf() + value;
                this.unix(newMillisecond / 1000);
                break;

            case DatePartKey.Week:
                this.add(DatePartKey.Day, value * 7);
                break;
        }

        return this;
    }

    public subtract(key: DatePartKey, value: number): KurdishDate {
        return this.add(key, -1 * value);
    }

    public isLeapYear() {
        return this.calendar().isLeap;
    }

    public getRangeName(): RangeName {
        switch (this.calendarType) {
            case CalendarType.Kurdish:
                return this.locale.kurdish;

            case CalendarType.Persian:
                return this.locale.persian;

            case CalendarType.Islamic:
                return this.locale.islamic;

            default:
                return this.locale.gregorian;
        }
    }

    private setup(input: any): any {
        // Convert Any thing to Gregorian Date
        if (this.isDate(input)) {
            this.setupFromGregorianDate(input);
        } else if (this.isArray(input)) {
            this.setupFromDateArray([input[0], (input[1] ? input[1] : 1), (input[2] ? input[2] : 1),
            input[3], input[4], input[5], (input[6] ? input[6] : 0)]);
        } else if (this.isNumber(input)) {
            const fromUnix = new Date(input);
            this.setupFromGregorianDate(fromUnix);
        } else if (input instanceof KurdishDate) {
            const kurdishDate = input as KurdishDate;
            this.setupFromDateArray([
                kurdishDate.year(),
                kurdishDate.month(),
                kurdishDate.date(),
                kurdishDate.hour(),
                kurdishDate.minute(),
                kurdishDate.second(),
                kurdishDate.millisecond(),
            ]);
        } else if (input && input.substring(0, 6) === "/Date(") {   // ASP.NET JSON Date
            const fromDotNet = new Date(parseInt(input.substr(6), 10));
            this.setupFromGregorianDate(fromDotNet);
        } else {
            const now = new Date();
            this.setupFromGregorianDate(now);
        }
    }

    private isArray(input: any): boolean {
        return Object.prototype.toString.call(input) === "[object Array]";
    }

    private isNumber(input: any): boolean {
        return typeof input === "number";
    }

    private isDate(input: any): boolean {
        return input instanceof Date;
    }

    private leftZeroPad(input: number, targetLength: number): string {
        let result: string = input.toString();
        while (result.length < targetLength) {
            result = "0" + result;
        }
        return result;
    }

    private getSyncedClass(): typeof KurdishDate {
        const syncedKurdishDate = KurdishDate;
        syncedKurdishDate.toCalendar(this.calendarType).toLocale(this.localeType);
        return syncedKurdishDate;
    }

    private diff(input: KurdishDate, key: DatePartKey, asFloat: boolean = false): number {
        const zoneDiff = 0;
        const diff = this.currentDate.primaryDate.getTime() - input.toDate().getTime() - zoneDiff;
        const yearDiff = this.year() - input.year();
        const monthDiff = this.month() - input.month();
        const dayDiff = (this.date() - input.date()) * -1;
        let output: number;

        switch (key) {
            case DatePartKey.Year:
                output = yearDiff + (monthDiff + dayDiff / 30) / 12;
                break;

            case DatePartKey.Month:
                output = yearDiff * 12 + monthDiff + dayDiff / 30;
                break;

            case DatePartKey.Day:
                output = diff / 864e5; // 1000 * 60 * 60 * 24
                break;

            case DatePartKey.Hour:
                output = diff / 36e5; // 1000 * 60 * 60
                break;

            case DatePartKey.Minute:
                output = diff / 6e4; // 1000 * 60
                break;

            case DatePartKey.Second:
                output = diff / 1e3; // 1000
                break;

            case DatePartKey.Millisecond:
                output = diff;
                break;

            case DatePartKey.Week:
                output = diff / 6048e5; // 1000 * 60 * 60 * 24 * 7
                break;

            default:
                output = diff;
                break;
        }

        if (output < 0) {
            output = output * -1;
        }
        return asFloat ? output : Math.round(output);
    }

    private setupFromGregorianDate(gregorianDate: Date): void {
        this.dateConverter.calcGregorian(
            [
                gregorianDate.getFullYear(),
                gregorianDate.getMonth(),
                gregorianDate.getDate(),
                gregorianDate.getHours(),
                gregorianDate.getMinutes(),
                gregorianDate.getSeconds(),
                gregorianDate.getMilliseconds(),
            ]);
    }

    private setupFromDateArray(dateArray: number[]): void {
        switch (this.calendarType) {
            case CalendarType.Kurdish:
                this.dateConverter.calcKurdish(dateArray);
                break;

            case CalendarType.Persian:
                this.dateConverter.calcPersian(dateArray);
                break;

            case CalendarType.Islamic:
                this.dateConverter.calcIslamic(dateArray);
                break;

            default:
                dateArray[1] = dateArray[1] - 1;
                this.dateConverter.calcGregorian(dateArray);
                break;
        }
    }

    private weekName(input): string {
        return this.getRangeName().weekdays[input - 1];
    }

    private weekNameShort(input): string {
        return this.getRangeName().weekdaysShort[input - 1];
    }

    private weekNameMin(input): string {
        return this.getRangeName().weekdaysMin[input - 1];
    }

    private monthName(input): string {
        return this.getRangeName().months[input - 1];
    }

    private monthNameShort(input): string {
        return this.getRangeName().monthsShort[input - 1];
    }

    private calendar(): DateInfo {
        switch (this.calendarType) {
            case CalendarType.Kurdish:
                return this.currentDate.kurdish;

            case CalendarType.Persian:
                return this.currentDate.persian;

            case CalendarType.Islamic:
                return this.currentDate.islamic;

            default:
                return this.currentDate.gregorian;
        }
    }
}
