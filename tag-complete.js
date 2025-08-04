import { EditorView } from "https://cdn.jsdelivr.net/npm/@codemirror/view@6.17.1/+esm";
import { keymap } from "https://cdn.jsdelivr.net/npm/@codemirror/view@6.17.1/+esm";

export const insertTagCompletion = {
  key: ">",
  run(view) {
    let { state } = view;
    let pos = view.state.selection.main.head;
    let line = state.doc.lineAt(pos);
    let before = line.text.slice(0, pos - line.from);
    const match = before.match(/<([a-zA-Z0-9]+)$/);
    if (match) {
      let tag = match[1];
      let from = pos - tag.length - 1;
      view.dispatch({
        changes: {
          from,
          to: pos,
          insert: `<${tag}></${tag}>`
        },
        selection: {
          anchor: from + tag.length + 2 // place cursor between tags
        }
      });
      return true;
    }
    return false;
  }
};
