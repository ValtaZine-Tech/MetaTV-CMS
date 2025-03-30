
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';

interface MediaHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  className?: string;
}

export function MediaHeader({
  title,
  description,
  action,
  className,
}: MediaHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", className)}>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      {action && (
        <Button onClick={action.onClick}>
          {action.icon || <Plus className="h-4 w-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}