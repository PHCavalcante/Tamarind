import { useState, useCallback, useRef } from "react";

interface UseEmojiPickerReturn {
  showPicker: boolean;
  selectedEmoji: string | null;
  emojiRef: React.RefObject<string>;
  openPicker: () => void;
  closePicker: () => void;
  selectEmoji: (emoji: string) => void;
}

export function useEmojiPicker(initialEmoji?: string): UseEmojiPickerReturn {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(
    initialEmoji || null
  );
  const emojiRef = useRef<string>(initialEmoji || "");

  const openPicker = useCallback(() => {
    setShowPicker(true);
  }, []);

  const closePicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  const selectEmoji = useCallback(
    (emoji: string) => {
      setSelectedEmoji(emoji);
      emojiRef.current = emoji;
      closePicker();
    },
    [closePicker]
  );

  return {
    showPicker,
    selectedEmoji,
    emojiRef,
    openPicker,
    closePicker,
    selectEmoji,
  };
}
