import { createBrowserRouter } from "react-router-dom";

import { Error } from "~/views/Error";
import { Home } from "~/views/Home";
import { TokenBookmarkedListPanel } from "~/views/Home/TokenBookmarkedListPanel";
import { TokenListPanel } from "~/views/Home/TokenListPanel";
import { TokenDetails } from "~/views/TokenDetails";
import { Unknown } from "~/views/Unknown";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/token-list?", element: <TokenListPanel /> },
      { path: "/bookmark-token-list", element: <TokenBookmarkedListPanel /> },
    ],
  },
  {
    path: "/token/:tokenId",
    element: <TokenDetails />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/*",
    element: <Unknown />,
  },
]);
