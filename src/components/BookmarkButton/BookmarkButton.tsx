import clsx from "clsx";
import React, { useRef, useState } from "react";

import Star from "~/assets/star.svg?react";
import { useBookmarks } from "~/hooks/useBookmark";

import S from "./BookmarkButton.module.scss";

export const TOAST_DURATION = 1200;

interface BookmarkButtonProps {
  id: string;
  size?: "medium" | "small";
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
    <button
      className={clsx(S["bookmark-button"], { [S.small]: size === "small" })}
      onClick={(e) => {
        isMarked ? removeBookmark(id) : addBookmark(id);
        setShowToast(true);
        if (timerId.current !== -1) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => setShowToast(false), TOAST_DURATION);
        e.stopPropagation();
      }}
    >
      <Star className={clsx(S.star, { [S["is-marked"]]: isMarked })} />
      <div
        className={clsx(S["bookmark-button-toast"], {
          [S.hidden]: !showToast,
          [S.remove]: !isMarked,
        })}
      >
        {isMarked ? "북마크가 추가되었습니다." : "북마크가 해제되었습니다."}
      </div>
    </button>
  );
};
