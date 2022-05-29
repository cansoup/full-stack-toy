import './index.scss'

// next가 서버사이드 렌더링을 하기 위해서 필요한 컴포넌트
const App = ({ Component, pageProps }) => <Component {...pageProps} />

// ctx = context
// 각 컴포넌트 별로 getInitalProps가 정의되어 있을 때 컨텍스트를 파라미터로 넘겨서 
// 그에 대해 return 받은 pageProps를 넘겨주고
// 이 pageProps로 각각의 컴포넌트들을 구성해주는 형태
App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return { pageProps }
}

export default App;