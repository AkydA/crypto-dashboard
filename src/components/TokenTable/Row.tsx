import { useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { BookmarkButton } from "~/components/BookmarkButton";
import { PercentageNumber } from "~/components/PercentageNumber";
import { PriceNumber } from "~/components/PriceNumber";

import { TokenInfo } from "./type";

import S from "./Row.module.scss";

export const COLUMN_RATIO = ["31%", "17%", "9%", "9%", "9%", "25%"];
export const COLUMN_RATIO_MOBILE = ["30%", "50%", "20%"];

interface RowProps {
  tokenInfo: TokenInfo;
  currency: "krw" | "usd";
}

export const Row: React.FC<RowProps> = ({ tokenInfo, currency }) => {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const navigate = useNavigate();

  return (
    <div className={S["token-info-row"]}>
      <div
        className={S.asset}
        style={{ width: isMobile ? COLUMN_RATIO_MOBILE[0] : COLUMN_RATIO[0] }}
        onClick={() => navigate(`/token/${tokenInfo.id}`)}
      >
        <BookmarkButton
          id={tokenInfo.id}
          size={isMobile ? "small" : "medium"}
        />
        <img className={S.icon} src={tokenInfo.image} alt={tokenInfo.symbol} />
        <div className={S["name-symbol"]}>
          <div className={S.name}>{tokenInfo.name}</div>
          <div className={S.symbol}>{tokenInfo.symbol.toUpperCase()}</div>
        </div>
      </div>
      {!isMobile && (
        <PriceNumber
          num={tokenInfo.current_price}
          currency={currency}
          className={S.price}
          style={{ width: COLUMN_RATIO[1] }}
        />
      )}
      {isMobile && (
        <div
          className={S["mobile-wrapper"]}
          style={{ width: COLUMN_RATIO_MOBILE[1] }}
        >
          <PriceNumber
            num={tokenInfo.current_price}
            currency={currency}
            className={S.price}
          />
          <PriceNumber
            num={tokenInfo.total_volume}
            currency={currency}
            className={S.price}
            useUnit
            style={{ color: "grey" }}
          />
        </div>
      )}
      {isMobile ? (
        <div
          className={S["mobile-wrapper"]}
          style={{ width: COLUMN_RATIO_MOBILE[2] }}
        >
          <PercentageNumber
            num={tokenInfo.price_change_percentage_1h_in_currency}
            className={S.change}
          />
          <PercentageNumber
            num={tokenInfo.price_change_percentage_24h_in_currency}
            className={S.change}
          />
          <PercentageNumber
            num={tokenInfo.price_change_percentage_7d_in_currency}
            className={S.change}
          />
        </div>
      ) : (
        <>
          <PercentageNumber
            num={tokenInfo.price_change_percentage_1h_in_currency}
            className={S.change}
            style={{ width: COLUMN_RATIO[2] }}
          />
          <PercentageNumber
            num={tokenInfo.price_change_percentage_24h_in_currency}
            className={S.change}
            style={{ width: COLUMN_RATIO[3] }}
          />
          <PercentageNumber
            num={tokenInfo.price_change_percentage_7d_in_currency}
            className={S.change}
            style={{ width: COLUMN_RATIO[4] }}
          />
        </>
      )}

      {!isMobile && (
        <PriceNumber
          num={tokenInfo.total_volume}
          currency={currency}
          className={S.price}
          style={{ width: COLUMN_RATIO[5] }}
        />
      )}
    </div>
  );
};
