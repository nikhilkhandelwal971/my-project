import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-violet-500/15 blur-2xl rounded-full" />
        <div className="relative h-16 w-16 rounded-2xl glass flex items-center justify-center">
          <Icon size={28} className="text-violet-400/70" />
        </div>
      </div>
      <h4 className="text-base font-semibold text-white mb-1.5">{title}</h4>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors glass rounded-xl px-4 py-2 hover:bg-violet-500/10"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
