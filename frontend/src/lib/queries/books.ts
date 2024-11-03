import { apiClient } from ".";

export const queryAllBooks = {
  queryKey: ["books"],
  queryFn: async () => {
    const res = await apiClient.api.books.$get();

    if (!res.ok) {
      throw new Error("An error occurred while fetching books");
    }

    const data = await res.json();
    return data;
  },
};
