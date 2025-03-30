
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { SortAsc, SortDesc } from 'lucide-react';

export type SortOption = {
  value: string;
  label: string;
  direction?: 'asc' | 'desc';
};

interface MediaSorterProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MediaSorter({
  options,
  value,
  onChange,
  className,
}: MediaSorterProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={className}>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] gap-2">
          {selectedOption?.direction && (
            selectedOption.direction === 'asc' 
              ? <SortAsc className="h-4 w-4" /> 
              : <SortDesc className="h-4 w-4" />
          )}
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.direction && (
                  option.direction === 'asc' 
                    ? <SortAsc className="h-4 w-4" /> 
                    : <SortDesc className="h-4 w-4" />
                )}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}