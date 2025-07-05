import { useMemo, useCallback, useState } from "react";
import { EmojiPickerProps, EmojiData } from "../../types/emojiTypes";
import { emojiData } from "../../data/emojiData";

export default function EmojiPicker({ 
  showPicker, 
  setShowPicker, 
  parentEmoji,
  onEmojiSelect 
}: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('faces');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredEmojis = useMemo(() => {
    if (!searchTerm) {
      return emojiData[selectedCategory] || [];
    }
    
    return Object.values(emojiData)
      .flat()
      .filter(emoji => 
        emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emoji.unicode.includes(searchTerm)
      );
  }, [selectedCategory, searchTerm]);

  const handleEmojiSelect = useCallback((emoji: EmojiData) => {
    if (parentEmoji.current !== undefined) {
      parentEmoji.current = emoji.code;
    }
    onEmojiSelect?.(emoji.code);
    setShowPicker(false);
    setSearchTerm('');
  }, [parentEmoji, onEmojiSelect, setShowPicker]);

  const handleClose = useCallback(() => {
    setShowPicker(false);
    setSearchTerm('');
  }, [setShowPicker]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
  }, []);
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  if (!showPicker) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="relative w-96 h-[500px] bg-[var(--foreground)] dark:bg-[var(--darkAccent)] rounded-lg shadow-xl animate-modal">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-[var(--text)]">Emoji Picker</h2>
          <button 
            className="text-2xl hover:text-red-500 transition-colors duration-200"
            onClick={handleClose}
            aria-label="Close emoji picker"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col max-h-[400px]">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search emojis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!searchTerm && (
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {Object.keys(emojiData).map((category) => (
                <button
                  key={category}
                  className={`flex-1 px-3 py-2 text-sm font-medium text-center capitalize transition-colors duration-200 ${
                    selectedCategory === category 
                      ? 'bg-[var(--hoverPaper)] text-[var(--text)]' 
                      : 'hover:bg-[var(--hoverPaper)] text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredEmojis.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>No emojis found</p>
              </div>
            ) : (
              <div className="grid grid-cols-8 gap-2">
                {filteredEmojis.map((emoji, index) => (
                  <button
                    key={`${emoji.category}-${index}`}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-[var(--hoverPaper)] rounded-lg transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleEmojiSelect(emoji)}
                    title={emoji.name}
                    aria-label={emoji.name}
                  >
                    <span dangerouslySetInnerHTML={{ __html: emoji.code }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
