
import React from 'react';
import { cn } from '../../lib/utils';
import { FileX, Upload } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = <FileX className="h-12 w-12 text-muted-foreground/50" />,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed min-h-[300px] bg-muted/5",
        className
      )}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted/20">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="mt-6">
          <Upload className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}