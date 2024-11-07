import { useQuery } from "@tanstack/react-query";
import { api, KEYS } from ".";
import { getSession } from "../auth.client";

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

export function useBook(bookId: string | undefined) {
  if (!bookId) {
    throw new Error("bookId is required");
  }

  return useQuery({
    queryKey: [KEYS.BOOK, bookId],
    queryFn: async () => {
      const res = await api.books[":id"].$get({ param: { id: bookId } });

      if (!res.ok) {
        throw new Error("An error occurred while fetching book");
      }

      const data = await res.json();

      return data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useUserQuery() {
  const query = useQuery({
    queryKey: [KEYS.USER],
    queryFn: async () => {
      const { data, error } = await getSession();

      if (error) {
        throw new Error("An error occurred while fetching user");
      }

      return data;
    },
    refetchOnWindowFocus: false,
  });

  const user = query.data?.user;

  return { user };
}
