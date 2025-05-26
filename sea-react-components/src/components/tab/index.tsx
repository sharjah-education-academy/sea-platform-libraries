"use client";
import clsx from "clsx";
import { useEffect, useLayoutEffect } from "react";

export type TabItem = {
  label: string;
  key: string;
  isDisabled?: boolean;
};
export type Props = {
  name: string;
  tabs: TabItem[];
  tabKey: string;
  setTabKey: (newTabKey: string) => void;
  direction?: "horizontal" | "vertical";
  updateParams?: (updates: Record<string, string>) => void;
  getParam?: (name: string) => string | null | undefined;
};
export default function Tab({
  name,
  tabs,
  tabKey,
  setTabKey,
  updateParams,
  getParam,
  direction = "horizontal",
}: Props) {
  let className = "flex-row";
  if (direction === "vertical") className = "flex-col";

  useEffect(() => {
    if (tabKey && updateParams) updateParams({ [name]: tabKey });
  }, [tabKey]);

  useLayoutEffect(() => {
    let value = tabKey;
    if (getParam) {
      value = getParam(name);
    }

    if (!value && tabs.length) value = tabs[0].key;

    setTabKey(value);
  }, []);

  return (
    <div className={clsx("flex items-center justify-around gap-1", className)}>
      {tabs.map((t, i) => (
        <button
          key={`tab-${name}-${t.key}-${i}`}
          className={clsx(
            "pb-1",
            tabKey === t.key && "border-b-2 border-primary text-primary"
          )}
          onClick={() => setTabKey(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
