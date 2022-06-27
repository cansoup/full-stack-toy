import { useRef } from 'react';
// 리액트 쿼리를 위한 리액트 쿼리 초기화
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import './index.scss'


// next가 서버사이드 렌더링을 하기 위해서 필요한 컴포넌트
const App = ({ Component, pageProps }) => {
  // 최초에 한 번만 작성을 하고 이후에 재활용할 수 있게끔 useRef 활용
  const clientRef = useRef(null);
  const getClient = () => {
    if(!clientRef.current) clientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 윈도우에 포커스가 잡힐때마다 refetch
        }
      }
    });
    return clientRef.current;
  }

  return (
    <QueryClientProvider client={getClient()}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

// ctx = context
// 각 컴포넌트 별로 getInitalProps가 정의되어 있을 때 컨텍스트를 파라미터로 넘겨서 
// 그에 대해 return 받은 pageProps를 넘겨주고
// 이 pageProps로 각각의 컴포넌트들을 구성해주는 형태
App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return { pageProps }
}

export default App;