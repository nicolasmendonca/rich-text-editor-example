/// <reference types="Cypress" />

const initialText =
	'A year ago I was in the audience at a gathering of designers in San Francisco. There were four designers on stage, and two of them worked for me. I was there to support them. The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, that modern design problems were very complex. And we ought to need a license to solve them.';

context('RichTextEditor', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('loads the initial text', () => {
		cy.get('.text-content').should('have.html', initialText);
	});

	it('allows the user to edit text', () => {
		cy.get('.text-content')
			.focus()
			.type('This is some unformatted text')
			.should('contain.html', 'This is some unformatted text');
	});

	it('can set bold text', () => {
		cy.get('.text-content')
			.type('{selectall}')
			.get('.format-action:nth-child(1)')
			.click()
			.get('.text-content')
			.should('have.html', `<b>${initialText}</b>`);
	});

	it('can set italic text', () => {
		cy.get('.text-content')
			.type('{selectall}')
			.get('.format-action:nth-child(2)')
			.click()
			.get('.text-content')
			.should('have.html', `<i>${initialText}</i>`);
	});

	it('can set underline text', () => {
		cy.get('.text-content')
			.type('{selectall}')
			.get('.format-action:nth-child(3)')
			.click()
			.get('.text-content')
			.should('have.html', `<u>${initialText}</u>`);
	});

	it('can have multiple formats at the same time', () => {
		cy.get('.text-content')
			.type('{selectall}')
			.get('.format-action:nth-child(1)')
			.click()
			.get('.format-action:nth-child(2)')
			.click()
			.get('.format-action:nth-child(3)')
			.click()
			.get('.text-content')
			.should('have.html', `<b><i><u>${initialText}</u></i></b>`);
	});

	it('can select a word and get a synonyms list', () => {
		cy.get('.text-content')
			.type('{selectall}')
			.type('{backspace}')
			.type('Party')
			.type('{selectall}')
			.get('.synonyms-popup')
			.should('contain.text', 'Available Synonyms')
			.should('contain.text', 'company')
			.should('contain.text', 'political party');
	});

	it('replaces formatted text when the user clicks on a synonym', () => {
		cy.get('.text-content')
			.type('{selectall}')
			.type('{backspace}')
			.type('Party')
			.type('{selectall}')
			.get('.format-action:nth-child(1)')
			.click()
			.get('.synonyms-popup')
			.get('button')
			.contains('company')
			.click()
			.get('.text-content')
			.should('have.html', '<b>company</b>');
	});
});
