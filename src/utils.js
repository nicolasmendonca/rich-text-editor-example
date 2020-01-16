export const hasWhiteSpace = text => /\W/g.test(text);

export const apiClient = (...params) =>
	window
		.fetch(...params)
		.then(res => res.json())
		.catch(console.error);

export const indent = () => {
	const currentSelection = window.getSelection();
	const range = currentSelection.getRangeAt(0);
	// Insert tab
	const tabNode = document.createTextNode('\u00a0\u00a0\u00a0\u00a0');
	range.insertNode(tabNode);
	range.setStartAfter(tabNode);
	range.setEndAfter(tabNode);
	currentSelection.removeAllRanges();
	currentSelection.addRange(range);
};

export const removeIndentation = () => {
	// Remove previous tabs (if any)
	const currentSelection = window.getSelection();
	const range = currentSelection.getRangeAt(0);
	const prevNode =
		currentSelection.focusNode.childNodes[currentSelection.focusOffset - 1];
	if (prevNode && prevNode.textContent === '\u00a0\u00a0\u00a0\u00a0') {
		range.commonAncestorContainer.removeChild(prevNode);
	}
};

export const getElementParentTag = (element, lookupTagName, stopTag) => {
	if (element.parentNode === stopTag || !element.parentNode) {
		return null;
	} else if (element.parentNode.tagName === lookupTagName) {
		return element.parentNode;
	} else {
		return getElementParentTag(element.parentNode, lookupTagName, stopTag);
	}
};

export const checkForStyles = (selection, ref) => {
	return tagName =>
		Boolean(
			selection &&
				getElementParentTag(selection.baseNode, tagName.toUpperCase(), ref)
		);
};

export const checkNodeBelongsToEditor = (node, editorRef) => {
	if (!node.parentNode) return false;
	return (
		node.parentNode === editorRef ||
		checkNodeBelongsToEditor(node.parentNode, editorRef)
	);
};
