export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NoteInputValues {
  title: string;
  content: string;
  tag: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
