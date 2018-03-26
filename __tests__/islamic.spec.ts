import { CalendarType, LocaleType } from "../src/declarations";
import KurdishDate from "../src/kurdishDate";

describe("islamicDate Convert function", () => {
  jest.useFakeTimers();

  let islamicDate: KurdishDate;

  // Act before assertions
  beforeAll(async () => {
    islamicDate = new KurdishDate(new Date(2018, 3, 10)).toCalendar(CalendarType.Islamic).toLocale(LocaleType.fa);
    jest.runOnlyPendingTimers();
  });

  // Assert islamicDate result
  it("islamicDate year", () => {
    expect(islamicDate.year()).toBe(1439);
  });

  it("islamicDate month", () => {
    expect(islamicDate.month()).toBe(7);
  });

  it("islamicDate date", () => {
    expect(islamicDate.date()).toBe(24);
  });

  it("islamicDate day", () => {
    expect(islamicDate.day()).toBe(4);
  });

  it("islamicDate format", () => {
    expect(islamicDate.format()).toBe("۱۴۳۹-۰۷-۲۴ ۰۰:۰۰:۰۰ ق.ظ");
  });

  it("islamicDate format(X)", () => {
    expect(islamicDate.format("X")).toBe("1523302200");
  });

  it("islamicDate format(LT)", () => {
    expect(islamicDate.format("LT")).toBe("۰:۰۰ ق.ظ");
  });

  it("islamicDate format(L)", () => {
    expect(islamicDate.format("L")).toBe("۱۴۳۹/۰۷/۲۴");
  });

  it("islamicDate format(l)", () => {
    expect(islamicDate.format("l")).toBe("۱۴۳۹/۷/۲۴");
  });

  it("islamicDate format(LL)", () => {
    expect(islamicDate.format("LL")).toBe("رجب ۲۴ ۱۴۳۹");
  });

  it("islamicDate format(ll)", () => {
    expect(islamicDate.format("ll")).toBe("رجب ۲۴ ۱۴۳۹");
  });

  it("islamicDate format(LLL)", () => {
    expect(islamicDate.format("LLL")).toBe("رجب ۱۴۳۹ ۲۴  ۰:۰۰  ق.ظ");
  });

  it("islamicDate format(lll)", () => {
    expect(islamicDate.format("lll")).toBe("رجب ۱۴۳۹ ۲۴  ۰:۰۰  ق.ظ");
  });

  it("islamicDate format(LLLL)", () => {
    expect(islamicDate.format("LLLL")).toBe("سه‌شنبه ۲۴ رجب ۱۴۳۹  ۰:۰۰  ق.ظ");
  });

  it("islamicDate format(llll)", () => {
    expect(islamicDate.format("llll")).toBe("سه ۲۴ رجب ۱۴۳۹  ۰:۰۰  ق.ظ");
  });

  it("islamicDate timezone", () => {
    expect(islamicDate.timezone()).toBe(-270);
  });

  it("islamicDate format(YYYY/MM/DD HH:mm:ss Z)", () => {
    expect(islamicDate.format("YYYY/MM/DD HH:mm:ss Z")).toBe("۱۴۳۹/۰۷/۲۴ ۰۰:۰۰:۰۰ +۰۴:۳۰");
  });

  it("islamicDate toUtc().format()", () => {
    expect(islamicDate.toUtc().format()).toBe("۱۴۳۹-۰۷-۲۳ ۱۹:۳۰:۰۰ ب.ظ");
  });

  it("islamicDate firstWeekDayOfMonth()", () => {
    expect(islamicDate.firstWeekDayOfMonth(islamicDate.year(), islamicDate.month()))
      .toBe(2);
  });

  it("islamicDate toLocale(LocaleType.en).format()", () => {
    expect(islamicDate.toLocale(LocaleType.en).format())
      .toBe("1439-07-23 19:30:00 pm");
  });

  it("islamicDate toCalendar(CalendarType.Gregorian).format()", () => {
    expect(islamicDate.toCalendar(CalendarType.Gregorian).format())
      .toBe("2018-04-09 19:30:00 pm");
  });
});
