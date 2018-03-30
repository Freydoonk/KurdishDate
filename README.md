
Kurdish Date
==============

Javascript date library for parsing, validating, manipulating, and formatting date in Kurdish, Persian, Islamic and Gregorian, based on [PersianDate](https://github.com/babakhani/PersianDate)

## Install

```shell
npm install kurdish-date --save-dev
yarn add kurdish-date --dev
```

## Browser

```html
<script src="node_modules/kurdish-date/lib/kurdishDate.js" type="text/javascript"></script>
<script src="node_modules/kurdish-date/lib/declarations.js" type="text/javascript"></script>
<script type="text/javascript">
    var date = new kurdishDate().toLocale(LocaleType.en).format();  // "2718-01-17T11:20:25+03:30" //
</script>
```
## Webpack
```javascript
require('kurdishDate-date');
```

## Typescript
```javascript
import kurdishDate from "kurdish-date";
import { CalendarType, LocaleType } from "kurdish-date/lib/declarations";
```


## Calendar and locale

### toCalendar

Default: ```Kurdish```
Available option in CalendarType: ```Kurdish``` ```Persian``` ```Gregorian``` ```Islamic```

Change calendar type globally:

```javascript
KurdishDate.toCalendar(CalendarType.Gregorian);
new KurdishDate([2018]).year(); // 2017
new KurdishDate([2018]).format("MMM"); // "یەنایر"
```

or change calendar type on instance:

```javascript
new KurdishDate([2718]).toCalendar(CalendarType.Gregorian).year(); // 2018
```


### toLocale

Default: ```ku```
Available option in LocaleType: ```ku``` ```fa``` ```en```

Change locale globally:
 
```javascript
KurdishDate.toLocale(LocaleType.en);
new KurdishDate([2718, 1, 17]).format();       // "2718-01-17T00:00:00+03:30"
new KurdishDate([2718, 1, 17]).format("dddd"); // "Friday"
new KurdishDate([2718, 1, 17]).format("MMMM"); // "Xakelêw"

KurdishDate.toLocale(LocaleType.ku);
new KurdishDate([2718, 1, 17]).format();       // "٢٧١٨-٠١-١٧T٠٠:٠٠:٠٠+٠٣:٣٠"
new KurdishDate([2718, 1, 17]).format("dddd"); // "هه‌ینی"
new KurdishDate([2718, 1, 17]).format("MMMM"); // "خاکه‌لێوه"

```

or change locale on instance:


```javascript
new KurdishDate([2718, 1, 17]).toLocale(LocaleType.en).format();       // "2718-01-17T00:00:00+03:30"
new KurdishDate([2718, 1, 17]).toLocale(LocaleType.en).format("dddd"); // "Friday"
new KurdishDate([2718, 1, 17]).toLocale(LocaleType.en).format("MMMM"); // "Xakelêw"

KurdishDate.toCalendar(CalendarType.Gregorian);
new KurdishDate([2718, 1, 17]).toLocale(LocaleType.ku).format();       // "٢٧١٨-٠١-١٧T٠٠:٠٠:٠٠+٠٣:٣٠"
new KurdishDate([2718, 1, 17]).toLocale(LocaleType.ku).format('dddd'); // "هه‌ینی"
new KurdishDate([2718, 1, 17]).toLocale(LocaleType.ku).format('MMMM'); // "خاکه‌لێوه"

```

## Initialize instance

Simply call ```new KurdishDate() ``` to get an instance of KurdishDate.

### Now

To get the current date and time, just call ```new KurdishDate()``` with no parameters.

```javascript
let now = new KurdishDate();
```

This is essentially the same as calling ```new KurdishDate(new Date())``` .


### Unix Offset (milliseconds)

```javascript
new KurdishDate(/* Number */);
```

Similar to ``` new Date(Number)```, you can create a KurdishDate by passing an integer value representing the number of milliseconds since the Unix Epoch (Jan 1 1970 12AM UTC).


```javascript
let day = new KurdishDate(1318781876406); // "٢٧١١-٠٧-٢٤ ١٩:٤٧:٥٦ د.ن"
```

### Date

```javascript
new KurdishDate(new Date());
```

You can create a ```KurdishDate``` with a pre-existing native Javascript ```Date``` object.

```javascript
let day = new Date(2018, 2, 16);
let dayWrapper = new KurdishDate(day); // "٢٧١٧-١٢-٢٥ ٠٠:٠٠:٠٠ ب.ن"
```
This is the fastest way to get a KurdishDate.js wrapper.


### Array

> ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond']

```javascript
new KurdishDate([2718, 1, 7, 12, 25, 25, 900]); 
```

You can create a KurdishDate with an array of numbers that mirror the parameters passed to new ```Date()``` But As Kurdish Date Number Like [2718,2,22,11,22,30]

```javascript
new KurdishDate([2718, 1, 7, 12, 25, 25, 900]); // "٢٧١٨-٠١-٠٧ ١٢:٢٥:٢٥ د.ن"
```

Any value past the year is optional, and will default to the lowest possible number.

```javascript
new KurdishDate([2718]);    // ٢٧١٨/٠١/٠١
new KurdishDate([2718, 6]); // ٢٧١٨/٠٦/٠١
```

> You can pass Islamic, Gregorian or Persian date array to create instance. for this functionality you must change calendar type by ```toCalendar(CalendarType.Gregorian)```, ```toCalendar(CalendarType.Islamic)``` and ...

example:

```javascript
KurdishDate.toCalendar(CalendarType.Gregorian);
new KurdishDate([2018, 3, 25]).format("YYYY/MM/DD"); // "٢٠١٨/٠٣/٢٥"
```

### KurdishDate Clone

```javascript
new KurdishDate(otherKurdishDate);
```

All KurdishDate are mutable. If you want a clone of a KurdishDate, you can do so explicitly or implicitly.
Calling ```KurdishDate()``` on a KurdishDate will clone it.

```javascript
let a = new KurdishDate([2718]);
let b = new KurdishDate(a);
a.year(2710);
b.year(); // 2718
```

```javascript
let a = new KurdishDate([2718]);
let b = a.clone();
a.year(2710);
b.year(); // 2718
```

## Get + Set

kurdishDate.js uses overloaded getters and setters.Calling these methods without parameters acts as a getter, and calling them with a parameter acts as a setter.

```javascript
new KurdishDate().second(30); // 30
new KurdishDate().second() === 30; // true
```

### Millisecond

```javascript
new KurdishDate().millisecond(100);
new KurdishDate().millisecond(); // 100
```

Gets or sets the milliseconds.

Accepts numbers from 0 to 999. If the range is exceeded, it will bubble up to the seconds.

### Second

```javascript
new KurdishDate().second(10);
new KurdishDate().second(); // 10
```

Gets or sets the seconds.

Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the minutes.

### Minute

```javascript
new KurdishDate().minute(20);
new KurdishDate().minute(); // 20
```

Gets or sets the minutes.

Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the hours.

### Hour

```javascript
new KurdishDate().hour(12);
new KurdishDate().hour(); // 12
```

Gets or sets the hour.

Accepts numbers from 0 to 23. If the range is exceeded, it will bubble up to the day.

### Date of Month

```javascript
new KurdishDate().date(23);
new KurdishDate().date(); // 23
```

Gets or sets the day of the month.

Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the months.

> Note: KurdishDate#date is for the date of the month, and KurdishDate#day is for the day of the week.

### Year

```javascript
new KurdishDate().year(2718);
new KurdishDate().year(); // 2718
```

Gets or sets the year.

Accepts numbers from -270,000 to 270,000.

### Day of Week

```javascript
new KurdishDate().day(); // Number
```

Gets the day of the week.

> Note: ```KurdishDate#date``` is for the date of the month, and ```KurdishDate#day``` is for the day of the week.


## Manipulate

You can change any part of date by manipulate functions.
To specific the date part you must use ```DatePartKey```, The ```DatePartKey``` is contains bellow keys:

- Year
- Month
- Week
- Day
- Hour
- Minute
- Second
- Millisecond


```javascript
new KurdishDate().add(DatePartKey.Day, 7).subtract(DatePartKey.Month, 1);
```

> Note: It should be noted that KurdishDates are mutable. Calling any of the manipulation methods will change the original KurdishDate.

If you want to create a copy and manipulate it, you should use ```KurdishDate#clone``` before manipulating the KurdishDate.


### Add

```javascript
new KurdishDate().add(DatePartKey, Number);
```

Mutates the original KurdishDate by adding time.

This is a pretty robust function for adding time to an existing KurdishDate. To add time, pass the DatePartKey of what time you want to add, and the amount you want to add.

```javascript
new KurdishDate().add(DatePartKey.Day, 7);
```

If you want to add multiple different keys at the same time, you can pass them in as an object literal.

```javascript
new KurdishDate().add(DatePartKey.Day, 7).add(DatePartKey.Month, 1); // with chaining
```

There are no upper limits for the amounts, so you can overload any of the parameters.

```javascript
new KurdishDate().add(DatePartKey.Milliseconds, 1000000); // a million milliseconds
new KurdishDate().add(DatePartKey.Days, 360); // 360 days
```

### Subtract

```javascript
new KurdishDate().subtract(DatePartKey, Number);
```

Mutates the original KurdishDate by subtracting time.

This is exactly the same as ```KurdishDate#add``` , only instead of adding time, it subtracts time.

```javascript
new KurdishDate().subtract(DatePartKey.Day, 7);
```

### Start of Time

```javascript
new KurdishDate().startOf(DatePartKey);
```

Mutates the original KurdishDate by setting it to the start of a unit of time.

```javascript
new KurdishDate().startOf(DatePartKey.Year);   // set to the first of the first month, 12:00 am this year
new KurdishDate().startOf(DatePartKey.Month);  // set to the first of this month, 12:00 am
new KurdishDate().startOf(DatePartKey.Week);   // set to the first day of this week, 12:00 am
new KurdishDate().startOf(DatePartKey.Day);    // set to 12:00 am today
new KurdishDate().startOf(DatePartKey.Hour);   // set to now, but with 0 mins, 0 secs, and 0 ms
new KurdishDate().startOf(DatePartKey.Minute); // set to now, but with 0 seconds and 0 milliseconds
new KurdishDate().startOf(DatePartKey.Second); // same as KurdishDate().millisecond(0);
```

These shortcuts are essentially the same as the following.

```javascript
new KurdishDate().startOf(DatePartKey.Year);
let now = new KurdishDate();
now.month(1);
now.date(1);
now.hour(0)
now.minute(0);
now.second(0);
now.millisecond(0);
```

```javascript
new KurdishDate().startOf(DatePartKey.Hour);
let now = new KurdishDate();
now.minute(0);
now.second(0);
now.millisecond(0);
```

### End of Time

```javascript
new KurdishDate().endOf(DatePartKey);
```

Mutates the original KurdishDate by setting it to the end of a unit of time.

This is the same as ```KurdishDate#startOf``` , only instead of setting to the start of a unit of time, it sets to the end of a unit of time.

```javascript
new KurdishDate().endOf(DatePartKey.Year); // set the KurdishDate to the last day of the last month 11:59:59.999 pm this year
```

## Display

Once parsing and manipulation are done, you need some way to display the KurdishDate.


### Format

```javascript
new KurdishDate().format();
new KurdishDate().format(String);
```

This is the most robust display option. It takes a string of tokens and replaces them with their corresponding values.

```javascript
new KurdishDate().format("dddd, MMMM DD YYYY, h:mm:ss a"); // "سێشه‌ممه, خاکه‌لێوه ٢١ ٢٧١٨, ٠:٠٠:٠٠ ب.ن"
new KurdishDate().format("dddd, ha"); // "دووشه‌ممه, ٧د.ن"
```

This is the most robust display option. It takes a string of tokens and replaces them with their corresponding values.


| Type	            | Tocken	    | Output |
| -------------     |:-------------:|:------:|
| Month             | M	            | ۱ ۲ ... ۱۱ ۱۲|
|        	        | MM	        | ۰۱ ۰۲ ... ۱۱ ۱۲|
|        	        | MMM	        | خاک گوڵان ... ڕەشەمێ|
|                   | MMMM	        | خاکه‌لێوه گوڵان ... ڕەشەمێ |
| Day of month      | D            | ۱ ۲ ... ۳۰ ۳۱|
|                   | DD           | ۰۱ ۰۲ ... ۳۰ ۳۱|
| Day of year       | DDD          | ۱ ۲ ... ۳۶۴ ۳۶۵|
| Day of week       | d            | ۰ ۱ ... ۵ ۶|
|                   | dd            | ش ی ... ه|
|                   | ddd       |شه‌ممه یه‌ک دوو ... هه‌ینی|
|                   | dddd    |شه‌ممه یه‌کشه‌ممه ... هه‌ینی|
| Week of Year      | w            | ۱ ۲ ... ۵۲ ۵۳ |
|                   | ww           | ۰۱ ۰۲ ... ۵۲ ۵۳ |
|Year               | YY           | ۱۳ ۱۴ ... ۱۸ ۱۹ |
|                   | YYY          | ۲۷۱۳ ۲۷۱۴ ... |
| AM/PM              | a            | "ب.ن", "د.ن" |
| Hour              | H            | ۰ ۱ ... ۲۲ ۲۳ |
|                   | HH           | ۰۰ ۰۱ ... ۲۲ ۲۳ |
|                   | h            | ۱ ۲ ... ۱۱ ۱۲ |
|                   | hh           | ۰۱ ۰۲ ... ۱۱ ۱۲ |
| Minute            | m            | ۰ ۱ ... ۵۸ ۵۹ |
|                   | mm           | ۰۰ ۰۱ ... ۵۸ ۵۹ |
| Second            | s            | ۰ ۱ ... ۵۸ ۵۹ |
|                   | ss           | ۰۰ ۰۱ ... ۵۸ ۵۹ |
| Unix Timestamp     | X            | 1360013296 |
| Timezone          | Z            | -۰۴:۳۰ -۰۵:۰۰ ... +۰۴:۳۰ +۰۵:۰۰ |
|                   | ZZ           | -۰۴۳۰ -۰۵:۰۰ ... +۰۴:۳۰ +۰۵:۰۰ |


### Long Date formats

| Type	                                            | Tocken	    | Output |
| -------------                                     |:-------------:|:------:|
| Time                                              | LT            | "۴:۱۵ د.ن"|
| Month numeral, day of month, year                 | L             | ۲۷۱۸/۰۲/۲۰ |
|                                                   | l             | ۳۹۲/۲/۲۰ |
| Month name, day of month, year                    | LL            | گوڵان ۲۰ ۲۷۱۸|
|                                                   | ll            | گوڵان ۲۰ ۲۷۱۸|
| Month name, day of month, year, time              | LLL           | گوڵان ۲۷۱۸ ۲۰ ۴:۲۳ د.ن|
|                                                   | lll           | گوڵان ۲۷۱۸ ۲۰ ۴:۲۳ د.ن|
| Month name, day of month, day of week, year, time | LLLL          | پێنجشه‌ممه‌ ۲۰ گوڵان ۲۷۱۸ ۴:۲۵ د.ن |
|                                                   | llll          | پ ۲۰ گوڵان ۲۷۱۸ ۴:۲۷ د.ن |


### Default format

ISO8601 format ```YYYY-MM-DDTHH:mm:ssZ```` =>  "٢٧١٨-٠١-١٧T٠٠:٠٠:٠٠+٠٣:٣٠"


### Unix Offset (milliseconds)

```javascript
new KurdishDate().valueOf();
```

```KurdishDate#valueOf``` simply outputs the number of milliseconds since the Unix Epoch, just like ```Date#valueOf``` .

```javascript
new KurdishDate(1318781876406).valueOf(); // 1318781876406
new KurdishDate(1318781876406).format(); // "٢٧١١-٠٧-٢٤T١٩:٤٧:٥٦+٠٣:٣٠"
```

To get a Unix timestamp (the number of seconds since the epoch) from a ```KurdishDate``` , use ```KurdishDate#unix``` .

### Unix Timestamp (seconds)

```javascript
new KurdishDate().unix();
```

```KurdishDate#unix``` outputs a Unix timestamp (the of seconds since the Unix Epoch).

```javascript
new KurdishDate(1318874398806).unix(); // 1318874398
```

This value is floored to the nearest second, and does not include a milliseconds component.

### Timezone Offset

```javascript
new KurdishDate().zone();
```

Get the timezone offset in minutes.

```javascript
new KurdishDate().zone(); // (60, 120, 240, -270, etc.)
```

### Days in Month

```javascript
new KurdishDate().daysInMonth();
```

Get the number of days in the current month.

```javascript
new KurdishDate([2718,1]).daysInMonth(); // 31
new KurdishDate([2718,8]).daysInMonth(); // 30
new KurdishDate([2718,12]).daysInMonth(); // 29
new KurdishDate([271,12]).daysInMonth(); // 30
```

### As Javascript Date

```javascript
new KurdishDate().toDate();
```

To get the native ```Date``` object that ```KurdishDate.js``` wraps, use ```KurdishDate#toDate``` .

This will return the ```Date``` that the ```KurdishDate``` uses.

### As Array

```javascript
new KurdishDate().toArray();
```

This returns an array that mirrors the parameters from new ```KurdishDate()``` .

```javascript
new KurdishDate().toArray(); // [2718, 1, 4, 14, 40, 16, 154];
```

### Range Name

Helper method that return date range name like week days name, month names, month days names (specially in Kurdish calendar).

```javascript

let dateObj = new KurdishDate();

dateObj.getRangeName().weekdays;
// ["شه‌ممه", "یه‌کشه‌ممه", "دووشه‌ممه", "سێشه‌ممه", "چوارشه‌ممه", "پێنجشه‌ممه‌", "هه‌ینی"]

dateObj.getRangeName().weekdaysMin;
// ["ش", "ی", "د", "س", "چ", "پ", "ه"]

dateObj.getRangeName().months;
// ["خاکه‌لێوه", "گوڵان", "جۆزه‌ردان", "پووشپه‌ڕ", "گه‌لاوێژ", "خه‌رمانان", "ڕه‌زبه‌ر", "گه‌ڵارێزان", "سه‌رماوه‌ز", "به‌فرانبار", "ڕێبه‌ندان", "ڕەشەمێ"]

dateObj.getRangeName().monthsShort; 
// ["خاک", "گوڵان", "جۆزه‌رد", "پووشپه‌ڕ", "گه‌لاوێژ", "خه‌رمان", "ڕه‌زبه‌ر", "گه‌ڵارێز", "سه‌رما", "به‌فران", "ڕێبه‌ند", "ڕەشەمێ"]

```

Also You can get other calendars like gregorian or persian range names

```javascript
let dateObj = new KurdishDate();

dateObj.toCalendar(CalendarType.Gregorian).getRangeName().months;
// ["یەنایر", "فەبرایر", "مارس", "ئەپریل", "مایۆ", "یونیۆ", "یولیۆ", "ئۆغستەس", "سێپتەمبەر", "ئۆکتۆبەر", "نۆڤەمبەر", "دیسەمبەر"]

dateObj.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en).getRangeName().months;
// ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateObj.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en).getRangeName().weekdays;
// ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

dateObj.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en).getRangeName().weekdaysShort;
// ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

dateObj.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en).getRangeName().weekdaysMin;
// ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

```

## Query

### Is Leap Year

```javascript
new KurdishDate().isLeapYear();
```

```KurdishDate#isLeapYear``` returns true if that year is a leap year, and ```false``` if it is not. base on object calendarType.

```javascript
new KurdishDate([2712]).isLeapYear(); // true
new KurdishDate([2713]).isLeapYear(); // false
new KurdishDate([2714]).isLeapYear(); // false
new KurdishDate([2715]).isLeapYear(); // false
new KurdishDate([2716]).isLeapYear(); // true
new KurdishDate([2717]).isLeapYear(); // false
```

## license

This content is released under the MIT License.
See the [LICENSE](LICENSE) file.
