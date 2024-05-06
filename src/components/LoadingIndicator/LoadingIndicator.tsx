import S from "./LoadingIndicator.module.scss";

export const LoadingIndicator = () => {
  return (
    <div className={S["loading-indicator"]}>
      <div className={S.loader}></div>
      로딩 중입니다..
    </div>
  );
};
