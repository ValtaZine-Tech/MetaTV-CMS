
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { Play, Music, Radio, Heart, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { AspectRatio } from '../../components/ui/aspect-ratio';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';

export type MediaType = 'music' | 'video' | 'stream';

interface MediaCardProps {
  id: string;
  title: string;
  artist?: string;
  thumbnail: string;
  plays: number;
  likes: number;
  type: MediaType;
  duration?: string;
  isLive?: boolean;
  className?: string;
}

export function MediaCard({
  id,
  title,
  artist,
  thumbnail,
  plays,
  likes,
  type,
  duration,
  isLive,
  className,
}: MediaCardProps) {
  const typeIcon = {
    music: <Music className="h-4 w-4" />,
    video: <Play className="h-4 w-4" />,
    stream: <Radio className="h-4 w-4" />,
  };

  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={thumbnail} 
            alt={title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        
        {isLive && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse-slow">
            LIVE
          </div>
        )}
        
        {duration && !isLive && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </div>
        )}
        
        <Button 
          size="icon" 
          variant="secondary" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium line-clamp-1">{title}</h3>
            {artist && (
              <p className="text-sm text-muted-foreground">{artist}</p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          {typeIcon[type]}
          <span>{plays.toLocaleString()} plays</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span>{likes.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}