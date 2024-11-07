import { InsertBook, InsertNoteForm } from "@shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, KEYS } from ".";

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: InsertBook) => {
      const res = await api.books.$post({ json: values });

      if (!res.ok) {
        throw new Error("An error occurred while creating a new book");
      }
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error("Error", error);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: [KEYS.ALL_BOOKS] });
    },
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: InsertNoteForm) => {
      const res = await api.notes.$post({ json: values });

      if (!res.ok) {
        throw new Error("An error occurred while creating a new note");
      }

      const data = await res.json();
      return data.insertedNote;
    },
    onSettled: async (data, error) => {
      if (error) {
        console.error("Error", error);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: [KEYS.ALL_BOOKS] });

      return data;
    },
  });
}
