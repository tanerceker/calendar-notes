
import React, { useState, useEffect } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { Note } from '@/types/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note?: Note;
  mode: 'add' | 'edit';
}

const tagOptions = [
  'work', 'personal', 'important', 'meeting', 'reminder', 'idea', 'task'
];

const colorOptions = [
  { name: 'Blue', value: '#3498db' },
  { name: 'Green', value: '#2ecc71' },
  { name: 'Purple', value: '#9b59b6' },
  { name: 'Orange', value: '#e67e22' },
  { name: 'Red', value: '#e74c3c' },
  { name: 'Yellow', value: '#f1c40f' },
  { name: 'Gray', value: '#95a5a6' },
];

const NoteDialog: React.FC<NoteDialogProps> = ({ 
  open, 
  onOpenChange, 
  note, 
  mode
}) => {
  const { selectedDate, addNote, updateNote } = useCalendar();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('12:00');
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState('#3498db');
  const [reminder, setReminder] = useState<Date | null>(null);
  
  useEffect(() => {
    if (mode === 'add') {
      setDate(selectedDate || new Date());
      setTime('12:00');
      setTitle('');
      setContent('');
      setTags([]);
      setColor('#3498db');
      setReminder(null);
    } else if (mode === 'edit' && note) {
      setTitle(note.title);
      setContent(note.content);
      setDate(new Date(note.date));
      setTime(format(new Date(note.date), 'HH:mm'));
      setTags(note.tags || []);
      setColor(note.color || '#3498db');
      setReminder(note.reminder || null);
    }
  }, [mode, note, selectedDate, open]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const [hours, minutes] = time.split(':').map(Number);
    const noteDate = new Date(date);
    noteDate.setHours(hours, minutes, 0, 0);
    
    if (mode === 'add') {
      addNote({
        title,
        content,
        date: noteDate,
        tags,
        color,
        reminder,
        isPinned: false,
        isCompleted: false,
      });
    } else if (mode === 'edit' && note) {
      updateNote({
        ...note,
        title,
        content,
        date: noteDate,
        tags,
        color,
        reminder,
      });
    }
    
    onOpenChange(false);
  };
  
  const handleAddTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-in scale-in">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Add New Note' : 'Edit Note'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="focus-ring"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] focus-ring"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left text-sm font-normal focus-ring",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Time
                </label>
                <div className="relative">
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="focus-ring"
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color</label>
              <div className="flex space-x-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    className={cn(
                      "w-8 h-8 rounded-full transition-transform",
                      color === colorOption.value && "ring-2 ring-ring scale-110"
                    )}
                    style={{ backgroundColor: colorOption.value }}
                    onClick={() => setColor(colorOption.value)}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <div 
                    key={tag}
                    className="flex items-center px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground gap-1"
                  >
                    <span>{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="h-4 w-4 rounded-full hover:bg-secondary-foreground/20 flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <Select onValueChange={handleAddTag}>
                <SelectTrigger className="focus-ring">
                  <SelectValue placeholder="Add a tag" />
                </SelectTrigger>
                <SelectContent>
                  {tagOptions
                    .filter(tag => !tags.includes(tag))
                    .map(tag => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Add Note' : 'Update Note'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
