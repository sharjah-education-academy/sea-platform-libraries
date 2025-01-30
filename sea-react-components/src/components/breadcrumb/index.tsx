import { Icon } from "@iconify/react";
import clsx from "clsx";
import React from "react";

export type Props = {
  name: string;
  children: React.ReactNode;
};
export default function Breadcrumb({ name, children }: Props) {
  const items = React.Children.toArray(children); // Convert children to an array
  return (
    <div className="sea-flex sea-items-center sea-gap-3">
      {items.map((item, i) => (
        <div
          key={`${name}-breadcrumb-${i}`}
          className={clsx(
            "sea-flex sea-items-center sea-gap-3",
            i === items.length - 1 && "sea-text-secondary"
          )}
        >
          <div>{item}</div>
          {i < items.length - 1 && (
            <Icon icon="ooui:next-ltr" className="sea-text-text" />
          )}
        </div>
      ))}
    </div>
  );
}
