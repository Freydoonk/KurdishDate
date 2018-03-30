import { CalendarType, LocaleType } from "../src/declarations";
import KurdishDate from "../src/kurdishDate";

describe("persianDate Convert function", () => {
  jest.useFakeTimers();

  let persianDate: KurdishDate;

  // Act before assertions
  beforeAll(async () => {
    persianDate = new KurdishDate(new Date(2018, 3, 10)).toCalendar(CalendarType.Persian).toLocale(LocaleType.fa);
    jest.runOnlyPendingTimers();
  });

  // Assert persianDate result
  it("persianDate year", () => {
    expect(persianDate.year()).toBe(1397);
  });

  it("persianDate month", () => {
    expect(persianDate.month()).toBe(1);
  });

  it("persianDate date", () => {
    expect(persianDate.date()).toBe(21);
  });

  it("persianDate day", () => {
    expect(persianDate.day()).toBe(4);
  });

  it("persianDate format", () => {
    expect(persianDate.format()).toBe("۱۳۹۷-۰۱-۲۱T۰۰:۰۰:۰۰+۰۴:۳۰");
  });

  it("persianDate format(X)", () => {
    expect(persianDate.format("X")).toBe("1523302200");
  });

  it("persianDate format(LT)", () => {
    expect(persianDate.format("LT")).toBe("۰:۰۰ ق.ظ");
  });

  it("persianDate format(L)", () => {
    expect(persianDate.format("L")).toBe("۱۳۹۷/۰۱/۲۱");
  });

  it("persianDate format(l)", () => {
    expect(persianDate.format("l")).toBe("۱۳۹۷/۱/۲۱");
  });

  it("persianDate format(LL)", () => {
    expect(persianDate.format("LL")).toBe("فروردین ۲۱ ۱۳۹۷");
  });

  it("persianDate format(ll)", () => {
    expect(persianDate.format("ll")).toBe("فرو ۲۱ ۱۳۹۷");
  });

  it("persianDate format(LLL)", () => {
    expect(persianDate.format("LLL")).toBe("فروردین ۱۳۹۷ ۲۱  ۰:۰۰  ق.ظ");
  });

  it("persianDate format(lll)", () => {
    expect(persianDate.format("lll")).toBe("فرو ۱۳۹۷ ۲۱  ۰:۰۰  ق.ظ");
  });

  it("persianDate format(LLLL)", () => {
    expect(persianDate.format("LLLL")).toBe("سه‌شنبه ۲۱ فروردین ۱۳۹۷  ۰:۰۰  ق.ظ");
  });

  it("persianDate format(llll)", () => {
    expect(persianDate.format("llll")).toBe("سه ۲۱ فرو ۱۳۹۷  ۰:۰۰  ق.ظ");
  });

  it("persianDate timezone", () => {
    expect(persianDate.timezone()).toBe(-270);
  });

  it("persianDate format(YYYY/MM/DD HH:mm:ss Z)", () => {
    expect(persianDate.format("YYYY/MM/DD HH:mm:ss Z")).toBe("۱۳۹۷/۰۱/۲۱ ۰۰:۰۰:۰۰ +۰۴:۳۰");
  });

  it("persianDate toUtc().format()", () => {
    expect(persianDate.toUtc().format()).toBe("۱۳۹۷-۰۱-۲۰T۱۹:۳۰:۰۰+۰۴:۳۰");
  });

  it("persianDate firstWeekDayOfMonth()", () => {
    expect(persianDate.firstWeekDayOfMonth(persianDate.year(), persianDate.month()))
      .toBe(5);
  });

  it("persianDate toLocale(LocaleType.en).format()", () => {
    expect(persianDate.toLocale(LocaleType.en).format())
      .toBe("1397-01-20T19:30:00+04:30");
  });

  it("persianDate toCalendar(CalendarType.Gregorian).format()", () => {
    expect(persianDate.toCalendar(CalendarType.Gregorian).format())
      .toBe("2018-04-09T19:30:00+04:30");
  });

  it("persianDate toDate().valueOf()", () => {
    expect(persianDate.toDate().valueOf())
      .toBe(1523286000000);
  });

  it("persianDate .clone().valueOf()", () => {
    expect(persianDate.clone().valueOf())
      .toBe(1523286000000);
  });

  it("persianDate .toArray()", () => {
    expect(persianDate.toArray())
      .toEqual([2018, 4, 9, 19, 30, 0, 0]);
  });
});
