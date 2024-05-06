# Crypto Dashboard

## Requirements

- node.js v20.11.1
- yarn v1.22.19
- react v18.2.0
- typescript v5.2.2
- vite v5.2.0

## Run Project

```sh
# production mode
yarn start

# development mode
# CoinGecko API 대신 더미데이터를 사용
yarn start:dev
```

## Directories

- src
  - \_dummy
    - 더미 데이터 디렉토리
  - components
    - 여러 페이지에서 앱 전반에 걸쳐 사용하는 컴포넌트
  - hooks
    - useBookmark : 북마크 정보를 local storage 에서 관리 하기 위한 훅
  - routes
    - 앱의 라우팅 정보
  - utils
    - 컴포넌트가 아닌 유틸성 코드
  - views
    - 각 페이지의 구현체

## Dependencies

- axios
  - fetch 시 param 설정 등의 가독성을 높이기 위해 사용
- clsx
  - className 설정을 편리하게 하기 위한 유틸리티

## Process

ContextProvider를 이용해 전체 앱에 같은 bookmark state를 제공하고, 이를 local storage에 저장하여 관리합니다.

라이브러리 의존성을 줄여보기 위하여 tanstack-query, redux, zustand, mui 등의 상태관리, UI 라이브러리 사용을 최대한 피했습니다.

이에 따라, MUI UI 컴포넌트를 사용하여 빠르게 페이지를 구축한 후,
라이브러리 의존성을 줄이기 위하여 기본 HTML 태그와 CSS로 대체하여 개발하였습니다.
