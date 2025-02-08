# 250206 이동균 과제

## 오늘 작성한 코드들 모음
```
// carts.api.ts
import { httpClient } from "./http";

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post("/carts", params);
  return response.data;
};


// LikeButton.tsx
import React from 'react'
import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

function LikeButton({ book, onClick }: Props) {
  return (
    <LikeButtonStyle
      size="medium"
      scheme={book.liked ? "like" : "normal"}
      onClick={onClick}
    >
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;
  }
`;

export default LikeButton;

// ElipsisBox.tsx
import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';
import styled from "styled-components";
import Button from './Button';

interface Props {
  children: React.ReactNode;
  lineLimit: number;
}

function EllipsisBox({ children, lineLimit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxStyle lineLimit={lineLimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : "펼치기"} <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}


interface EllipsisBoxStyleProps {
    lineLimit: number;
    $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ lineLimit, $expanded }) =>
        ($expanded ? "none" : lineLimit)};
    -webkit-box-orient: vertical;
    padding: 20px 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;

    svg {
        transform: ${({ $expanded }) =>
        $expanded ? "rotate(180deg)" : "rotate(0)"};
    }
  }
`;

export default EllipsisBox;


// BookDetail.tsx
import React from 'react'
import { getImgSrc } from "../utils/image";
import { Link, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import styled from "styled-components";
import Title from '../components/common/title';
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from '../utils/format';
import LikeButton from '../components/book/LikeButton';

const bookInfoList = [
    {
        label: "카테고리",
        key: "categoryName",
        filter: (book: IBookDetail) => (
            <Link to={`/books?category_id=${book.category_id}`}>{book.categoryName}</Link>
        ),
    },
    {
        label: "포맷",
        key: "form",
    },
    {
        label: "페이지",
        key: "pages",
    },
    {
        label: "ISBN",
        key: "isbn",
    },
    {
        label: "발행일",
        key: "pubDate",
        filter: (book: IBookDetail) => {
            return formatDate(book.pubdate);
        },
    },

    {
        label: "가격",
        key: "price",
        filter: (book: IBookDetail) => {
            return `${formatNumber(book.price)} 원`;
        },
    }
];

function BookDetail() {
    const { bookId } = useParams();
    const { book, likeToggle } = useBook(bookId);

    console.log(book);
    if (!book) return null;

    return (
    <BookDetailStyle>
        <header className="header">
        <div className="img">
            <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
            <Title size="large" color="text">
            {book.title}
            </Title>
            
            {bookInfoList.map((item) => (
                <dl>
                <div key={item.key}>
                <dt>{item.label}</dt>
                <dd>
                    {item.filter ? item.filter(book) : book[item.key as keyof IBookDetail]}
                </dd>
                </div>
                </dl>
            ))}
            <p className="summary">{book.summary}</p>
            <div className="like">
                <LikeButton book={book} onClick={likeToggle} />
            </div>
            <div className="add-cart">장바구니 넣기</div>
        </div>
        </header>
        <div className="content">
            <Title size="medium">상세 설명</Title>
            <p className="detail">{book.detail}</p>

            <Title size="medium">목차</Title>
        <p className="index">{book.contents}</p>
        </div>
    </BookDetailStyle>
);

}

const BookDetailStyle = styled.div`
    .header {
        display: flex;
        align-items: start;
        gap: 24px;
        padding: 0 0 24px 0;
    }

    .img {
        flex: 1;
        img {
            width: 100%;
            height: auto;
        }
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;

        dl {
            display: flex;
            margin: 0;

            dt {
            width: 80px;
            color: ${({ theme }) => theme.color.secondary};
            }

            dd {
            color: ${({ theme }) => theme.color.primary};
            }
        }
    }

    .content {
        .detail {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
    }

`;

export default BookDetail;

```