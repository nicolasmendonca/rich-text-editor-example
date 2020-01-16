import React, { useEffect, useState } from 'react';
import './SynonymsPopup.css';
import { CONSTANTS } from '../constants';
import { hasWhiteSpace, apiClient } from '../utils';

function SynonymsPopup({ top, left, wordLookup, onWordSelected }) {
	const [suggestions, setSuggestions] = useState(null);
	useEffect(() => {
		if (hasWhiteSpace(wordLookup)) return; // not a valid word
		apiClient(`${CONSTANTS.synonymsApiEndpoint}?rel_syn=${wordLookup}`).then(
			setSuggestions
		);
	}, [wordLookup]);

	if (suggestions === null) return null; // Request is loading

	const renderSuggestionsList = () => {
		return suggestions.length === 0 ? (
			<div className="no-results-found">
				<p>No synonyms found :(</p>
			</div>
		) : (
			<React.Fragment>
				<h3>Available Synonyms</h3>
				<ul>
					{suggestions.map(suggestion => (
						<li key={suggestion.word}>
							<button
								tabIndex={0}
								type="button"
								onClick={() => onWordSelected(suggestion.word)}
							>
								{suggestion.word}
							</button>
						</li>
					))}
				</ul>
			</React.Fragment>
		);
	};

	return (
		<div
			className="synonyms-popup"
			style={{ top: `${top}px`, left: `${left}px` }}
		>
			{renderSuggestionsList()}
		</div>
	);
}

export default SynonymsPopup;
