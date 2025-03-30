
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { cn } from '../../lib/utils';

type ActivityType = 'upload' | 'stream' | 'donation' | 'comment';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  type: ActivityType;
  content: string;
  time: string;
}

const activityIcons: Record<ActivityType, string> = {
  upload: '📤',
  stream: '📺',
  donation: '💰',
  comment: '💬',
};

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{activity.user.name}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1">{activityIcons[activity.type]}</span>
                  {activity.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}