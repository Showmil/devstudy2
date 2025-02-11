# 250211 강의 요약

## useNavigate
- 컴포넌트 내부에서 버튼 클릭이나 특정 이벤트에 반응하여 다른 페이지로 이동할 때 사용한다.
- 사용 방법
```
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  // navigate 함수 반환
  const navigate = useNavigate();

  const handleNavigation = () => {
    // '/home' 경로로 이동합니다.
    navigate('/home');
  };

  return (
    <button onClick={handleNavigation}>
      홈으로 이동
    </button>
  );
}
```
- state 옵션을 이용하면 추가적인 데이터를 함께 전달할 수 있다. 이 데이터는 이동 대상 컴포넌트에서 useLocation 훅을 통해 확인 가능하다.
```
navigate('/dashboard', { state: { from: 'login' } });
```

## useLocation
- 현재 브라우저의 URL과 관련된 정보를 담은 객체를 반환한다.
- 주요 속성
1. pathname : 현재 경로(/home, /about 등)
2. search : URL에 포함된 쿼리 스트링
3. hash : URL의 해시값
4. state : 네비게이션 시 전달된 임의의 상태 값. 브라우저 히스토리 스택에 저장되므로 페이지 새로고침 시 사라질 수 있음.


## 정리
- useNavigate : 프로그램 방식의 경로 이동 제어
- useLocation : 현재 URL과 관련된 정보를 획득