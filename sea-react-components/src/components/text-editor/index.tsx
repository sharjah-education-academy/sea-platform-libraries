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
            // class: "text-6xl text-4xl text-2xl",
          },
        },
        code: {
          HTMLAttributes: {
            class: "bg-orange-200 text-black font-light p-1 rounded-md",
          },
        },
        // codeBlock: {
        //   HTMLAttributes: {
        //     class:
        //       "bg-orange-200 text-black font-light p-1 rounded-md",
        //   },
        // },
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-300",
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
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
        // HTMLAttributes: {
        //   class:
        //     "bg-orange-200 text-black font-light p-1 rounded-md",
        // },
      }),
      Image.configure({
        allowBase64: true,
        // HTMLAttributes: {
        //   class: "border-2 border-black",
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
            "border border-gray-300 box-border min-w-[1em] px-2 py-1 relative align-top",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-gray-100 border border-gray-300",
        },
      }),
      TableRow.configure({}),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
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
    <div className="flex flex-col gap-1">
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
        <div className="bg-black bg-opacity-60 p-2 rounded-md">
          AAA
        </div>
      </BubbleMenu> */}
    </div>
  );
}
