
import React, { useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { useLanguage } from '@/context/LanguageContext';
import { Note } from '@/types/calendar';
import { Pencil, Trash2, Calendar as CalendarIcon, PinIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import NoteDialog from './NoteDialog';
import { getFormattedDateTime } from '@/lib/calendar-utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const NoteList: React.FC = () => {
  const { notes, updateNote, deleteNote } = useCalendar();
  const { locale, t } = useLanguage();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  
  // Sort notes: pinned first, then by date
  const sortedNotes = [...notes].sort((a, b) => {
    // First sort by pinned status
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  const handleEditClick = (note: Note) => {
    setCurrentNote(note);
    setEditDialogOpen(true);
  };
  
  const handleDeleteClick = (noteId: string) => {
    setNoteToDelete(noteId);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      setNoteToDelete(null);
    }
    setDeleteDialogOpen(false);
  };
  
  const togglePin = (note: Note) => {
    updateNote({
      ...note,
      isPinned: !note.isPinned
    });
  };
  
  const toggleComplete = (note: Note) => {
    updateNote({
      ...note,
      isCompleted: !note.isCompleted
    });
  };
  
  if (notes.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{t('noNotes')}</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          {t('clickAddNote')}
        </p>
      </div>
    );
  }
  
  return (
    <>
      <ScrollArea className="h-full w-full">
        <div className="space-y-1 p-2">
          {sortedNotes.map((note) => (
            <div 
              key={note.id}
              className="group p-3 rounded-lg transition-all hover:bg-secondary/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  <button
                    onClick={() => toggleComplete(note)}
                    className="mt-1"
                  >
                    <CheckCircle className={`h-4 w-4 ${note.isCompleted ? 'text-primary' : 'text-muted-foreground/40'}`} />
                  </button>
                  
                  <div className={`flex-1 ${note.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{note.title}</h3>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => togglePin(note)}
                        >
                          <PinIcon 
                            className={`h-4 w-4 ${note.isPinned ? 'text-primary' : 'text-muted-foreground'}`} 
                            fill={note.isPinned ? "currentColor" : "none"}
                          />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleEditClick(note)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                          onClick={() => handleDeleteClick(note.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {note.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        {getFormattedDateTime(new Date(note.date), locale)}
                      </div>
                      
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {note.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                            >
                              {t(tag)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className="w-full h-0.5 mt-2 rounded-full"
                style={{ backgroundColor: note.color ? `${note.color}30` : undefined }}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <NoteDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        note={currentNote}
        mode="edit"
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmDeleteMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NoteList;
