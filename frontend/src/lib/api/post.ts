import { InsertBook } from "@shared/schemas/notes";
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
