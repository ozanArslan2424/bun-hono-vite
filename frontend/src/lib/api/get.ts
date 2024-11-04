import { SelectBook } from "@shared/schemas/notes";
import { useQuery } from "@tanstack/react-query";
import { api, KEYS } from ".";

export function useAllBooks() {
  return useQuery({
    queryKey: [KEYS.ALL_BOOKS],
    queryFn: async () => {
      const res = await api.books.$get();

      if (!res.ok) {
        throw new Error("An error occurred while fetching books");
      }

      const data = await res.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useBook(bookId: string) {
  return useQuery({
    queryKey: [KEYS.BOOK, bookId],
    queryFn: async () => {
      const res = await api.books[":id"].$get({ param: { id: bookId } });

      if (!res.ok) {
        throw new Error("An error occurred while fetching book");
      }

      const data = await res.json();
      return data as { book: SelectBook };
    },
    refetchOnWindowFocus: false,
  });
}
