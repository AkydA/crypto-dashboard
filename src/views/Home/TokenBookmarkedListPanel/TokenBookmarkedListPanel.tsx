import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { dummyMarketDataKrw } from "~/_dummy";
import { TOAST_DURATION } from "~/components/BookmarkButton";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { TokenInfo, TokenTable } from "~/components/TokenTable";
import { useBookmarks } from "~/hooks/useBookmark";
import axiosClient from "~/utils/axiosClient";
import { useDummyData } from "~/utils/mode";

import S from "./TokenBookmarkedListPanel.module.scss";

export const TokenBookmarkedListPanel = () => {
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();
  const [data, setData] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef(-1);

  const fetchData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    let newData = [];
    if (useDummyData) {
      newData = dummyMarketDataKrw.filter((item) =>
        bookmarks.includes(item.id)
      );
    } else {
      try {
        const pages = Math.floor(bookmarks.length / 100);
        for (let i = 0; i <= pages; i++) {
          const axiosResponse = await axiosClient.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params: {
                vs_currency: "krw",
                order: "market_cap_desc",
                ids: bookmarks.slice(i * 100, i * 100 + 100).toString(),
                sparkline: false,
                price_change_percentage: "1h,24h,7d",
                precision: 2,
              },
            }
          );
          newData.push(...axiosResponse.data);
        }
      } catch {
        navigate("/error");
      }
    }

    if (timerId.current >= 0) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      setData(newData);
      setIsLoading(false);
    }, 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (timerId.current >= 0) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => fetchData(), TOAST_DURATION + 300);
  }, [bookmarks.length]);

  return (
    <div className={S["token-bookmarked-list-panel"]}>
      <TokenTable tokenInfos={data} currency="krw" />
      {isLoading && (
        <div className={S["loading-wrapper"]}>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
};
