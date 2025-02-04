import React, { useState, useContext } from 'react';
import './App.css';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components';
import { getTheme, light, ThemeName } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: <div>도서 목록</div>
  },
  {
    path: "signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    )
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
        <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}


export default App;
