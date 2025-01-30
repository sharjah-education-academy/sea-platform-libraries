"use client";
import React from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Level } from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import FontFamily from "@tiptap/extension-font-family";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Gapcursor from "@tiptap/extension-gapcursor";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import { isAllowedUri, shouldAutoLink } from "./utils";
import Toolbar from "./components/toolbar";

import "./style.css";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export type Props = {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly: boolean;
  headingLevels?: Level[];
  immediatelyRender?: boolean;
};
export default function TextEditor({
  content,
  onChange,
  readOnly,
  placeholder = "Write Here...",
  headingLevels = [1, 2, 3],
  immediatelyRender = false,
}: Props) {
  const editor = useEditor({
    // element: document.querySelector(".element"),
    extensions: [
      Document,
      Underline,
      Dropcursor,
      Image,
      Text,
      TextStyle,
      FontFamily,
      Typography,
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: false,
      }),
      StarterKit.configure({
        heading: {
          levels: headingLevels,
          HTMLAttributes: {
            // class: "sea-text-6xl sea-text-4xl sea-text-2xl",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "sea-bg-orange-200 sea-text-black sea-font-light sea-p-1 sea-rounded-md",
          },
        },
        // codeBlock: {
        //   HTMLAttributes: {
        //     class:
        //       "sea-bg-orange-200 sea-text-black sea-font-light sea-p-1 sea-rounded-md",
        //   },
        // },
        bold: {
          HTMLAttributes: {
            class: "sea-font-bold",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "sea-p-4 sea-my-4 sea-border-s-4 sea-border-gray-300 sea-bg-gray-50 dark:sea-border-gray-500 dark:sea-bg-gray-300",
          },
        },
        horizontalRule: {},
        // bulletList: {
        //   keepMarks: true,
        //   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        // },
        // orderedList: {
        //   keepMarks: true,
        //   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        // },
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: isAllowedUri,
        shouldAutoLink: shouldAutoLink,
        HTMLAttributes: {
          class: "sea-text-primary sea-underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
        // HTMLAttributes: {
        //   class:
        //     "sea-bg-orange-200 sea-text-black sea-font-light sea-p-1 sea-rounded-md",
        // },
      }),
      Image.configure({
        allowBase64: true,
        // HTMLAttributes: {
        //   class: "sea-border-2 sea-border-black",
        // },
      }),
      Gapcursor,
      Table.configure({
        resizable: true,
        allowTableNodeSelection: true,
      }),
      TableCell.configure({
        HTMLAttributes: {
          class:
            "sea-border sea-border-gray-300 sea-box-border sea-min-w-[1em] sea-px-2 sea-py-1 sea-relative sea-align-top",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "sea-bg-gray-100 sea-border sea-border-gray-300",
        },
      }),
      TableRow.configure({}),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "sea-prose sea-prose-sm sm:sea-prose-base lg:sea-prose-lg xl:sea-prose-2xl sea-m-5 focus:sea-outline-none",
      },
    },
    autofocus: false,
    // make the text editable (default is true)
    editable: true,
    // prevent loading the default CSS (which isn't much anyway)
    injectCSS: false,
    immediatelyRender,
  });

  if (!editor) return null;

  // console.log(editor);

  return (
    <div className="sea-flex sea-flex-col sea-gap-1">
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <Toolbar editor={editor} headingLevels={headingLevels} />

      <EditorContent
        className="element"
        editor={editor}
        placeholder={placeholder}
      />
      {/* <BubbleMenu editor={editor}>
        <div className="sea-bg-black sea-bg-opacity-60 sea-p-2 sea-rounded-md">
          AAA
        </div>
      </BubbleMenu> */}
    </div>
  );
}
