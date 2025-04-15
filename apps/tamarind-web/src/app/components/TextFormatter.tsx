import React, { Component } from "react";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentBlock,
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
  };

  focus = () => {
    this.editor?.focus();
  };

  handleBlockType = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };
  currentStyle = () => {
    const currentStyle = Array.from(
      this.state.editorState.getCurrentInlineStyle().toArray()
    );
    return currentStyle;
  };
  toggleInlineStyle = (style: string): void => {
    this.setState({
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, style),
    });
  };
  getCurrentBlockType = () => {
    const selection = this.state.editorState.getSelection();
    const content = this.state.editorState.getCurrentContent();
    return content.getBlockForKey(selection.getStartKey()).getType();
  };
  blockStyleFn = (block: ContentBlock): string => {
    const type = block.getType();
    switch (type) {
      case "header-one":
        return "custom-header-one";
      case "header-two":
        return "custom-header-two";
      case "header-three":
        return "custom-header-three";
      case "blockquote":
        return "custom-blockquote";
      default:
        return "";
    }
  };

  render() {
    const currentStyle = this.currentStyle();
    // const currentBlockType = this.getCurrentBlockType();
    // console.log(this.currentStyle());
    return (
      <div className="relative flex-1">
        {!this.props.readOnly && (
          <Toolbar>
            {(externalProps) => (
              <div className="flex flex-wrap items-center content-center my-3 gap-2 opacity-80 dark:invert">
                {/* Inline buttons */}
                <BoldButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.toggleInlineStyle("BOLD");
                    },
                    id: currentStyle.includes("BOLD")
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
                    id: currentStyle.includes("ITALIC")
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
                    id: currentStyle.includes("UNDERLINE")
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
                    id: currentStyle.includes("CODE")
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />

                {/* Block buttons */}
                <HeadlineOneButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("header-one");
                      this.toggleInlineStyle("header-one");
                    },
                    className: this.getCurrentBlockType() === "header-one"
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <HeadlineTwoButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("header-two");
                       this.toggleInlineStyle("header-two");
                    },
                    className: this.getCurrentBlockType() === "header-one"
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <HeadlineThreeButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("header-three");
                       this.toggleInlineStyle("header-three");
                    },
                    className: this.getCurrentBlockType() === "header-one"
                      ? "toolbar-active-button"
                      : "toolbar-button",
                  }}
                />
                <UnorderedListButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("unordered-list-item");
                    },
                    className: this.getCurrentBlockType() === "unordered-list-item"
                        ? "toolbar-active-button"
                        : "toolbar-button",
                  }}
                />
                <OrderedListButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("ordered-list-item");
                    },
                    className:
                      this.getCurrentBlockType() === "ordered-list-item"
                        ? "toolbar-active-button"
                        : "toolbar-button",
                  }}
                />
                <BlockquoteButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("blockquote");
                    },
                    className:
                      this.getCurrentBlockType() === "blockquote"
                        ? "toolbar-active-button"
                        : "toolbar-button",
                  }}
                />
                <CodeBlockButton
                  {...externalProps}
                  buttonProps={{
                    onClick: (e) => {
                      e.preventDefault();
                      this.handleBlockType("code-block");
                    },
                    className:
                      this.getCurrentBlockType() === "code-block"
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
            flex: 1,
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
            blockStyleFn={this.blockStyleFn}
          />
        </div>

        {this.editor?.state.readOnly && (
          <span className="absolute bottom-5 right-3 text-base text-gray-500">
            {this.state.editorState.getCurrentContent().getPlainText().length} /
            500
          </span>
        )}
      </div>
    );
  }
}
