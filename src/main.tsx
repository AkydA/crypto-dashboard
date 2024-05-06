import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { BookmarkProvider } from "~/hooks/useBookmark";
import { router } from "~/routes/router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BookmarkProvider>
      <RouterProvider router={router} />
    </BookmarkProvider>
  </React.StrictMode>
);
