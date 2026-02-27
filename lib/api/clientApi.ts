import { nextServer } from "./api";
import { Note, NoteInputValues } from "@/types/note";
import { User } from "@/types/user";

export interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface RegisterRequest {
  email: string;
  password: string;
}

export interface FetchParams {
  search?: string;
  tag?: string;
  page: number;
  perPage: number;
}

interface CheckSessionResponse {
  success: boolean;
}

/* ================= AUTH ================= */

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (username: string) => {
  const res = await nextServer.patch<User>("/users/me", { username });
  return res.data;
};

/* ================= NOTES ================= */

export async function fetchNotes(
  searchText: string,
  page: number,
  tag?: string,
): Promise<NotesHTTPResponse> {
  const params: FetchParams = {
    page,
    perPage: 12,
  };

  if (tag) {
    params.tag = tag;
  }

  if (searchText.trim() !== "") {
    params.search = searchText.trim();
  }

  const res = await nextServer.get<NotesHTTPResponse>("/notes", {
    params,
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(note: NoteInputValues): Promise<Note> {
  const res = await nextServer.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
}
