import { CalendarType, LocaleType } from "../src/declarations";
import KurdishDate from "../src/kurdishDate";

describe("gregorianDate Convert function", () => {
  jest.useFakeTimers();

  let gregorianDate: KurdishDate;

  // Act before assertions
  beforeAll(async () => {
    gregorianDate = new KurdishDate(new Date(2018, 3, 10)).toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en);
    jest.runOnlyPendingTimers();
  });

  // Assert gregorianDate result
  it("gregorianDate year", () => {
    expect(gregorianDate.year()).toBe(2018);
  });

  it("gregorianDate month", () => {
    expect(gregorianDate.month()).toBe(4);
  });

  it("gregorianDate date", () => {
    expect(gregorianDate.date()).toBe(10);
  });

  it("gregorianDate day", () => {
    expect(gregorianDate.day()).toBe(3);
  });

  it("gregorianDate format", () => {
    expect(gregorianDate.format()).toBe("2018-04-10T00:00:00+04:30");
  });

  it("gregorianDate format(X)", () => {
    expect(gregorianDate.format("X")).toBe("1523302200");
  });

  it("gregorianDate format(LT)", () => {
    expect(gregorianDate.format("LT")).toBe("0:00 am");
  });

  it("gregorianDate format(L)", () => {
    expect(gregorianDate.format("L")).toBe("2018/04/10");
  });

  it("gregorianDate format(l)", () => {
    expect(gregorianDate.format("l")).toBe("2018/4/10");
  });

  it("gregorianDate format(LL)", () => {
    expect(gregorianDate.format("LL")).toBe("April 10 2018");
  });

  it("gregorianDate format(ll)", () => {
    expect(gregorianDate.format("ll")).toBe("Apr 10 2018");
  });

  it("gregorianDate format(LLL)", () => {
    expect(gregorianDate.format("LLL")).toBe("April 2018 10  0:00  am");
  });

  it("gregorianDate format(lll)", () => {
    expect(gregorianDate.format("lll")).toBe("Apr 2018 10  0:00  am");
  });

  it("gregorianDate format(LLLL)", () => {
    expect(gregorianDate.format("LLLL")).toBe("Tuesday 10 April 2018  0:00  am");
  });

  it("gregorianDate format(llll)", () => {
    expect(gregorianDate.format("llll")).toBe("Tue 10 Apr 2018  0:00  am");
  });

  it("gregorianDate timezone", () => {
    expect(gregorianDate.timezone()).toBe(-270);
  });

  it("gregorianDate format(YYYY/MM/DD HH:mm:ss Z)", () => {
    expect(gregorianDate.format("YYYY/MM/DD HH:mm:ss Z")).toBe("2018/04/10 00:00:00 +04:30");
  });

  it("gregorianDate toUtc().format()", () => {
    expect(gregorianDate.toUtc().format()).toBe("2018-04-09T19:30:00+04:30");
  });

  it("gregorianDate firstWeekDayOfMonth()", () => {
    expect(gregorianDate.firstWeekDayOfMonth(gregorianDate.year(), gregorianDate.month()))
      .toBe(1);
  });

  it("gregorianDate toLocale(LocaleType.fa).format()", () => {
    expect(gregorianDate.toLocale(LocaleType.fa).format())
      .toBe("۲۰۱۸-۰۴-۰۹T۱۹:۳۰:۰۰+۰۴:۳۰");
  });

  it("gregorianDate toCalendar(CalendarType.Gregorian).format()", () => {
    expect(gregorianDate.toCalendar(CalendarType.Kurdish).format())
      .toBe("۲۷۱۸-۰۱-۲۰T۱۹:۳۰:۰۰+۰۴:۳۰");
  });
});
