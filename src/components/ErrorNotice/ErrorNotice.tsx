import React from "react";
import { useNavigate } from "react-router-dom";

import S from "./ErrorNotice.module.scss";

interface ErrorNoticeProps {
  msg: string;
}

export const ErrorNotice: React.FC<ErrorNoticeProps> = ({ msg }) => {
  const navigate = useNavigate();

  return (
    <div className={S["error-notice"]}>
      <div className={S.loader}></div>
      {msg}
      <button className={S["back-button"]} onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
      <button className={S["back-button"]} onClick={() => navigate(-1)}>
        이전 페이지로 돌아가기
      </button>
    </div>
  );
};
