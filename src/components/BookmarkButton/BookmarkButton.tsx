import { Star } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import React, { useRef, useState } from "react";

import { useBookmarks } from "~/hooks/useBookmark";

import S from "./BookmarkButton.module.scss";

export const TOAST_DURATION = 1200;

interface BookmarkButtonProps {
  id: string;
  size?: "large" | "medium" | "small";
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  size = "medium",
}) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isMarked = bookmarks.includes(id);

  const [showToast, setShowToast] = useState(false);
  const timerId = useRef(-1);

  return (
    <IconButton
      size={size}
      onClick={(e) => {
        isMarked ? removeBookmark(id) : addBookmark(id);
        setShowToast(true);
        if (timerId.current !== -1) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => setShowToast(false), TOAST_DURATION);
        e.stopPropagation();
      }}
    >
      <Star sx={{ color: isMarked ? "orange" : "lightgrey" }} />
      <div
        className={clsx(S["bookmark-button-toast"], {
          [S.hidden]: !showToast,
          [S.remove]: !isMarked,
        })}
      >
        {isMarked ? "북마크가 추가되었습니다." : "북마크가 해제되었습니다."}
      </div>
    </IconButton>
  );
};
