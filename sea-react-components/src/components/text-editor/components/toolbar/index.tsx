"use client";
import React, { useCallback, useRef, useState } from "react";
import { Editor } from "@tiptap/react/dist";
import { Level } from "@tiptap/extension-heading";

import Button from "../../../button";
import Select from "../../../select";
import Icon from "../../../icon";
import Menu from "../../../menu";
import MenuItem from "../../../menu/menu-item";
import Tooltip from "../../../tooltip";
import clsx from "clsx";

import { FontFamilyStyles, SupportedFontFamilies } from "../../utils";
import { convertToBase64 } from "../../../../utils/file";

type Props = {
  editor: Editor;
  headingLevels?: Level[];
};
export default function Toolbar({ editor, headingLevels = [1, 2, 3] }: Props) {
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  const [currentHeadingLevel, setCurrentHeadingLevel] = useState<
    Level | undefined
  >(undefined);
  const [fontFamily, setFontFamily] = useState<FontFamilyStyles>("default");

  const handleSelectHeadingLevel = (level: Level) => {
    setCurrentHeadingLevel(level);

    editor.chain().focus().toggleHeading({ level }).run();
  };

  const handleSelectFamilyFont = (fontStyle: FontFamilyStyles) => {
    setFontFamily(fontStyle);

    if (fontStyle === "default") {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(fontStyle).run();
    }
  };

  const handleClickLink = useCallback(() => {
    const isLink = editor.isActive("link");

    if (isLink) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = window.prompt("URL");
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const MARKER_SECTIONS: {
    name: string;
    items: {
      name: string;
      icon: string;
      type: "button" | "menu" | "image-input";
      disabled?: boolean;
      onClick?: () => void;
      menuContent?: React.ReactNode;
      handleFileChange?: (file: File) => void;
    }[];
  }[] = [
    {
      name: "section-1",
      items: [
        {
          name: "paragraph",
          icon: "mdi:format-paragraph",
          type: "button",
          onClick: () => {
            editor.chain().focus().setParagraph().run();
          },
        },
      ],
    },
    {
      name: "section-2",
      items: [
        {
          name: "bold",
          icon: "ooui:bold-b",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleBold().run();
          },
        },
        {
          name: "italic",
          icon: "tabler:italic",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleItalic().run();
          },
        },
        {
          name: "strike",
          icon: "dashicons:editor-strikethrough",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleStrike().run();
          },
        },
        {
          name: "underline",
          icon: "fluent:text-underline-20-filled",
          type: "button",
          onClick: () => {
            editor.commands.toggleUnderline();
          },
        },
        {
          name: "blockquote",
          icon: "mingcute:blockquote-line",
          type: "button",
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
        },
      ],
    },
    {
      name: "section-3",
      items: [
        {
          name: "code",
          icon: "solar:code-outline",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleCode().run();
          },
        },
        {
          name: "codeBlock",
          icon: "ph:code-block",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleCodeBlock().run();
          },
        },
      ],
    },

    {
      name: "section-4",
      items: [
        {
          name: "bulletList",
          icon: "clarity:bullet-list-line",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleBulletList().run();
          },
        },
        {
          name: "orderedList",
          icon: "grommet-icons:ordered-list",
          type: "button",
          onClick: () => {
            editor.chain().focus().toggleOrderedList().run();
          },
        },
      ],
    },
    {
      name: "section-5",
      items: [
        {
          name: "textLeftAlign",
          icon: "mingcute:align-left-line",
          type: "button",
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
        },
        {
          name: "textCenterAlign",
          icon: "mingcute:align-center-line",
          type: "button",
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
        },
        {
          name: "textRightAlign",
          icon: "mingcute:align-right-line",
          type: "button",
          onClick: () => editor.chain().focus().setTextAlign("right").run(),
        },
      ],
    },
    {
      name: "section-6",
      items: [
        {
          name: "horizontalRule",
          icon: "octicon:horizontal-rule-16",
          type: "button",
          onClick: () => {
            editor.chain().focus().setHorizontalRule().run();
          },
        },
      ],
    },
    {
      name: "section-7",
      items: [
        {
          name: "link",
          icon: "line-md:link",
          type: "button",
          onClick: () => handleClickLink(),
        },
      ],
    },
    {
      name: "section-8",
      items: [
        {
          name: "image",
          icon: "material-symbols:image-outline",
          type: "image-input",
          onClick: () =>
            imageFileInputRef.current && imageFileInputRef.current.click(),
          handleFileChange: (file: File) => {
            convertToBase64(file).then((base64) => {
              editor.commands.setImage({
                src: base64,
              });
            });
          },
        },
      ],
    },
    {
      name: "section-9",
      items: [
        {
          name: "table",
          icon: "majesticons:table-line",
          type: "menu",
          menuContent: (
            <div className="p-1 grid grid-cols-2 gap-1">
              <div className="col-span-2 flex items-center gap-1">
                <MenuItem
                  key="insert-table"
                  className="p-1 "
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                >
                  <Tooltip
                    text="Insert Table"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon icon="majesticons:table-line" className="w-5 h-5" />
                  </Tooltip>
                </MenuItem>
              </div>

              <div className="col-span-2 flex items-center gap-1">
                <MenuItem
                  key="add-column-before"
                  className="p-1 "
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                >
                  <Tooltip
                    text="Add Column Before"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon
                      icon="mdi:table-column-plus-before"
                      className="w-5 h-5"
                    />
                  </Tooltip>
                </MenuItem>
                <MenuItem
                  key="add-column-after"
                  className="p-1 "
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  <Tooltip
                    text="Add Column After"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon
                      icon="mdi:table-column-plus-after"
                      className="w-5 h-5"
                    />
                  </Tooltip>
                </MenuItem>
                <MenuItem
                  key="remove-column"
                  className="p-1 "
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                >
                  <Tooltip
                    text="Remove Column"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon icon="mdi:table-column-remove" className="w-5 h-5" />
                  </Tooltip>
                </MenuItem>
              </div>

              <div className="col-span-2 flex items-center gap-1">
                <MenuItem
                  key="add-row-before"
                  className="p-1"
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                >
                  <Tooltip
                    text="Add Row Before"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon
                      icon="mdi:table-row-plus-before"
                      className="w-5 h-5"
                    />
                  </Tooltip>
                </MenuItem>
                <MenuItem
                  key="add-row-after"
                  className="p-1"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                  <Tooltip
                    text="Add Row After"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon icon="mdi:table-row-plus-after" className="w-5 h-5" />
                  </Tooltip>
                </MenuItem>
                <MenuItem
                  key="remove-row"
                  className="p-1"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                >
                  <Tooltip
                    text="Remove Row"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon icon="mdi:table-row-remove" className="w-5 h-5" />
                  </Tooltip>
                </MenuItem>
              </div>

              <div className="col-span-2 flex items-center gap-1">
                <MenuItem
                  key="merge-cells"
                  className="p-1"
                  onClick={() => editor.chain().focus().mergeCells().run()}
                >
                  <Tooltip
                    text="Merge Cells"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon
                      icon="flowbite:merge-cells-outline"
                      className="w-5 h-5"
                    />
                  </Tooltip>
                </MenuItem>
                <MenuItem
                  key="split-cells"
                  className="p-1"
                  onClick={() => editor.chain().focus().splitCell().run()}
                >
                  <Tooltip
                    text="Split Cells"
                    placement="top"
                    containerClassName="bg-gray-100 w-32"
                    textClassName="text-black text-center text-sm"
                  >
                    <Icon
                      icon="flowbite:split-cells-outline"
                      className="w-5 h-5"
                    />
                  </Tooltip>
                </MenuItem>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      name: "section-10",
      items: [
        {
          name: "undo",
          icon: "material-symbols:undo",
          type: "button",
          disabled: !editor.can().undo(),
          onClick: () => {
            editor.chain().focus().undo().run();
          },
        },
        {
          name: "redo",
          icon: "material-symbols:redo",
          type: "button",
          disabled: !editor.can().redo(),
          onClick: () => {
            editor.chain().focus().redo().run();
          },
        },
      ],
    },
  ];

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <Select<Level>
        name="heading"
        multiselect={false}
        values={currentHeadingLevel ? [currentHeadingLevel] : []}
        setValues={(newValues) => {
          handleSelectHeadingLevel(newValues[0]);
        }}
        options={headingLevels.map((o) => ({
          label: `H${o}`,
          value: o,
        }))}
        placeholder="Heading"
      />
      <Select<FontFamilyStyles>
        name="font"
        multiselect={false}
        values={[fontFamily]}
        setValues={(newValues) => {
          handleSelectFamilyFont(newValues[0]);
        }}
        options={SupportedFontFamilies.map((o) => ({
          label: o.label,
          value: o.style,
        }))}
        placeholder="Heading"
      />

      {MARKER_SECTIONS.map((s, si) => (
        <div key={`${s.name}-${si}`} className="flex items-center gap-1">
          {s.items.map((item, ii) => {
            if (item.type === "button")
              return (
                <Button
                  type="button"
                  key={`${item.name}-${ii}`}
                  onClick={() => item.onClick()}
                  disabled={item.disabled}
                  className={clsx(
                    editor.isActive(item.name)
                      ? "bg-primary bg-opacity-30"
                      : "bg-transparent hover:bg-primary hover:bg-opacity-30"
                  )}
                >
                  <Icon
                    icon={item.icon}
                    className="
                text-black h-5 w-5"
                  />
                </Button>
              );
            else if (item.type === "menu") {
              return (
                <Menu
                  key={`${item.name}-${ii}`}
                  menuButton={
                    <Icon
                      icon={item.icon}
                      className="
            text-black h-5 w-5"
                    />
                  }
                  className="w-28"
                >
                  {item.menuContent}
                </Menu>
              );
            } else if (item.type === "image-input") {
              return (
                <div key={`${item.name}-${ii}`}>
                  <Button
                    onClick={() => item.onClick()}
                    disabled={item.disabled}
                    className={clsx(
                      editor.isActive(item.name)
                        ? "bg-primary bg-opacity-30"
                        : "bg-transparent hover:bg-primary hover:bg-opacity-30"
                    )}
                  >
                    <Icon
                      icon={item.icon}
                      className="
                text-black h-5 w-5"
                    />
                  </Button>

                  <input
                    ref={imageFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const files = event.target.files;
                      const file = files[0];
                      if (file && item.handleFileChange)
                        item.handleFileChange(file);
                    }}
                  />
                </div>
              );
            } else {
              return <div key={`${item.name}-${ii}`}></div>;
            }
          })}

          {si < MARKER_SECTIONS.length - 1 && (
            <div className="h-8 w-[2px] bg-gray-300 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
}
