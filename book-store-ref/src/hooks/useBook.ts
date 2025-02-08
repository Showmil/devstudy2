import React, { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook} from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import AddToCart from "../components/books/AddToCart";
import { addCart } from "../api/carts.api";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCardAdded] = useState(false);
    const { isloggedIn } = useAuthStore();
    const showAlert = useAlert();

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
        });
    } else {
        // 언라이크 상태 -> 라이크 실행
        likeBook(book.id).then(() => {
        setBook({
            ...book,
            liked: true,
            likes: book.likes + 1,
        });
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
    }, [bookId]);

    return { book, likeToggle, addToCart, cartAdded };
};
