import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { MenuBar } from './MenuBar';

interface EditorProps {
	content: string | null;
	onUpdate?: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onUpdate }) => {
	const editor = useEditor({
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onUpdate && onUpdate(html);
		},
	});

	return (
		<div className="ProseMirror mx-auto min-h-[32rem] w-[56rem] rounded border border-slate-800">
			<MenuBar editor={editor} />
			<EditorContent className="px-4 pb-4" editor={editor} />
		</div>
	);
};

export default Editor;
