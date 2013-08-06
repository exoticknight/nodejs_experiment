/*
dynamic_render = (input_textarea_id, output_div_id, enable_math=true)->
  # highlight.js
  hljs.tabReplace = '    '
  hljs.initHighlightingOnLoad()

  # marked
  marked.setOptions
    gfm: true
    highlight: (lang, code)->
      return hljs.highlightAuto(lang, code).value
    tables: true
    breaks: true
    pedantic: false
    sanitize: true
    smartLists: true
    smartypants: false
    langPrefix: 'language-'

  # mathjax
  makeMathPreview = (elementID)->
    MathJax.Hub.Queue ["Typeset", MathJax.Hub, elementID]

  # codemirror
  window.editor = CodeMirror.fromTextArea document.getElementById(input_textarea_id), 
    indentUnit: 4
    lineNumbers: true
    lineWrapping: true
    showTrailingSpace: true
    autoCloseBrackets: true
    autoCloseTags: true
    viewportMargin: Infinity
    mode: 'gfm'

  # init
  $('#'+output_div_id).html marked $('#'+input_textarea_id).val()
  if enable_math == true
    makeMathPreview(output_div_id)

  # render html and math while editing
  window.editor.on 'change', ->
    $('#'+output_div_id).html marked window.editor.doc.getValue()
    if enable_math == true
      makeMathPreview output_div_id
*/
var dynamic_render;

dynamic_render = function(input_textarea_id, output_div_id, enable_math) {
  var makeMathPreview;
  if (enable_math == null) {
    enable_math = true;
  }
  hljs.tabReplace = '    ';
  hljs.initHighlightingOnLoad();
  marked.setOptions({
    gfm: true,
    highlight: function(lang, code) {
      return hljs.highlightAuto(lang, code).value;
    },
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    langPrefix: 'language-'
  });
  makeMathPreview = function(elementID) {
    return MathJax.Hub.Queue(["Typeset", MathJax.Hub, elementID]);
  };
  window.editor = CodeMirror.fromTextArea(document.getElementById(input_textarea_id), {
    indentUnit: 4,
    lineNumbers: true,
    lineWrapping: true,
    showTrailingSpace: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    viewportMargin: Infinity,
    mode: 'gfm'
  });
  $('#' + output_div_id).html(marked($('#' + input_textarea_id).val()));
  if (enable_math === true) {
    makeMathPreview(output_div_id);
  }
  return window.editor.on('change', function() {
    $('#' + output_div_id).html(marked(window.editor.doc.getValue()));
    if (enable_math === true) {
      return makeMathPreview(output_div_id);
    }
  });
};