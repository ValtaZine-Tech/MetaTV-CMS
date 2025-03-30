
import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon,
  trend, 
  trendLabel,
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend !== undefined && (
              <div className={cn(
                "flex items-center mt-2 text-xs font-medium",
                trend > 0 ? "text-green-500" : "text-red-500"
              )}>
                <span>
                  {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
                {trendLabel && (
                  <span className="text-muted-foreground ml-1">
                    {trendLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="p-2 bg-primary/10 text-primary rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}