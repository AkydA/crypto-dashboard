export type TokenDetailInfo = {
  name: string;
  symbol: string;
  image: {
    small: string;
  };
  localization: {
    ko: string;
    en: string;
  };
  links: {
    homepage: string[];
  };
  description: {
    ko: string;
    en: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      krw: number;
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_24h_in_currency: {
      krw: number;
      usd: number;
    };
    market_cap: {
      krw: number;
      usd: number;
    };
    total_volume: {
      krw: number;
      usd: number;
    };
  };
};

export const nullTokenDetailInfo: TokenDetailInfo = {
  name: "",
  symbol: "",
  image: {
    small: "",
  },
  localization: {
    ko: "",
    en: "",
  },
  links: {
    homepage: [""],
  },
  description: {
    ko: "",
    en: "",
  },
  market_cap_rank: 0,
  market_data: {
    current_price: {
      krw: 0,
      usd: 0,
    },
    price_change_percentage_24h: 0,
    price_change_percentage_24h_in_currency: {
      krw: 0,
      usd: 0,
    },
    market_cap: {
      krw: 0,
      usd: 0,
    },
    total_volume: {
      krw: 0,
      usd: 0,
    },
  },
};
