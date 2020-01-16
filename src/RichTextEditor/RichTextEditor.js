import React, { useRef, useState } from 'react';
import './RichTextEditor.css';
import ControlPanel from '../control-panel/ControlPanel';
import {
	indent,
	removeIndentation,
	getElementParentTag,
	checkForStyles,
} from '../utils';
import { useDesignMode } from '../hooks';

const RichTextEditor = ({ initialHtml, onChange, onSelectionChange }) => {
	const editorRef = useRef(null);
	useDesignMode(editorRef);
	const [activeFormats, setActiveFormats] = useState({
		bold: false,
		italic: false,
		underline: false,
		foreColor: false,
	});

	const selectionHandler = () => {
		const selection = window.getSelection();
		let newSelection = selection.type === 'Range' ? selection : null;
		updateActiveFormats(newSelection);
		onSelectionChange(newSelection);
	};

	const getForeColor = selection => {
		const element =
			selection &&
			getElementParentTag(selection.baseNode, 'FONT', editorRef.current);
		return element ? element.color : '#000000';
	};

	const updateActiveFormats = (selection = window.getSelection()) => {
		const styleChecker = checkForStyles(selection, editorRef.current);
		setActiveFormats({
			bold: styleChecker('B'),
			italic: styleChecker('I'),
			underline: styleChecker('U'),
			foreColor: getForeColor(selection),
		});
	};

	const handleContentChange = () => {
		onChange(editorRef.current.innerHTML);
	};

	const handleKeyDown = e => {
		// keyCode 9 = Tab
		if (e.keyCode !== 9) return;
		e.preventDefault();

		try {
			if (!e.shiftKey) indent();
			else removeIndentation();
		} catch (e) {
			// TODO: Add logic for handling indentation errors
			console.error(e);
		}
	};

	return (
		<React.Fragment>
			<ControlPanel
				activeFormats={activeFormats}
				editorRef={editorRef.current}
				onFormatChange={updateActiveFormats}
			/>
			<div className="text-editor-container">
				<div
					onSelectCapture={selectionHandler}
					ref={editorRef}
					onKeyDown={handleKeyDown}
					onInput={handleContentChange}
					onBlur={handleContentChange}
					dangerouslySetInnerHTML={{ __html: initialHtml }}
					className="text-content"
					contentEditable
				></div>
			</div>
		</React.Fragment>
	);
};

export default RichTextEditor;
