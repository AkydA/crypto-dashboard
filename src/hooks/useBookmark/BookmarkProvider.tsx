import React, { PropsWithChildren, useState } from "react";

import { BookmarkContext, LS_KEY_BOOKMARKS } from "./useBookmark";

export const BookmarkProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    JSON.parse(window.localStorage.getItem(LS_KEY_BOOKMARKS) || "[]")
  );

  return (
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};
