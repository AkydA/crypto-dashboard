import { createContext, useContext } from "react";

export const BookmarkContext = createContext<{
  bookmarks: string[];
  setBookmarks: (item: string[]) => void;
}>({ bookmarks: [], setBookmarks: () => {} });

export const LS_KEY_BOOKMARKS = "bookmarks";

export const useBookmarks = () => {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  const addBookmark = (id: string) => {
    if (!bookmarks.includes(id)) {
      const newList = [...bookmarks, id];
      window.localStorage.setItem(LS_KEY_BOOKMARKS, JSON.stringify(newList));
      setBookmarks(newList);
    }
  };

  const removeBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      const newList = [...bookmarks];
      const idx = newList.indexOf(id);
      if (idx > -1) newList.splice(idx, 1);
      window.localStorage.setItem(LS_KEY_BOOKMARKS, JSON.stringify(newList));
      setBookmarks(newList);
    }
  };

  return { bookmarks, addBookmark, removeBookmark };
};
