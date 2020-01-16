# Simple text editor

## Initial setup

Run `npm install` in order to setup application (**⚠️ Important**)

## Development server

Run `npm start` for a dev server.

## E2E tests

Run `npm e2e` to start cypress UI. Then click on **Run all specs** to run `richtexteditor.spec.js`

> ⚠️ **Note**: Keep in mind that the **local dev server must be running before launching the cypress client**

## Notes from the developer

Since a tight schedule was given for this assignment, there are a couple of considerations that I'd like to include before someone evaluates this test:

- Since a template was given, the possibility of adding Typescript & styled-components was opted out
- Unit tests would have been desirable for every file. But because a lack of time, I just used cypress e2e tests to make sure everything worked correctly.
  On a wider time frame, I would have written unit tests.
- This approach allows to reuse multiple `<RichTextEditor />` components instances at the same time, and their styles and selections don't interfere with each other
- I added tabulation functionality with tab (indent) & shift+tab (remove indent), but the latter does not work 100%. It needs some more extra work...
- To change the text format, please select the desired text first and then click on any of the button formats to apply it.
- Rich format options can be easily extended with any of the [execCommand CommandID](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Commands) options.
- When certain format is applied, the Control Panel button will have a stronger background color.

---

## Previous Readme

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Initial setup

Run `npm install` in order to setup application

## Development server

Run `npm start` for a dev server.

## Notes

- Text sample is given in `text.service.js`
- Given files structure is not obligatory and could be changed
