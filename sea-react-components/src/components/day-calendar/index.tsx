import React, { useMemo } from "react";
import { Utils } from "sea-platform-helpers";
import Skeleton from "../skeleton";
import clsx from "clsx";
const moment = Utils.Moment.default;
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

type PositionedEvent<T> = {
  event: T;
  top: number;
  height: number;
  leftPercent: number;
  widthPercent: number;
  zIndex: number;
};

export type Props<
  T extends { start: string; end: string; isAllDay?: boolean }
> = {
  day?: string | Date;
  events: T[];
  EventItem: (props: { event: T }) => JSX.Element;
  loading?: boolean;
  setDay?: (day: Date) => void;
};
export default function DayCalendar<
  T extends { start: string; end: string; isAllDay?: boolean }
>({ day = new Date(), events, EventItem, loading, setDay }: Props<T>) {
  const today = moment().format("YYYY-MM-DD");
  const selectedDay = moment(day).format("YYYY-MM-DD");
  const dayMoment = useMemo(() => moment(day).startOf("day"), [day]);

  const allDayEvents = useMemo(
    () => events.filter((e) => e.isAllDay),
    [events]
  );

  const timedEvents = useMemo(
    () => events.filter((e) => !e.isAllDay),
    [events]
  );

  const getPositionedEvents = (dayEvents: T[]): PositionedEvent<T>[] => {
    const positioned: PositionedEvent<T>[] = [];
    const sorted = [...dayEvents].sort((a, b) =>
      moment(a.start).diff(moment(b.start))
    );
    const columns: T[][] = [];

    sorted.forEach((event) => {
      const start = moment(event.start);
      let placed = false;

      for (const col of columns) {
        if (!col.some((e) => moment(e.end).isAfter(start))) {
          col.push(event);
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([event]);
      }
    });

    columns.forEach((col, colIndex) => {
      col.forEach((event) => {
        const start = moment(event.start);
        const end = moment(event.end);
        const duration = end.diff(start, "minutes");
        const startMinutes = start.hours() * 60 + start.minutes();

        positioned.push({
          event,
          top: (startMinutes / 60) * 64,
          height: (duration / 60) * 64,
          leftPercent: (colIndex / columns.length) * 100,
          widthPercent: 100 / columns.length,
          zIndex: colIndex,
        });
      });
    });

    return positioned;
  };

  const positionedEvents = getPositionedEvents(timedEvents);

  return (
    <div className="flex overflow-x-auto">
      {/* Time column */}
      <div className="w-14 shrink-0">
        <div className="h-20 border-b border-gray-200" />
        <div className="h-[74px] text-sm text-text border-b border-gray-200 flex items-center justify-center">
          All-Day
        </div>
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="h-16 text-xs text-text text-right pr-1 border-b border-gray-200"
          >
            {moment(`${today} ${hour}`).format("hh:mm a")}
          </div>
        ))}
      </div>

      {/* Day column */}
      <div className="flex-1 border-l border-t border-gray-200 relative">
        {/* Sticky header */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200 sticky top-0 z-10">
          {/* <button
            className={clsx("px-6 py-2 rounded-xl", {
              "bg-black": selectedDay === today,
            })}
            onClick={() => setDay?.(dayMoment.toDate())}
          >
            <div className="flex flex-col gap-1 items-center">
              <p
                className={clsx("font-semibold text-sm uppercase text-text", {
                  "text-white text-opacity-80": selectedDay === today,
                })}
              >
                {dayMoment.format("ddd")}
              </p>
              <p
                className={clsx("text-xl font-bold", {
                  "text-white": selectedDay === today,
                  "text-blue-700": selectedDay !== today,
                })}
              >
                {dayMoment.date()}
              </p>
            </div>
          </button> */}

          <p className="text-2xl font-semibold text-primary">
            {dayMoment.format("dddd, MMM DD, YYYY")}
          </p>
        </div>

        {/* All-day events */}
        <div className="h-[74px] border-b border-gray-200 px-1 py-1">
          {allDayEvents.map((event, idx) => (
            <div key={idx} className="mb-1">
              <EventItem event={event} />
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative h-[1536px] pt-0">
          {HOURS.map((_, j) => (
            <div
              key={j}
              className="absolute left-0 right-0 h-16 border-t border-dashed border-gray-200"
              style={{ top: j * 64 }}
            />
          ))}

          {!loading
            ? positionedEvents.map(
                (
                  { event, top, height, leftPercent, widthPercent, zIndex },
                  j
                ) => (
                  <div
                    key={j}
                    className="absolute px-1"
                    style={{
                      top,
                      height,
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                      zIndex,
                    }}
                  >
                    <EventItem event={event} />
                  </div>
                )
              )
            : Array.from({ length: Utils.Number.getRandomInt(0, 5) }).map(
                (_, j) => (
                  <Skeleton
                    key={j}
                    className="absolute left-1 right-1 top-[100px] h-16"
                    style={{ top: Utils.Number.getRandomInt(60, 1200) }}
                  />
                )
              )}
        </div>
      </div>
    </div>
  );
}
