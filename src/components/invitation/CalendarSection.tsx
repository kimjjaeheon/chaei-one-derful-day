import { useEffect, useState } from "react";
import { invitation } from "@/lib/invitation";
import { daysUntil, ddayLabel } from "@/lib/dday";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTitle";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export function CalendarSection() {
  const event = new Date(invitation.eventDate);
  // Event is in Korea time; build the month grid from fixed KST values.
  const year = 2027;
  const month = 0; // January
  const day = 24;
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    setDays(daysUntil(event, new Date()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="px-8 py-16">
      <SectionTitle en="Save the date" ko="날짜" />
      <p className="text-center font-display text-base">{invitation.dateLabel}</p>

      <div className="mx-auto mt-8 max-w-xs border-y border-border py-6">
        <p className="mb-4 text-center font-display text-sm tracking-[0.3em] text-muted-foreground">
          2027 · 1월
        </p>
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
          {WEEK.map((w, i) => (
            <span key={w} className={cn("pb-2 text-xs text-muted-foreground", i === 0 && "text-sunday")}>
              {w}
            </span>
          ))}
          {cells.map((d, i) => (
            <span key={i} className="flex items-center justify-center">
              {d === null ? null : d === day ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  {d}
                </span>
              ) : (
                <span className={cn("flex h-8 w-8 items-center justify-center", i % 7 === 0 && "text-sunday")}>
                  {d}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-8 min-h-6 text-center text-sm text-muted-foreground">
        {days === null ? null : days > 0 ? (
          <>
            {invitation.baby.firstName}의 첫 생일까지{" "}
            <span className="font-display text-base text-primary">{ddayLabel(days)}</span>
          </>
        ) : days === 0 ? (
          <>
            오늘은 <span className="font-display text-base text-primary">{invitation.baby.firstName}의 첫 생일</span>이에요
          </>
        ) : (
          <>함께해 주셔서 감사합니다</>
        )}
      </p>
    </section>
  );
}
