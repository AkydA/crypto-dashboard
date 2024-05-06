import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { dummyMarketDataKrw, dummyMarketDataUsd } from "~/_dummy";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { Select } from "~/components/Select";
import { TokenInfo, TokenTable } from "~/components/TokenTable";
import { useBookmarks } from "~/hooks/useBookmark";
import axiosClient from "~/utils/axiosClient";
import { useDummyData } from "~/utils/mode";

import S from "./TokenListPanel.module.scss";

export const TokenListPanel = () => {
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();
  const [showType, setShowType] = useState<"all" | "bookmarked">("all");
  const [currency, setCurrency] = useState<"krw" | "usd">("krw");
  const [pageSize, setPageSize] = useState<10 | 30 | 50>(50);
  const [data, setData] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (more = false) => {
      if (isLoading) return;

      setIsLoading(true);

      let newData = [];

      if (useDummyData) {
        const selectedData =
          currency === "krw" ? dummyMarketDataKrw : dummyMarketDataUsd;
        newData = more
          ? selectedData.slice(data.length, data.length + pageSize)
          : selectedData.slice(0, pageSize);
      } else {
        let page = 1;
        if (more) page = Math.floor(data.length / pageSize) + 1;
        try {
          const axiosResponse = await axiosClient.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params: {
                vs_currency: currency,
                order: "market_cap_desc",
                per_page: pageSize,
                page: page,
                sparkline: false,
                price_change_percentage: "1h,24h,7d",
                precision: 2,
              },
            }
          );
          newData = axiosResponse.data;
        } catch {
          navigate("/error");
        }
      }
      setTimeout(() => {
        if (more) setData([...data, ...newData]);
        else setData(newData);
        setIsLoading(false);
      }, 1000);
    },
    [isLoading, pageSize, data, currency]
  );

  useEffect(() => {
    fetchData();
  }, [pageSize, currency]);

  const filteredData = () => {
    if (showType === "bookmarked") {
      return data.filter((item) => bookmarks.includes(item.id));
    }
    return data;
  };

  return (
    <div className={S["token-list-panel"]}>
      <div className={S["filter-panel"]}>
        <Select
          value={showType}
          setValue={(value: string) =>
            setShowType(value as SetStateAction<"all" | "bookmarked">)
          }
        >
          <Select.Option value="all">전체보기</Select.Option>
          <Select.Option value="bookmarked">북마크보기</Select.Option>
        </Select>
        <Select
          value={currency}
          setValue={(value: string) =>
            setCurrency(value as SetStateAction<"krw" | "usd">)
          }
        >
          <Select.Option value="krw">KRW 보기</Select.Option>
          <Select.Option value="usd">USD 보기</Select.Option>
        </Select>
        <Select
          value={pageSize.toString()}
          setValue={(value: string) =>
            setPageSize(Number(value) as SetStateAction<10 | 30 | 50>)
          }
        >
          <Select.Option value="10">10개 보기</Select.Option>
          <Select.Option value="30">30개 보기</Select.Option>
          <Select.Option value="50">50개 보기</Select.Option>
        </Select>
      </div>

      <TokenTable tokenInfos={filteredData()} currency={currency} />
      {isLoading && (
        <div className={S["loading-wrapper"]}>
          <LoadingIndicator />
        </div>
      )}

      <button className={S["more-button"]} onClick={() => fetchData(true)}>
        + 더보기
      </button>
    </div>
  );
};
