import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { SkillTag } from "@/types";

interface TagInputProps {
  tags: SkillTag[];
  onChange: (tags: SkillTag[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export function TagInput({ tags, onChange, placeholder, suggestions = [] }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) return;
    onChange([...tags, { id: crypto.randomUUID(), name: trimmed }]);
    setInput("");
  };

  const removeTag = (id: string) => {
    onChange(tags.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1].id);
    }
  };

  const filteredSuggestions = suggestions.filter(
    (s) => !tags.some((t) => t.name.toLowerCase() === s.toLowerCase())
  );

  return (
    <div>
      <div className="glass-input flex flex-wrap items-center gap-2 !py-2.5 min-h-[52px]">
        {tags.map((tag) => (
          <span key={tag.id} className="tag-chip animate-scale-in">
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              className="hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-white placeholder-gray-500 text-sm"
        />
      </div>

      {filteredSuggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filteredSuggestions.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="inline-flex items-center gap-1 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-300 transition-all"
            >
              <Plus size={12} />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
