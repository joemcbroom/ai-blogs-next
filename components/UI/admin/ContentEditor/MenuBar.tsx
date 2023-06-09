import React from 'react';
import { MenuButton } from './MenuButton';

export const MenuBar = ({ editor }: { editor: any }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="flex w-full flex-wrap gap-2 border-b border-slate-800 p-4">
			<MenuButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				classNames={editor.isActive('bold') ? 'is-active' : ''}
			>
				bold
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				classNames={editor.isActive('italic') ? 'is-active' : ''}
			>
				italic
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				classNames={editor.isActive('strike') ? 'is-active' : ''}
			>
				strike
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				classNames={editor.isActive('code') ? 'is-active' : ''}
			>
				code
			</MenuButton>
			<MenuButton onClick={() => editor.chain().focus().unsetAllMarks().run()}>
				clear marks
			</MenuButton>
			<MenuButton onClick={() => editor.chain().focus().clearNodes().run()}>
				clear nodes
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().setParagraph().run()}
				classNames={editor.isActive('paragraph') ? 'is-active' : ''}
			>
				paragraph
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				classNames={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				h1
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				classNames={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				h2
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				classNames={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
			>
				h3
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				classNames={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
			>
				h4
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				classNames={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
			>
				h5
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				classNames={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
			>
				h6
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				classNames={editor.isActive('bulletList') ? 'is-active' : ''}
			>
				bullet list
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				classNames={editor.isActive('orderedList') ? 'is-active' : ''}
			>
				ordered list
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				classNames={editor.isActive('codeBlock') ? 'is-active' : ''}
			>
				code block
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				classNames={editor.isActive('blockquote') ? 'is-active' : ''}
			>
				blockquote
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
			>
				horizontal rule
			</MenuButton>
			<MenuButton onClick={() => editor.chain().focus().setHardBreak().run()}>
				hard break
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				undo
			</MenuButton>
			<MenuButton
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				redo
			</MenuButton>
		</div>
	);
};
