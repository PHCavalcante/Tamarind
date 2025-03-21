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

type TextFormatterState = {
  editorState: EditorState;
};

export default class CustomToolbarEditor extends Component<
  TextFormatterProps,
  TextFormatterState
> {
  private editor: Editor | null = null;

  constructor(props: TextFormatterProps) {
    super(props);
    this.state = {
      editorState: props.text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.text)))
        : EditorState.createEmpty(),
    };
  }

  handleBeforeInput = () => {
    const currentLength = this.state.editorState
      .getCurrentContent()
      .getPlainText().length;
    if (currentLength >= 500) {
      return "handled";
    }
    return "not-handled";
  };

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
    this.editor?.focus();
  };

  handleBlockType = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };
  currentStyle = () => {
    const currentStyle = Array.from(this.state.editorState.getCurrentInlineStyle().toArray());
    // console.log(currentStyle?.map((x) => x[0]));
    return currentStyle;
  }
  toggleInlineStyle = (style: string): void => {
    this.setState({ editorState: RichUtils.toggleInlineStyle(this.state.editorState, style) });
  };

  render() {
    return (
      <div className="relative flex-1">
        {!this.props.readOnly && (
          <Toolbar>
            {(externalProps) => (
              <div className="flex flex-wrap items-center content-center my-3 gap-2 opacity-80">
                <BoldButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("BOLD");
                    },
                    id: this.currentStyle()?.includes("BOLD")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <ItalicButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("ITALIC");
                    },
                    id: this.currentStyle()?.includes("ITALIC")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <UnderlineButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("UNDERLINE");
                    },
                    id: this.currentStyle()?.includes("UNDERLINE")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <CodeButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("CODE");
                    },
                    id: this.currentStyle()?.includes("CODE")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <HeadlineOneButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("header-one");
                    },
                    id: this.currentStyle()?.includes("header-one")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <HeadlineTwoButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("header-two");
                    },
                    id: this.currentStyle()?.includes("header-two")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <HeadlineThreeButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("header-three");
                    },
                    id: this.currentStyle()?.includes("header-three")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <UnorderedListButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("unordered-list-item");
                    },
                    id: this.currentStyle()?.includes("unordered-list-item")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <OrderedListButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("ordered-list-item");
                    },
                    id: this.currentStyle()?.includes("ordered-list-item")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <BlockquoteButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("blockquote");
                    },
                    id: this.currentStyle()?.includes("blockquote")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <CodeBlockButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("code-block");
                    },
                    id: this.currentStyle()?.includes("code-block")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
              </div>
            )}
          </Toolbar>
        )}
        <div
          onClick={this.focus}
          style={{
            cursor: "text",
            padding: "0 1rem",
            height: "100%",
            flex: 1
          }}
        >
          <Editor
            spellCheck
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Describe your note..."
            plugins={plugins}
            readOnly={this.props.readOnly}
            handleBeforeInput={this.handleBeforeInput}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
        {this.editor?.state.readOnly && <span className="absolute bottom-5 right-3 text-base text-gray-500">
          {this.state.editorState.getCurrentContent().getPlainText().length} /{" "}
          {500}
        </span>}
      </div>
    );
  }
}
