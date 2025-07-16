"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useId,
} from "react";
import Icon from "../icon";
import clsx from "clsx";

type ContextType = {
  openItem: string | null;
  toggleItem: (id: string) => void;
};

const AccordionContext = createContext<ContextType | undefined>(undefined);

type AccordionProps = {
  children: ReactNode;
  defaultOpenId?: string;
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpenId = null,
}) => {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className="w-full divide-y divide-gray-300">{children}</div>
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion");
  }
  return context;
};

export type AccordionItemProps = {
  title: ReactNode;
  children: ReactNode;
  id?: string;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  id,
}) => {
  const generatedId = useId();
  const itemId = id || generatedId;
  const { openItem, toggleItem } = useAccordion();
  const isOpen = openItem === itemId;

  return (
    <div className="group">
      <div
        onClick={() => toggleItem(itemId)}
        className="w-full flex justify-between items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition text-left"
      >
        <div className="w-full">{title}</div>

        <Icon
          icon="weui:arrow-filled"
          className={clsx("h-5 w-5 cursor-pointer  custom-animation", {
            "-rotate-90": isOpen,
            "rotate-90": !isOpen,
          })}
        />
      </div>
      <div
        className={`px-4 pb-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isOpen && <div className="pt-2 text-gray-700">{children}</div>}
      </div>
    </div>
  );
};
