
import { MediaCard, MediaType } from './MediaCard';
import { cn } from '../../lib/utils';

interface MediaItem {
  id: string;
  title: string;
  artist?: string;
  thumbnail: string;
  plays: number;
  likes: number;
  type: MediaType;
  duration?: string;
  isLive?: boolean;
}

interface MediaGridProps {
  items: MediaItem[];
  className?: string;
}

export function MediaGrid({ items, className }: MediaGridProps) {
  return (
    <div className={cn("media-grid", className)}>
      {items.map((item) => (
        <MediaCard key={item.id} {...item} />
      ))}
    </div>
  );
}