import { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { dummyBitcoinData } from "~/_dummy";
import { BookmarkButton } from "~/components/BookmarkButton";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { PercentageNumber } from "~/components/PercentageNumber";
import { PriceNumber } from "~/components/PriceNumber";
import { Select } from "~/components/Select";
import axiosClient from "~/utils/axiosClient";
import { useDummyData } from "~/utils/mode";

import { PriceCalculator } from "./PriceCalculator";
import { TokenDetailInfo, nullTokenDetailInfo } from "./type";

import S from "./TokenDetails.module.scss";

export const TokenDetails = () => {
  const navigate = useNavigate();
  const { tokenId = "" } = useParams<{ tokenId: string }>();
  const [tokenInfo, setTokenInfo] =
    useState<TokenDetailInfo>(nullTokenDetailInfo);
  const [currency, setCurrency] = useState<"krw" | "usd">("krw");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (useDummyData) {
        setTimeout(() => setTokenInfo(dummyBitcoinData), 3000);
      } else {
        try {
          const { data } = await axiosClient.get(
            `https://api.coingecko.com/api/v3/coins/${tokenId}`
          );
          setTokenInfo(data);
        } catch {
          navigate("/error");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {tokenInfo.name === "" ? (
        <LoadingIndicator />
      ) : (
        <div className={S["token-details"]}>
          <div className={S.header}>
            <div className={S.asset}>
              <BookmarkButton id={tokenId} />
              <img
                className={S.icon}
                src={tokenInfo.image.small}
                alt={tokenInfo.name}
              />
              <div className={S.name}>{`${
                tokenInfo.localization.ko ?? tokenInfo.name
              } (${tokenInfo.symbol.toUpperCase()})`}</div>
            </div>
            <Select
              value={currency}
              setValue={(value: string) =>
                setCurrency(value as SetStateAction<"krw" | "usd">)
              }
            >
              <Select.Option value="krw">KRW 보기</Select.Option>
              <Select.Option value="usd">USD 보기</Select.Option>
            </Select>
          </div>

          <div className={S["market-info"]}>
            <table className={S["rank-and-web"]}>
              <tbody>
                <tr>
                  <td className={S.title}>시가총액 Rank</td>
                  <td>Rank #{tokenInfo.market_cap_rank}</td>
                </tr>
                <tr>
                  <td className={S.title}>웹사이트</td>
                  <td>{tokenInfo.links.homepage[0] ?? "-"}</td>
                </tr>
              </tbody>
            </table>
            <div className={S["market-prices"]}>
              <div className={S["current-price"]}>
                <div className={S.row}>
                  <PriceNumber
                    num={tokenInfo.market_data.current_price[currency]}
                    currency={currency}
                    className={S.currency}
                  />
                  <PercentageNumber
                    num={
                      tokenInfo.market_data
                        .price_change_percentage_24h_in_currency[currency]
                    }
                    className={S["currency-per"]}
                  />
                </div>
                <div className={S.row}>
                  <div className={S.token}>
                    {`1.00000000 ${tokenInfo.symbol.toUpperCase()}`}
                  </div>
                  <PercentageNumber
                    num={tokenInfo.market_data.price_change_percentage_24h}
                    className={S["token-per"]}
                  />
                </div>
              </div>
              <div className={S.volumes}>
                <div className={S["volume-item"]}>
                  <div>시가총액</div>
                  <PriceNumber
                    num={tokenInfo.market_data.market_cap[currency]}
                    currency={currency}
                  />
                </div>
                <div className={S["volume-item"]}>
                  <div>24시간 거래대금</div>
                  <PriceNumber
                    num={tokenInfo.market_data.total_volume[currency]}
                    currency={currency}
                  />
                </div>
              </div>
            </div>
          </div>

          <PriceCalculator
            symbol={tokenInfo.symbol}
            price={tokenInfo.market_data.current_price[currency]}
            currency={currency}
          />

          {(tokenInfo.description.ko || tokenInfo.description.en) && (
            <button
              className={S["description-button"]}
              onClick={() => setShowDescription((p) => !p)}
            >
              {`설명보기 ${showDescription ? "▲" : "▼"}`}
            </button>
          )}
          {showDescription && (
            <div className={S.description}>
              {tokenInfo.description.ko ?? tokenInfo.description.en}
            </div>
          )}
        </div>
      )}
    </>
  );
};
