"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Utils } from "sea-platform-helpers";
import Icon from "../icon";

export type Props = {
  value?: string | Date;
  onChange?: (date: Date | Date[] | { start: Date; end: Date }) => void;
  disabledDates?: (string | Date)[];
  allowedDates?: (string | Date)[];
  selectMode?: "single" | "multi" | "range";
};

export default function Calendar({
  value,
  onChange,
  disabledDates = [],
  allowedDates,
  selectMode = "single",
}: Props) {
  const moment = Utils.Moment.default;

  const initialDate = useMemo(
    () => (value ? moment(value) : moment()),
    [value]
  );

  const [currentMonth, setCurrentMonth] = useState(moment(initialDate));
  const [selectedDate, setSelectedDate] = useState(moment(initialDate));
  const [selectedDates, setSelectedDates] = useState<moment.Moment[]>([]);
  const [range, setRange] = useState<{
    start: moment.Moment | null;
    end: moment.Moment | null;
  }>({ start: null, end: null });

  const isDateDisabled = useMemo(() => {
    const disabledSet = new Set(
      disabledDates.map((d) => moment(d).format("YYYY-MM-DD"))
    );
    const allowedSet = allowedDates
      ? new Set(allowedDates.map((d) => moment(d).format("YYYY-MM-DD")))
      : null;

    return (date: moment.Moment) => {
      const formatted = date.format("YYYY-MM-DD");
      if (allowedSet) return !allowedSet.has(formatted);
      return disabledSet.has(formatted);
    };
  }, [allowedDates, disabledDates]);

  const startDay = currentMonth.clone().startOf("month").startOf("week");
  const endDay = currentMonth.clone().endOf("month").endOf("week");

  const day = startDay.clone().subtract(1, "day");
  const calendar: moment.Moment[][] = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  const isToday = (d: moment.Moment) => d.isSame(moment(), "day");
  const isSelected = (d: moment.Moment) =>
    selectMode === "single"
      ? selectedDate.isSame(d, "day")
      : selectMode === "multi"
      ? selectedDates.some((sel) => sel.isSame(d, "day"))
      : false;
  const isCurrentMonth = (d: moment.Moment) => d.isSame(currentMonth, "month");
  const isInRange = (d: moment.Moment) =>
    range.start &&
    range.end &&
    d.isBetween(range.start, range.end, "day", "[]");

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  const handleNextMonth = () =>
    setCurrentMonth((prev) => prev.clone().add(1, "month"));

  const handleDateClick = (day: moment.Moment) => {
    if (isDateDisabled(day)) return;

    if (!isCurrentMonth(day)) {
      setCurrentMonth(day.clone().startOf("month"));
    }

    if (selectMode === "range") {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: day, end: null });
      } else {
        const end = day.isBefore(range.start) ? range.start : day;
        const start = day.isBefore(range.start) ? day : range.start;
        setRange({ start, end });
        onChange?.({ start: start.toDate(), end: end.toDate() });
      }
    } else if (selectMode === "multi") {
      const exists = selectedDates.some((d) => d.isSame(day, "day"));
      const updated = exists
        ? selectedDates.filter((d) => !d.isSame(day, "day"))
        : [...selectedDates, day];
      setSelectedDates(updated);
      onChange?.(updated.map((d) => d.toDate()));
    } else {
      setSelectedDate(day);
      onChange?.(day.toDate());
    }
  };

  useEffect(() => {
    if (!value) return;

    let newDate: moment.Moment;

    if (selectMode === "single" && value instanceof Date) {
      newDate = moment(value);
      setSelectedDate(newDate);
      setCurrentMonth(newDate.clone().startOf("month"));
    }

    if (selectMode === "multi" && Array.isArray(value)) {
      const dates = value.map((d) => moment(d));
      setSelectedDates(dates);
      if (dates.length > 0) {
        setCurrentMonth(dates[0].clone().startOf("month"));
      }
    }

    if (
      selectMode === "range" &&
      typeof value === "object" &&
      "start" in value &&
      "end" in value
    ) {
      const start = moment(value.start);
      const end = moment(value.end);
      setRange({ start, end });
      setCurrentMonth(start.clone().startOf("month"));
    }
  }, [value, selectMode]);

  return (
    <div className="p-4 max-w-sm mx-auto rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="custom-animation">
          <Icon
            icon="weui:arrow-filled"
            className="rotate-180 h-6 w-6 hover:text-primary hover:text-opacity-70 hover:-translate-x-1 custom-animation"
          />
        </button>
        <h2 className="text-lg font-semibold text-primary">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth} className="custom-animation">
          <Icon
            icon="weui:arrow-filled"
            className="h-6 w-6 hover:text-primary hover:text-opacity-70 hover:translate-x-1 custom-animation"
          />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-text text-sm mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div
        key={currentMonth.format("YYYY-MM")}
        className="grid grid-cols-7 gap-1 animate-fade-in"
      >
        {calendar
          .reduce((acc, week) => [...acc, ...week], [])
          .map((dayItem, i) => {
            const disabled = isDateDisabled(dayItem);
            const outOfMonth = !isCurrentMonth(dayItem);

            return (
              <button
                key={i}
                onClick={() => handleDateClick(dayItem)}
                disabled={disabled}
                className={clsx(
                  "w-8 h-8 rounded-lg text-sm flex items-center justify-center custom-animation",
                  {
                    "bg-primary text-white": isSelected(dayItem),
                    "bg-primary/30 text-white": isInRange(dayItem),
                    "bg-primary bg-opacity-10":
                      isToday(dayItem) && !isSelected(dayItem),
                    "text-text": isCurrentMonth(dayItem),
                    "text-text-light": outOfMonth,
                    "hover:bg-primary hover:text-white": !disabled,
                    "opacity-50 cursor-not-allowed": disabled,
                  }
                )}
              >
                {dayItem.date()}
              </button>
            );
          })}
      </div>
    </div>
  );
}
