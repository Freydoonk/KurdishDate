import { CalendarType, DatePartKey, LocaleType } from "../src/declarations";
import KurdishDate from "../src/kurdishDate";

describe("Global and instance config", () => {
  // Act before assertions
  beforeAll(async () => {
    KurdishDate.toCalendar(CalendarType.Gregorian);
  });

  it("Global CalendarType year", () => {
    expect(new KurdishDate([2018]).year()).toBe(2018);
  });

  it("Global CalendarType month", () => {
    expect(new KurdishDate([2018]).format("MMM")).toBe("یەنایر");
  });

  it("Instance CalendarType year", () => {
    KurdishDate.toCalendar(CalendarType.Kurdish); // Reset Global CalendarType
    expect(new KurdishDate([2718]).toCalendar(CalendarType.Gregorian).year()).toBe(2018);
  });

  it("Global en Locale format()", () => {
    KurdishDate.toLocale(LocaleType.en);
    expect(new KurdishDate([2718, 1, 17]).format()).toBe("2718-01-17 00:00:00 am");
  });

  it("Global en Locale format(dddd)", () => {
    expect(new KurdishDate([2718, 1, 17]).format("dddd")).toBe("Friday");
  });

  it("Global en Locale format(MMMM)", () => {
    expect(new KurdishDate([2018]).format("MMMM")).toBe("Xakelêw");
  });

  it("Global ku Locale format()", () => {
    KurdishDate.toLocale(LocaleType.ku);
    expect(new KurdishDate([2718, 1, 17]).format()).toBe("٢٧١٨-٠١-١٧ ٠٠:٠٠:٠٠ ب.ن");
  });

  it("Global ku Locale format(dddd)", () => {
    expect(new KurdishDate([2718, 1, 17]).format("dddd")).toBe("هه‌ینی");
  });

  it("Global ku Locale format(MMMM)", () => {
    expect(new KurdishDate([2018]).format("MMMM")).toBe("خاکه‌لێوه");
  });

  it("Create instance by Unix offset", () => {
    expect(new KurdishDate(1318781876406).format()).toBe("٢٧١١-٠٧-٢٤ ١٩:٤٧:٥٦ د.ن");
  });

  it("Create instance by Date object", () => {
    expect(new KurdishDate(new Date(2018, 2, 16)).format()).toBe("٢٧١٧-١٢-٢٥ ٠٠:٠٠:٠٠ ب.ن");
  });

  it("Create instance by Array", () => {
    expect(new KurdishDate([2718, 1, 7, 12, 25, 25, 900]).format()).toBe("٢٧١٨-٠١-٠٧ ١٢:٢٥:٢٥ د.ن");
  });

  it("Create instance by Array optional parameters 1", () => {
    expect(new KurdishDate([2718]).format("YYYY/MM/DD")).toBe("٢٧١٨/٠١/٠١");
  });

  it("Create instance by Array optional parameters 2", () => {
    expect(new KurdishDate([2718, 6]).format("YYYY/MM/DD")).toBe("٢٧١٨/٠٦/٠١");
  });

  it("Create instance by Gregorian Array", () => {
    KurdishDate.toCalendar(CalendarType.Gregorian);
    expect(new KurdishDate([2018, 3, 25]).format("YYYY/MM/DD")).toBe("٢٠١٨/٠٣/٢٥");
  });

  it("Clone by Create instance", () => {
    KurdishDate.toCalendar(CalendarType.Kurdish); // Reset Global CalendarType
    const a = new KurdishDate([2718]);
    const b = new KurdishDate(a);
    a.year(2710);
    expect(b.year()).toBe(2718);
  });

  it("Clone by Call clone", () => {
    const a = new KurdishDate([2718]);
    const b = a.clone();
    a.year(2710);
    expect(b.year()).toBe(2718);
  });

  it("Set seconds", () => {
    expect(new KurdishDate().second(30)).toBe(30);
  });

  it("Add Year", () => {
    KurdishDate.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en);
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Year, 2).format())
      .toBe("2020-03-27 12:25:25 pm");
  });

  it("Add Month", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Month, 15).format())
      .toBe("2019-06-27 12:25:25 pm");
  });

  it("Add Day", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Day, 25).format())
      .toBe("2018-04-21 12:25:25 pm");
  });

  it("Add Week", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Week, 4).format())
      .toBe("2018-04-24 12:25:25 pm");
  });

  it("Add Hour", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Hour, 21).format())
      .toBe("2018-03-28 09:25:25 am");
  });

  it("Add Minute", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Minute, 210).format())
      .toBe("2018-03-27 15:55:25 pm");
  });

  it("Add Second", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Second, 50).format())
      .toBe("2018-03-27 12:26:15 pm");
  });

  it("Add Millisecond", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).add(DatePartKey.Millisecond, 150).millisecond())
      .toBe(50);
  });

  it("Subtract Year", () => {
    KurdishDate.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en);
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Year, 2).format())
      .toBe("2016-03-27 12:25:25 pm");
  });

  it("Subtract Month", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Month, 15).format())
      .toBe("2016-12-27 12:25:25 pm");
  });

  it("Subtract Day", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Day, 25).format())
      .toBe("2018-03-02 12:25:25 pm");
  });

  it("Subtract Week", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Week, 4).format())
      .toBe("2018-02-27 12:25:25 pm");
  });

  it("Subtract Hour", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Hour, 21).format())
      .toBe("2018-03-26 15:25:25 pm");
  });

  it("Subtract Minute", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Minute, 210).format())
      .toBe("2018-03-27 08:55:25 am");
  });

  it("Subtract Second", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Second, 50).format())
      .toBe("2018-03-27 12:24:35 pm");
  });

  it("Subtract Millisecond", () => {
    expect(new KurdishDate([2018, 3, 27, 12, 25, 25, 900]).subtract(DatePartKey.Millisecond, 150).millisecond())
      .toBe(750);
  });

  it("EndOf Year", () => {
    KurdishDate.toCalendar(CalendarType.Kurdish).toLocale(LocaleType.ku); // Reset Global CalendarType
    expect(new KurdishDate([2718, 1, 17]).endOf(DatePartKey.Year).format("YYYY/MM/DD")).toBe("٢٧١٨/١٢/٢٩");
  });

  it("EndOf Month", () => {
    expect(new KurdishDate([2718, 1, 17]).endOf(DatePartKey.Month).format("YYYY/MM/DD")).toBe("٢٧١٨/٠١/٣١");
  });

  it("StartOf Year", () => {
    expect(new KurdishDate([2718, 1, 17]).startOf(DatePartKey.Year).format("YYYY/MM/DD")).toBe("٢٧١٨/٠١/٠١");
  });

  it("StartOf Month", () => {
    expect(new KurdishDate([2718, 1, 17]).startOf(DatePartKey.Month).format("YYYY/MM/DD")).toBe("٢٧١٨/٠١/٠١");
  });

  it("weekDaysMin[0]", () => {
    expect(new KurdishDate().getRangeName().weekdaysMin[0]).toBe("ش");
  });

  it("isLeapYear 2716", () => {
    expect(new KurdishDate([2716]).isLeapYear()).toBe(true);
  });

  it("isLeapYear 2712", () => {
    expect(new KurdishDate([2712]).isLeapYear()).toBe(true);
  });
});
