
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../../components/ui/dropdown-menu';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  name: string;
  options: FilterOption[];
}

interface MediaFilterProps {
  categories: FilterCategory[];
  selectedFilters: Record<string, string[]>;
  onChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

export function MediaFilter({
  categories,
  selectedFilters,
  onChange,
  className,
}: MediaFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(selectedFilters);

  const handleFilterChange = (category: string, optionId: string, checked: boolean) => {
    const updatedFilters = { ...activeFilters };
    
    if (checked) {
      updatedFilters[category] = [...(updatedFilters[category] || []), optionId];
    } else {
      updatedFilters[category] = (updatedFilters[category] || []).filter(id => id !== optionId);
      
      if (updatedFilters[category].length === 0) {
        delete updatedFilters[category];
      }
    }
    
    setActiveFilters(updatedFilters);
    onChange(updatedFilters);
  };

  const removeFilter = (category: string, optionId: string) => {
    handleFilterChange(category, optionId, false);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onChange({});
  };

  // Count total active filters
  const totalActiveFilters = Object.values(activeFilters).flat().length;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {totalActiveFilters > 0 && (
                <Badge variant="secondary" className="ml-2">{totalActiveFilters}</Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                {category.options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.id}
                    checked={(activeFilters[category.name] || []).includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleFilterChange(category.name, option.id, checked)
                    }
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
              </React.Fragment>
            ))}
            {totalActiveFilters > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2" 
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Display active filters as badges */}
        {Object.entries(activeFilters).map(([category, options]) => 
          options.map(optionId => {
            const categoryObj = categories.find(c => c.name === category);
            if (!categoryObj) return null;
            
            const option = categoryObj.options.find(o => o.id === optionId);
            if (!option) return null;
            
            return (
              <Badge 
                key={`${category}-${optionId}`} 
                variant="outline"
                className="flex items-center gap-1 pl-2 pr-1 py-1 group"
              >
                <span className="text-xs">{option.label}</span>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-muted-foreground/20"
                  onClick={() => removeFilter(category, optionId)}
                >
                  <span className="sr-only">Remove</span>
                  <span aria-hidden="true">×</span>
                </Button>
              </Badge>
            );
          })
        )}
      </div>
    </div>
  );
}