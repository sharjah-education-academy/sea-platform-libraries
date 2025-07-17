import React from "react";
import Icon from "../icon";

export type Props = {
  name?: string;
};
export default function ItemNouFound({ name }: Props) {
  const message = `${name || "Item"} is not found!`;
  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-error bg-opacity-20 p-5 rounded-md">
      <Icon
        icon="streamline-freehand:server-error-404-not-found"
        className="text-error h-20 w-20"
      />
      <h3 className="text-3xl text-error">{message}</h3>
    </div>
  );
}
