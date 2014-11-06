// ==UserScript==
// @name            HTML to Markdown
// @description     Convert selected HTML to markdown.
// @version         1.1
// @author          Wayne Hartmann
// @license         GPL
// @include         *
// @grant           GM_setClipboard
// @require         https://raw.githubusercontent.com/wayne-hartmann/html-to-markdown-userscript/master/htmldomparser.js
// @require         https://raw.githubusercontent.com/wayne-hartmann/html-to-markdown-userscript/master/html2markdown.js
// ==/UserScript==

if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return;

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-html-to-markdown" type="context">\
                    <menuitem label="Copy HTML to Markdown"></menuitem>\
                  </menu>';

document.querySelector("#userscript-html-to-markdown menuitem")
        .addEventListener("click", convertHTML, false);

function initMenu(aEvent) {
  // Executed when user right click on web page body
  var node = aEvent.target;
  var item = document.querySelector("#userscript-html-to-markdown menuitem");
  body.setAttribute("contextmenu", "userscript-html-to-markdown");
}

function addParamsToForm(aForm, aKey, aValue) {
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", aKey);
  hiddenField.setAttribute("value", aValue);
  aForm.appendChild(hiddenField);
}

function convertHTML(aEvent) {
  var range = window.getSelection().getRangeAt(0),
  content = range.extractContents(),
  span = document.createElement('SPAN');
  span.appendChild(content);
  var htmlContent = span.innerHTML;
  range.insertNode(span);
  var md = HTML2Markdown(htmlContent);
  GM_setClipboard(md, 'text');
}