import LocaleBase from "./localeBase";

export default class En extends LocaleBase {
    constructor() {
        super();

        this.gregorian = {
            months: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        };

        this.persian = {
            months: ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad",
                "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"],
            monthsShort: ["Far", "Ord", "Kho", "Tir", "Mor", "Sha", "Meh", "Aba", "Aza", "Dey", "Bah", "Esf"],
            weekdays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        };

        this.kurdish = {
            months: ["Xakelêw", "Gulan", "Cozerdan", "Pûşper", "Gelawêj", "Xermanan",
                "Rezber", "Gelarêzan", "Sermawez", "Befranbar", "Rêbendan", "Reşeme"],
            monthsShort: ["Xak", "Gul", "Cozerd", "Pûşper", "Gelawêj", "Xerman",
                "Rezber", "Gelarêz", "Serma", "Befran", "Rêbend", "Reşeme"],
            weekdays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        };

        this.islamic = {
            months: ["Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-Thani", "Jumada al-awwal", "Jumada al-Thani",
                "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qidah", "Dhu al-Hijjah"],
            monthsShort: ["Muh", "Saf", "Rab-aw", "Rab-Th", "Jum-aw", "Jum-Th",
                "Raj", "Shab", "Ram", "Shaw", "Dhu-Qid", "Dhu-Hij"],
            weekdays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        };

        this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        this.amPm = ["am", "pm"];
    }
}
