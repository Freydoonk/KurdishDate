import { CalendarType, LocaleType } from "../src/declarations";
import KurdishDate from "../src/kurdishDate";

describe("kurdishDate Convert function", () => {
  jest.useFakeTimers();

  let kurdishDate: KurdishDate;

  // Act before assertions
  beforeAll(async () => {
    kurdishDate = new KurdishDate(new Date(2018, 3, 10));
    jest.runOnlyPendingTimers();
  });

  // Assert kurdishDate result
  it("kurdishDate year", () => {
    expect(kurdishDate.year()).toBe(2718);
  });

  it("kurdishDate month", () => {
    expect(kurdishDate.month()).toBe(1);
  });

  it("kurdishDate date", () => {
    expect(kurdishDate.date()).toBe(21);
  });

  it("kurdishDate day", () => {
    expect(kurdishDate.day()).toBe(4);
  });

  it("kurdishDate format", () => {
    expect(kurdishDate.format()).toBe("٢٧١٨-٠١-٢١ ٠٠:٠٠:٠٠ ب.ن");
  });

  it("kurdishDate format(X)", () => {
    expect(kurdishDate.format("X")).toBe("1523302200");
  });

  it("kurdishDate format(LT)", () => {
    expect(kurdishDate.format("LT")).toBe("٠:٠٠ ب.ن");
  });

  it("kurdishDate format(L)", () => {
    expect(kurdishDate.format("L")).toBe("٢٧١٨/٠١/٢١");
  });

  it("kurdishDate format(l)", () => {
    expect(kurdishDate.format("l")).toBe("٢٧١٨/١/٢١");
  });

  it("kurdishDate format(LL)", () => {
    expect(kurdishDate.format("LL")).toBe("خاکه‌لێوه ٢١ ٢٧١٨");
  });

  it("kurdishDate format(ll)", () => {
    expect(kurdishDate.format("ll")).toBe("خاک ٢١ ٢٧١٨");
  });

  it("kurdishDate format(LLL)", () => {
    expect(kurdishDate.format("LLL")).toBe("خاکه‌لێوه ٢٧١٨ ٢١  ٠:٠٠  ب.ن");
  });

  it("kurdishDate format(lll)", () => {
    expect(kurdishDate.format("lll")).toBe("خاک ٢٧١٨ ٢١  ٠:٠٠  ب.ن");
  });

  it("kurdishDate format(LLLL)", () => {
    expect(kurdishDate.format("LLLL")).toBe("سێشه‌ممه ٢١ خاکه‌لێوه ٢٧١٨  ٠:٠٠  ب.ن");
  });

  it("kurdishDate format(llll)", () => {
    expect(kurdishDate.format("llll")).toBe("سێ ٢١ خاک ٢٧١٨  ٠:٠٠  ب.ن");
  });

  it("kurdishDate timezone", () => {
    expect(kurdishDate.timezone()).toBe(-270);
  });

  it("kurdishDate format(YYYY/MM/DD HH:mm:ss Z)", () => {
    expect(kurdishDate.format("YYYY/MM/DD HH:mm:ss Z")).toBe("٢٧١٨/٠١/٢١ ٠٠:٠٠:٠٠ +٠٤:٣٠");
  });

  it("kurdishDate toUtc().format()", () => {
    expect(kurdishDate.toUtc().format()).toBe("٢٧١٨-٠١-٢٠ ١٩:٣٠:٠٠ د.ن");
  });

  it("kurdishDate getFirstWeekDayOfMonth()", () => {
    expect(kurdishDate.getFirstWeekDayOfMonth(kurdishDate.year(), kurdishDate.month()))
      .toBe(5);
  });

  it("kurdishDate toLocale(LocaleType.en).format()", () => {
    expect(kurdishDate.toLocale(LocaleType.en).format())
      .toBe("2718-01-20 19:30:00 pm");
  });

  it("kurdishDate toCalendar(CalendarType.Gregorian).format()", () => {
    expect(kurdishDate.toCalendar(CalendarType.Gregorian).format())
      .toBe("2018-04-09 19:30:00 pm");
  });
});
