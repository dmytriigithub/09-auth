"use client";

import css from "./NoteForm.module.css";
import { useId } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNote, NewNoteData } from "@/lib/api";
import { Note } from "@/types/note";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const fieldId = useId();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation<Note, Error, NewNoteData>({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/All");
      toast.success("Note created!");
    },
    onError: () => toast.error("Failed to create note."),
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => router.push("/notes/filter/All");

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;

    mutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          required
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="" disabled>
            -- Choose Tag--
          </option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
