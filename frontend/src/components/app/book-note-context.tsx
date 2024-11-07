import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type BookContextType = {
  selectedNoteId: string;
  setSelectedNoteId: Dispatch<SetStateAction<string>>;
  createNoteFormOpen: boolean;
  setCreateNoteFormOpen: Dispatch<SetStateAction<boolean>>;
  createNoteFormBookId: string;
  setCreateNoteFormBookId: Dispatch<SetStateAction<string>>;
};

const BookContext = createContext<BookContextType | null>(null);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within an BookContextProvider");
  }
  return context;
};

export const BookContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [createNoteFormOpen, setCreateNoteFormOpen] = useState(false);
  const [createNoteFormBookId, setCreateNoteFormBookId] = useState("");

  return (
    <BookContext.Provider
      value={{
        selectedNoteId,
        setSelectedNoteId,
        createNoteFormOpen,
        setCreateNoteFormOpen,
        createNoteFormBookId,
        setCreateNoteFormBookId,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
