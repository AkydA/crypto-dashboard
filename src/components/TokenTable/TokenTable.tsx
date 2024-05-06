import React from "react";

import { useMediaQuery } from "~/hooks/useMediaQuery";

import { COLUMN_RATIO, COLUMN_RATIO_MOBILE, Row } from "./Row";
import { TokenInfo } from "./type";

import S from "./TokenTable.module.scss";

interface TokenTableProps {
  tokenInfos: TokenInfo[];
  currency: "krw" | "usd";
}

export const TokenTable: React.FC<TokenTableProps> = ({
  tokenInfos,
  currency,
}) => {
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <div className={S["token-info-table"]}>
      <div className={S.header}>
        <div
          className={S.name}
          style={{ width: isMobile ? COLUMN_RATIO_MOBILE[0] : COLUMN_RATIO[0] }}
        >
          자산
        </div>
        {!isMobile && (
          <div
            className={S.price}
            style={{
              width: isMobile ? COLUMN_RATIO_MOBILE[1] : COLUMN_RATIO[1],
            }}
          >
            Price
          </div>
        )}
        {isMobile && (
          <div
            className={S["mobile-wrapper"]}
            style={{ width: COLUMN_RATIO_MOBILE[1] }}
          >
            <div
              className={S.price}
              style={{
                width: isMobile ? COLUMN_RATIO_MOBILE[1] : COLUMN_RATIO[1],
              }}
            >
              Price
            </div>
            <div
              className={S.price}
              style={{
                width: isMobile ? COLUMN_RATIO_MOBILE[3] : COLUMN_RATIO[5],
              }}
            >
              24H Volume
            </div>
          </div>
        )}
        {isMobile ? (
          <div
            className={S["mobile-change-wrapper"]}
            style={{ width: COLUMN_RATIO_MOBILE[2] }}
          >
            <div className={S.change}>1H</div>
            <div className={S.change}>24H</div>
            <div className={S.change}>7D</div>
          </div>
        ) : (
          <>
            <div className={S.change} style={{ width: COLUMN_RATIO[2] }}>
              1H
            </div>
            <div className={S.change} style={{ width: COLUMN_RATIO[3] }}>
              24H
            </div>
            <div className={S.change} style={{ width: COLUMN_RATIO[4] }}>
              7D
            </div>
          </>
        )}
        {!isMobile && (
          <div
            className={S.price}
            style={{
              width: isMobile ? COLUMN_RATIO_MOBILE[3] : COLUMN_RATIO[5],
            }}
          >
            24H Volume
          </div>
        )}
      </div>
      {tokenInfos.map((item, index) => {
        return <Row key={index} tokenInfo={item} currency={currency} />;
      })}
    </div>
  );
};
