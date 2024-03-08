import { Box, IconButton, MenuItem, Select } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import "./rich-text-editor.css";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
} from "@mui/icons-material";
import Link from "@tiptap/extension-link";

type Props = {
  content: string;
  setContent: (content: string) => void;
};

const RichTextEditor: FC<Props> = ({ content, setContent }) => {
  const extensions = [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Heading.configure({
      levels: [1, 2],
    }),
    Link.configure({
      openOnClick: false,
      autolink: false,
    }),
  ];

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  return (
    <Box>
      <Box display="flex" my={1}>
        <Select
          value={
            editor?.isActive("heading", { level: 1 })
              ? "Heading 1"
              : editor?.isActive("heading", { level: 2 })
              ? "Heading 2"
              : "Normal"
          }
          size="small"
          sx={{ width: "150px" }}
        >
          <MenuItem
            value="Heading 1"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={
              !editor?.can().chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            Heading 1
          </MenuItem>
          <MenuItem
            value="Heading 2"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={
              !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            Heading 2
          </MenuItem>
          <MenuItem
            value="Normal"
            onClick={() => editor?.chain().focus().setParagraph().run()}
            disabled={!editor?.can().chain().focus().setParagraph().run()}
          >
            Normal
          </MenuItem>
        </Select>
        <IconButton
          color={editor?.isActive("bold") ? "secondary" : "default"}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <FormatBold />
        </IconButton>
        <IconButton
          color={editor?.isActive("italic") ? "secondary" : "default"}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <FormatItalic />
        </IconButton>
        <IconButton
          color={editor?.isActive("strike") ? "secondary" : "default"}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <FormatStrikethrough />
        </IconButton>
        <IconButton
          color={
            editor?.isActive({ textAlign: "left" }) ? "secondary" : "default"
          }
          disabled={!editor?.can().chain().focus().setTextAlign("left").run()}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <FormatAlignLeft />
        </IconButton>
        <IconButton
          color={
            editor?.isActive({ textAlign: "center" }) ? "secondary" : "default"
          }
          disabled={!editor?.can().chain().focus().setTextAlign("center").run()}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <FormatAlignCenter />
        </IconButton>
        <IconButton
          color={
            editor?.isActive({ textAlign: "right" }) ? "secondary" : "default"
          }
          disabled={!editor?.can().chain().focus().setTextAlign("right").run()}
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <FormatAlignRight />
        </IconButton>
        <IconButton
          color={editor?.isActive("bulletList") ? "secondary" : "default"}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulleted />
        </IconButton>
        <IconButton
          color={editor?.isActive("orderedList") ? "secondary" : "default"}
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <FormatListNumbered />
        </IconButton>
      </Box>
      <EditorContent
        editor={editor}
        style={{
          border: "1px solid rgb(100, 100, 100, 0.2)",
          borderRadius: "4px",
          minHeight: "350px",
        }}
      />
    </Box>
  );
};

export default RichTextEditor;
