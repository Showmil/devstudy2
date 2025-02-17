import React, { useEffect, useState } from "react";
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook} from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import AddToCart from "../components/books/AddToCart";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCardAdded] = useState(false);
    const [reviews, setReview] = useState<BookReviewItem[]>([]);

    const { isloggedIn } = useAuthStore();
    const { showAlert } = useAlert();

    const { showToast } = useToast();

    const likeToggle = () => {
        // 로그인 확인
        if (!isloggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }

        if (!book) return;

        if (book.liked) {
            // 라이크 상태 -> 언라이크 실행
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
                showToast("좋아요가 취소되었습니다.");
            });
        } else {
            // 언라이크 상태 -> 라이크 실행
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                });
                showToast("좋아요가 성공했습니다.");
            });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;
        addCart({
            bookId: book.id,
            quantity: quantity,
        }).then(() => {
            setCardAdded(true);
            setTimeout(() => {
                setCardAdded(false);
            }, 3000);
        });
    };


    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => {
            setBook(book);
        });

        fetchBookReview(bookId).then((reviews) => {
            setReview(reviews)
        })
    }, [bookId]);

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;

        addBookReview(book.id.toString(), data).then((res) => {
            showAlert(res.message);
        });
    };

    return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
