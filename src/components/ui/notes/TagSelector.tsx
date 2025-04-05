
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TagSelectorProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  availableTags: string[];
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
  availableTags,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">{t('tags')}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div 
            key={tag}
            className="flex items-center px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground gap-1"
          >
            <span>{t(tag)}</span>
            <button 
              type="button" 
              onClick={() => onRemoveTag(tag)}
              className="h-4 w-4 rounded-full hover:bg-secondary-foreground/20 flex items-center justify-center"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <Select onValueChange={onAddTag}>
        <SelectTrigger className="focus-ring">
          <SelectValue placeholder={t('addTag')} />
        </SelectTrigger>
        <SelectContent>
          {availableTags
            .filter(tag => !tags.includes(tag))
            .map(tag => (
              <SelectItem key={tag} value={tag}>
                {t(tag)}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );
};

export default React.memo(TagSelector);
