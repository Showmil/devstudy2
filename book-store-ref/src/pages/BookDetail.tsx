import React, { useState } from 'react'
import { getImgSrc } from "../utils/image";
import { Link, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import styled from "styled-components";
import Title from '../components/common/Title';
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from '../utils/format';
import LikeButton from '../components/book/LikeButton';
import BookReview from '@/components/book/BookReview';
import { Tabs, Tab } from '@/components/common/Tabs';
import EllipsisBox from '@/components/common/ElipsisBox';
import Modal from '@/components/common/Modal';

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
    const { book, likeToggle, reviews, addReview } = useBook(bookId);

    const [isImgOpen, setIsImgOpen] = useState(false);

    if (!book) return null;

    return (
        <BookDetailStyle>
            <header className="header">
                <div className="img" onClick={() => setIsImgOpen(true)}>
                    <img src={getImgSrc(book.img)} alt={book.title} />
                </div>

                <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
                    <img src={getImgSrc(book.img)} alt={book.title} />
                </Modal>

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
                <Tabs>
                    <Tab title="상세 설명">
                        <Title size="medium">상세 설명</Title>
                        <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
                    </Tab>
                    <Tab title="목차">
                        <Title size="medium">목차</Title>
                        <p className="index">{book.contents}</p>
                    </Tab>
                    <Tab title="리뷰">
                        <Title size="medium">리뷰</Title>
                        <BookReview reviews={reviews} onAdd={addReview} />
                    </Tab>
                </Tabs>
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
    
    > div {
        position: relative !important;
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
