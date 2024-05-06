import clsx from "clsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import S from "./Home.module.scss";

export const Home = () => {
  const { pathname } = useLocation();
  const isBookmarkList = pathname.includes("bookmark");
  const navigate = useNavigate();

  return (
    <div className={S.home}>
      <div className={S["gnb-wrapper"]}>
        <button
          className={clsx(S["gnb-button"], { [S.selected]: !isBookmarkList })}
          onClick={() => navigate("/token-list")}
        >
          가상자산 시세 목록
        </button>
        <button
          className={clsx(S["gnb-button"], { [S.selected]: isBookmarkList })}
          onClick={() => navigate("/bookmark-token-list")}
        >
          북마크 목록
        </button>
      </div>

      <Outlet />
    </div>
  );
};
