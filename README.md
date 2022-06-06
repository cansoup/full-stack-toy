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

### server

- nodemon: 파일이 변경될 때마다 서버를 다시 띄워주는 역할을 수행   
  nodemon.js 어떤 것들을 감지해서 변경사항을 반영할지 또는 무시할지(새로고침을 하지 않을지) 설정할 수 있고, 환경정보도 설정할 수 있다.
- nodeJS에서는 기본적으로 es6에서 제공하는 모듈 문법을 사용할 수 없다.
  package.json에 `"type": "module"`을 사용하면 모듈 문법을 사용 가능 하다.

## 0530

### express

- [공식문서](https://expressjs.com/ko/)
- Node.js 웹 애플리케이션 프레임워크
- Node 자체가 다른 일반적인 웹 개발 기능을 지원하지 않는다. 만약 다른 HTTP 패턴(get, post, delete 등)에 대한 특정 처리를 추가하려면 서로 다른 URL 경로(routes)를 사용하여 요청을 개별적으로 처리, 정적 파일을 제공, 템플릿을 사용하여 동적으로 응답을 생성할 수 있으며, 코드를 직접 작성할 필요가 생기게 된다. 하지만 기본적인 것들을 직접 구현하는 작업을 피하고 웹 프레임 워크를 사용할 수 있다 => express의 역할 (출처: mdn)
- server/package.json에서 start 명령어가 실행될 때 nodemon에서 `src/index.js`를 노드 명령어로 실행하도록 하면서 express가 구동이 되고, 이 때 localhost 8000을 구독을 하는 상태가 된다.

### uuid

- Universally Unique Identifier
- UUID를 생성해주는 라이브러리
- v4: 랜덤값 기반

### json 주의사항

- stringfy -> parse 할 때 숫자형은 숫자형으로 변환해주는데 url에서 들어오는 값은 문자열이니 주의할 것

### 더미 데이터

[링크](https://github.com/faker-js/faker)