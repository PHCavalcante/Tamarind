import React, { Component } from "react";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "@draft-js-plugins/buttons";
import "draft-js/dist/Draft.css";

type TextFormatterProps = {
  text: string;
  readOnly: boolean;
  inputText: React.RefObject<string>;
};

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

export default class CustomToolbarEditor extends Component<TextFormatterProps> {
  constructor(props: TextFormatterProps) {
    super(props);
    this.state = {
      editorState: props.text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.text)))
        : EditorState.createEmpty(),
    };
  }

  componentDidUpdate(prevProps: TextFormatterProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({
        editorState: this.props.text
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(this.props.text))
            )
          : EditorState.createEmpty(),
      });
    }
  }

  onChange = (editorState: EditorState) => {
    if (this.props.readOnly) return;
    this.setState({ editorState });

    this.props.inputText.current = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
      null,
      2
    );
    // console.log(this.props.inputText.current);
  };

  focus = () => {
    this.editor.focus();
  };

  handleBlockType = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    return (
      <div className="w-full h-full">
        {!this.props.readOnly && (
          <Toolbar>
            {(externalProps) => (
              <div className="flex items-center content-center mb-3 gap-2 opacity-40">
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </div>
            )}
          </Toolbar>
        )}
        <div
          onClick={this.focus}
          style={{
            height: "100%",
            padding: "10px",
            borderRadius: "4px",
            cursor: "text",
          }}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Describe your note..."
            plugins={plugins}
            readOnly={this.props.readOnly}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
      </div>
    );
  }
}
