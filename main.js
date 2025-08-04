import { EditorView, basicSetup } from "https://cdn.jsdelivr.net/npm/@codemirror/basic-setup@6.6.2/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-html@6.4.3/+esm";
import { oneDark } from "https://cdn.jsdelivr.net/npm/@codemirror/theme-one-dark@6.2.1/+esm";
import { keymap } from "https://cdn.jsdelivr.net/npm/@codemirror/view@6.17.1/+esm";
import { insertTagCompletion } from "./tag-complete.js";

let editorContent = localStorage.getItem("htmlCode") || "<h1>Hello, World!</h1>";

const updatePreview = (doc) => {
  const iframe = document.getElementById("preview");
  iframe.srcdoc = doc;
  localStorage.setItem("htmlCode", doc);
};

const view = new EditorView({
  doc: editorContent,
  extensions: [
    basicSetup,
    html(),
    oneDark,
    keymap.of([insertTagCompletion]),
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        updatePreview(v.state.doc.toString());
      }
    })
  ],
  parent: document.getElementById("editor"),
});

updatePreview(editorContent);
