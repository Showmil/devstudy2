# 250120 강의 요약

## npm vs npx
- npm : Node.js 패키지를 **관리**하기 위한 도구. 예 : npm install <패키지이름> => 패키지 설치 / npm install : package.json에 정의된 모든 의존성 설치
- npx : Node.js 패키지를 실행하기 위한 도구. 예 : npx create-react-app : create-react-app을 설치하지 않고 바로 실행

## npm init vite
- Vite가 제공하는 기본 템플릿을 다운로드하고 프로젝트 디렉토리 생성

## Slice
- 특정 상태와 그 상태를 변경하는 로직을 하나로 묶어 관리하는 방법

## Reducer
- 상태를 변경하는 순수 함수

## Store
- 모든 애플리케이션 상태를 저장하는 중앙 저장소

## Provider
- React 애플리케이션에 Redux 스토어를 제공하기 위한 컴포넌트