import React from "react";
import Icon from "../icon";

type Props = {
  className?: string;
};
export default function Loader({
  className = "text-primary h-10 w-10",
}: Props) {
  return <Icon icon="codex:loader" className={className} />;
}
