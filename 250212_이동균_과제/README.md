## React로 제작한 웹 사이트 모바일에 대응시키기
- HTML 메타 태그 설정 : 모바일 기기에서 올바른 화면 크기와 스케일로 웹 페이지가 보이도록 하려면 HTML의 <head>부분에 viewport 메타 태그를 추가해야 한다.
```<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- CSS 미디어 쿼리 활용 : 화면 크기나 해상도에 따라 다른 스타일을 적용할 수 있게 해주는 CSS 기능이다.
```
/* 기본 스타일 */
.container {
  width: 80%;
  margin: 0 auto;
}

/* 화면 폭이 768px 이하일 때 적용 */
@media (max-width: 768px) {
  .container {
    width: 95%;
    padding: 10px;
  }
}

```

- React-Bootstrap, Material-UI, Ant Design 등 UI 라이브러리를 이용해 모바일 대응 웹 개발을 쉽게 할 수 있다.
```
import { Container, Row, Col } from 'react-bootstrap';

function MyResponsiveComponent() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          {/* 모바일에서는 12칸, 데스크톱에서는 8칸 */}
          콘텐츠 A
        </Col>
        <Col xs={6} md={4}>
          콘텐츠 B
        </Col>
      </Row>
    </Container>
  );
}
```
- ~~375 x 667로 두고 설계하면 편하다.~~