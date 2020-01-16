import React, { useState } from 'react';
import cx from 'classnames';
import './ControlPanel.css';
import { checkNodeBelongsToEditor } from '../utils';

function ControlPanel({ activeFormats, editorRef, onFormatChange }) {
	const [activeColor, setActiveColor] = useState('#000000');
	const setBold = () => changeFormatEditorFormat('bold', false, null);
	const setItalic = () => changeFormatEditorFormat('italic', false, null);
	const setUnderline = () => changeFormatEditorFormat('underline', false, null);
	const setForeColor = (color = activeColor) =>
		changeFormatEditorFormat('foreColor', false, color);

	const handleColorChange = ({ target: { value: newColor } }) => {
		setActiveColor(newColor);
		setForeColor(newColor);
	};

	/**
	 * @param  {string} commandId
	 * @param  {boolean} showUI
	 * @param  {string} value
	 */
	const changeFormatEditorFormat = (commandId, showUI, value) => {
		const selection = window.getSelection();
		const selectedNodeBelongsToEditor = checkNodeBelongsToEditor(
			selection.baseNode,
			editorRef
		);
		if (!selectedNodeBelongsToEditor) return;
		document.execCommand(commandId, showUI, value);
		onFormatChange();
	};

	return (
		<div id="control-panel">
			<div id="format-actions">
				<button
					className={cx('format-action', { active: activeFormats.bold })}
					type="button"
					onClick={setBold}
				>
					<b>B</b>
				</button>
				<button
					className={cx('format-action', { active: activeFormats.italic })}
					type="button"
					onClick={setItalic}
				>
					<i>I</i>
				</button>
				<button
					className={cx('format-action', { active: activeFormats.underline })}
					type="button"
					onClick={setUnderline}
				>
					<u>U</u>
				</button>
				<input
					className={cx('format-action', {
						active:
							activeFormats.foreColor && activeFormats.foreColor !== '#000000',
					})}
					type="color"
					value={activeColor}
					onChange={handleColorChange}
				/>
			</div>
		</div>
	);
}

export default ControlPanel;
