import LocaleBase from "./localeBase";

export default class Ku extends LocaleBase {
    constructor() {
        super();

        this.gregorian = {
            months: ["یەنایر", "فەبرایر", "مارس", "ئەپریل", "مایۆ", "یونیۆ",
                "یولیۆ", "ئۆغستەس", "سێپتەمبەر", "ئۆکتۆبەر", "نۆڤەمبەر", "دیسەمبەر"],
            monthsShort: ["یەنایر", "فەبرایر", "مارس", "ئەپریل", "مایۆ", "یونیۆ",
                "یولیۆ", "ئۆغستەس", "سێپتەمبەر", "ئۆکتۆبەر", "نۆڤەمبەر", "دیسەمبەر"],
            weekdays: ["یه‌کشه‌ممه", "دووشه‌ممه", "سێشه‌ممه", "چوارشه‌ممه", "پێنجشه‌ممه‌", "هه‌ینی", "شه‌ممه"],
            weekdaysShort: ["یه‌ک", "دوو", "سێ", "چوار", "پێنج", "هه‌ینی", "شه‌ممه"],
            weekdaysMin: ["ش", "ی", "د", "س", "چ", "پ", "ه"],
        };

        this.persian = {
            months: ["فەرڤەردین", "ئۆردیبێهێشت", "خۆرداد", "تیر", "مۆرداد", "شەهریڤەر",
                "مێهر", "ئابان", "ئازەر", "دێی", "بەهمەن", "ئێسفەند"],
            monthsShort: ["فەر", "ئۆرد", "خۆرد", "تیر", "مۆرد", "شەهر", "مێهر", "ئابا", "ئازەر", "دێی", "بەهم", "ئێسف"],
            weekdays: ["شه‌ممه", "یه‌کشه‌ممه", "دووشه‌ممه", "سێشه‌ممه", "چوارشه‌ممه", "پێنجشه‌ممه‌", "هه‌ینی"],
            weekdaysShort: ["شه‌ممه", "یه‌ک", "دوو", "سێ", "چوار", "پێنج", "هه‌ینی"],
            weekdaysMin: ["ش", "ی", "د", "س", "چ", "پ", "ه"],
        };

        this.kurdish = {
            months: ["خاکه‌لێوه", "گوڵان", "جۆزه‌ردان", "پووشپه‌ڕ", "گه‌لاوێژ", "خه‌رمانان",
                "ڕه‌زبه‌ر", "گه‌ڵارێزان", "سه‌رماوه‌ز", "به‌فرانبار", "ڕێبه‌ندان", "ڕەشەمێ"],
            monthsShort: ["خاک", "گوڵان", "جۆزه‌رد", "پووشپه‌ڕ", "گه‌لاوێژ", "خه‌رمان",
                "ڕه‌زبه‌ر", "گه‌ڵارێز", "سه‌رما", "به‌فران", "ڕێبه‌ند", "ڕەشەمێ"],
            weekdays: ["شه‌ممه", "یه‌کشه‌ممه", "دووشه‌ممه", "سێشه‌ممه", "چوارشه‌ممه", "پێنجشه‌ممه‌", "هه‌ینی"],
            weekdaysShort: ["شه‌ممه", "یه‌ک", "دوو", "سێ", "چوار", "پێنج", "هه‌ینی"],
            weekdaysMin: ["ش", "ی", "د", "س", "چ", "پ", "ه"],
        };

        this.islamic = {
            months: ["موحەڕڕەم", "سەفەر", "ڕەبیعەلئەووەل", "ڕەبیعەلئەسسانی", "جەمادەلئوولا", "جومادەلئاخیر",
                "ڕەجەب", "شەعبان", "ڕەمەزان", "شەووال", "زولقەعدە", "زولحەججە"],
            monthsShort: ["موح", "سەف", "ڕەبیع١", "ڕەبیع٢", "جەماد-١", "جەماد-٢",
                "ڕەج", "شەعب", "ڕەمەز", "شەو", "زولقەع", "زولحەج"],
            weekdays: ["شه‌ممه", "یه‌کشه‌ممه", "دووشه‌ممه", "سێشه‌ممه", "چوارشه‌ممه", "پێنجشه‌ممه‌", "هه‌ینی"],
            weekdaysShort: ["شه‌ممه", "یه‌ک", "دوو", "سێ", "چوار", "پێنج", "هه‌ینی"],
            weekdaysMin: ["ش", "ی", "د", "س", "چ", "پ", "ه"],
        };

        this.numbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

        this.amPm = ["ب.ن", "د.ن"];
    }
}
