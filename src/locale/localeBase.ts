import DateKeyword from "./dateKeyword";

export default abstract class LocaleBase {
    public gregorian: DateKeyword;
    public persian: DateKeyword;
    public kurdish: DateKeyword;
    public islamic: DateKeyword;
    public numbers: string[];
    public amPm: string[];

    public toLocaleDigit(input: string): string {
        let result: string = input;

        for (let j = 0; j < this.numbers.length; j++) {
            result = result.replace(new RegExp(j.toString(), "g"), this.numbers[j]);
        }

        return result;
    }

    public checkAmPmHour(hour: number): string {
        return ((hour >= 12) ? this.amPm[1] : this.amPm[0]);
    }
}
