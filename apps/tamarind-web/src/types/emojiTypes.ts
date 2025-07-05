export interface EmojiData {
  code: string;
  unicode: string;
  name: string;
  category: string;
}

export interface EmojiPickerProps {
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
  parentEmoji: React.RefObject<string>;
  onEmojiSelect?: (emoji: string) => void;
  position?: "top" | "bottom" | "left" | "right";
  maxHeight?: number;
  maxWidth?: number;
}

export interface EmojiCategory {
  [key: string]: EmojiData[];
}
