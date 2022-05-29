# full-stack-toy

graphQL사용하여 풀스택 구현해보기

## 0525

### package.json 설정

- package.json에서 `workspace`를 사용하려면 `private: true`로 설정되어 있어야 한다.

### next.js

- React로 만드는 서버사이드 렌더링 프레임워크

## 0529

- yarn run start하면 에러 나는데 왜그러는거임?
  : 서버사이드 렌더링에서 값이 다르다는 오류라서 무시해도 된대요... 해결방법 없나? 빨간 거 보기 싫어~
  
>Warning: Text content did not match. Server: "jay" Client: "roy"
    at h3
    at li
    at MsgItem (webpack-internal:///./components/MsgItem.jsx:7:24)
    at ul
    at MsgList
    at Home
    at App (webpack-internal:///./pages/_app.jsx:71:27)
    at ErrorBoundary (webpack-internal:///../node_modules/next/dist/compiled/@next/react-dev-overlay/client.js:8:20746)
    at ReactDevOverlay (webpack-internal:///../node_modules/next/dist/compiled/@next/react-dev-overlay/client.js:8:23395)
    at Container (webpack-internal:///../node_modules/next/dist/client/index.js:323:9)
    at AppContainer (webpack-internal:///../node_modules/next/dist/client/index.js:825:26)
    at Root (webpack-internal:///../node_modules/next/dist/client/index.js:949:27)
> Hydration failed because the initial UI does not match what was rendered on the server.

- MsgInput: create, MsgItem: update => 하나로 일괄 하기 위한 메서드 `mutate`
- 상위에서 `mutate`를 내려주면 호출하게끔
- MsgInput onCreate: text만 받아서 새로운 데이터를 맨 꼭대기에 추가
- `.unshift`: 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 return 한다.
