# 250204 강의 요약

## React Router
- React 애플리케이션에서 클라이언트 라우팅을 담당하는 라이브러리
- 브라우저의 URL 기반으로 특정 컴포넌트 렌더링 할 수 있게 함

## API 요청 플로우
- View -> Hooks -> Query Library(optional) -> Fetcher -> API server

## React-Hook-Form
- React에서 Form을 관리하는 라이브러리로 성능을 최적화하고 불필요한 리렌더링을 줄이는 것을 특징으로 함
- register: 입력 필드를 등록하여 React-Hook-Form과 연결
- handleSubmit: 폼 제출 시 실행되는 핸들러 함수
- errors: 입력값 검증을 위한 에러 객체
- watch: 특정 입력 필드의 값을 실시간 감시
- reset: 폼 데이터를 초기화