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

  it("kurdishDate dates", () => {
    expect(kurdishDate.date()).toBe(21);
  });

  it("kurdishDate day", () => {
    expect(kurdishDate.day()).toBe(4);
  });

  it("kurdishDate format", () => {
    expect(kurdishDate.format()).toBe("٢٧١٨-٠١-٢١ ٠٠:٠٠:٠٠ ب.ن");
  });

  it("kurdishDate format(dd)", () => {
    expect(kurdishDate.format("dd")).toBe("س");
  });

  it("kurdishDate format(ddd)", () => {
    expect(kurdishDate.format("ddd")).toBe("سێ");
  });

  it("kurdishDate format(dddd)", () => {
    expect(kurdishDate.format("dddd")).toBe("سێشه‌ممه");
  });

  it("kurdishDate format(w)", () => {
    expect(kurdishDate.format("w")).toBe("٣");
  });

  it("kurdishDate format(ww)", () => {
    expect(kurdishDate.format("ww")).toBe("٠٣");
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

  it("kurdishDate format(dddd, MMMM DD YYYY, h:mm:ss a)", () => {
    expect(kurdishDate.format("dddd, MMMM DD YYYY, h:mm:ss a")).toBe("سێشه‌ممه, خاکه‌لێوه ٢١ ٢٧١٨, ٠:٠٠:٠٠ ب.ن");
  });

  it("kurdishDate toUtc().format()", () => {
    expect(kurdishDate.toUtc().format()).toBe("٢٧١٨-٠١-٢٠ ١٩:٣٠:٠٠ د.ن");
  });

  it("kurdishDate firstWeekDayOfMonth()", () => {
    expect(kurdishDate.firstWeekDayOfMonth(kurdishDate.year(), kurdishDate.month()))
      .toBe(5);
  });

  it("kurdishDate toLocale(LocaleType.en).format()", () => {
    expect(kurdishDate.toLocale(LocaleType.en).format())
      .toBe("2718-01-20 19:30:00 pm");
  });

  it("kurdishDate format(dddd, ha)", () => {
    expect(kurdishDate.toLocale(LocaleType.ku).format("dddd, ha")).toBe("دووشه‌ممه, ٧د.ن");
  });

  it("kurdishDate toCalendar(CalendarType.Gregorian).format()", () => {
    expect(kurdishDate.toCalendar(CalendarType.Gregorian).toLocale(LocaleType.en).format())
      .toBe("2018-04-09 19:30:00 pm");
  });

  it("kurdishDate hour", () => {
    kurdishDate.hour(9);
    expect(kurdishDate.hour() === 9).toBe(true);
  });

  it("kurdishDate minute", () => {
    kurdishDate.minute(42);
    expect(kurdishDate.minute() === 42).toBe(true);
  });

  it("kurdishDate second", () => {
    kurdishDate.second(40);
    expect(kurdishDate.second() === 40).toBe(true);
  });
});
