import React, { Component } from 'react';
import './App.css';
import getMockText from './text.service';
import RichTextEditor from './RichTextEditor/RichTextEditor';
import SynonymsPopup from './SynonymsPopup/SynonymsPopup';
import { CONSTANTS } from './constants';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialHtml: '',
			html: '',
			selection: null,
			wordLookup: null,
			selectionPosition: null,
		};
	}
	componentDidMount() {
		getMockText().then(html => {
			this.setState({ initialHtml: html });
		});
	}

	setHtml = html => {
		this.setState({ html });
	};

	handleSelectionChange = selection => {
		if (selection === null) {
			this.setState({ selection, wordLookup: null, selectionPosition: null });
		} else {
			this.setState({
				selection,
				wordLookup: selection.toString(),
				selectionPosition: selection.getRangeAt(0).getBoundingClientRect(),
			});
		}
	};

	handleChosenSuggestion = suggestedWord => {
		const range = this.state.selection.getRangeAt(0);
		range.deleteContents();
		range.insertNode(document.createTextNode(suggestedWord));
		this.setState({ wordLookup: null, selectionPosition: null });
	};

	render() {
		const { wordLookup, selectionPosition, initialHtml } = this.state;
		return (
			<div className="App">
				<header>
					<span>Simple Text Editor</span>
				</header>
				<main>
					<RichTextEditor
						initialHtml={initialHtml}
						onChange={this.setHtml}
						onSelectionChange={this.handleSelectionChange}
					/>
					{wordLookup && (
						<SynonymsPopup
							top={selectionPosition.top + CONSTANTS.synonymsPopupCursorOffset}
							left={selectionPosition.left}
							wordLookup={wordLookup}
							onWordSelected={this.handleChosenSuggestion}
						/>
					)}
				</main>
			</div>
		);
	}
}

export default App;
