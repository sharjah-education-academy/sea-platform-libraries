"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Utils } from "sea-platform-helpers";
import Skeleton from "../skeleton";

const moment = Utils.Moment.default;

const WeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type Props<T> = {
  month: string | Date;
  events: Record<string, T[]>;
  EventItem: (props: { event: T }) => JSX.Element;
  loading?: boolean;
  options?: {
    eventsInDay?: number;
  };
  onVisibleDaysChange?: (days: string[]) => void;
};

export default function MonthCalendar<T>({
  month,
  events,
  EventItem,
  loading,
  options = {
    eventsInDay: 2,
  },
  onVisibleDaysChange,
}: Props<T>) {
  const [expandStatus, setExpandStatus] = useState<Record<string, boolean>>({});

  const currentMonth = useMemo(() => moment(month), [month]);

  const startDay = useMemo(
    () => currentMonth.clone().startOf("month").startOf("week"),
    [currentMonth]
  );

  const endDay = useMemo(
    () => currentMonth.clone().endOf("month").endOf("week"),
    [currentMonth]
  );

  const visibleDays = useMemo(() => {
    const day = startDay.clone().subtract(1, "day");
    const days: string[] = [];

    while (day.isBefore(endDay, "day")) {
      Array(7)
        .fill(0)
        .forEach(() => days.push(day.add(1, "day").format("YYYY-MM-DD")));
    }

    return days;
  }, [startDay, endDay]);

  useEffect(() => {
    if (onVisibleDaysChange) {
      onVisibleDaysChange(visibleDays);
    }
  }, [visibleDays, onVisibleDaysChange]);

  const calendar = useMemo(() => {
    const weeks: moment.Moment[][] = [];
    for (let i = 0; i < visibleDays.length; i += 7) {
      weeks.push(visibleDays.slice(i, i + 7).map((d) => moment(d)));
    }
    return weeks;
  }, [visibleDays]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 text-center text-text text-lg font-semibold p-1">
        {WeekDays.map((day) => (
          <p key={day}>{day}</p>
        ))}
      </div>
      <div
        key={currentMonth.format("YYYY-MM")}
        className="grid grid-cols-7 animate-fade-in"
      >
        {calendar.flat().map((dayItem, i) => {
          const day = dayItem.format("YYYY-MM-DD");
          const dayEvents = events[day] || [];
          const dayEventsSlice = dayEvents.slice(0, options.eventsInDay);
          const moreCounts = dayEvents.length - options.eventsInDay;
          const expanded = expandStatus[day] === true;

          return (
            <div
              key={i}
              className="flex flex-col gap-3 border-[1px] border-gray-200 p-1"
            >
              <p className="text-left text-primary font-semibold">
                {dayItem.date()}
              </p>
              <div className="flex flex-col gap-1">
                {loading ? (
                  <>
                    {Array(Utils.Number.getRandomInt(0, 2))
                      .fill({})
                      .map((_, j) => (
                        <Skeleton
                          key={`${day}-(${j})`}
                          className="w-full h-20"
                        />
                      ))}
                  </>
                ) : (
                  <>
                    {" "}
                    {(expanded ? dayEvents : dayEventsSlice).map((e, j) => (
                      <EventItem key={`${i}-${j}`} event={e} />
                    ))}
                    {moreCounts > 0 && !expanded && (
                      <button
                        onClick={() =>
                          setExpandStatus((prev) => ({ ...prev, [day]: true }))
                        }
                        className="text-left text-sm text-primary hover:text-opacity-70"
                      >
                        +{moreCounts} more
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
