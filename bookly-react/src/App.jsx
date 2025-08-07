import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import BookDetails from "./pages/BookDetails/BookDetails";
import Authors from "./pages/Authors/Authors";
import AuthorDetails from "./pages/AuthorDetails/AuthorDetails";
import Categories from "./pages/Categories/Categories";
import Search from "./pages/Search/Search";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Footer from "./pages/Footer/Footer";
import CategoryBook from "./pages/CategoryBook/CategoryBook";
import ReadingList from "./pages/ReadingList/ReadingList";
import AdminHome from "./pages/AdminHome/AdminHome";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Auth/Action";


function App() {
  const location = useLocation()
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log("auth: ", auth);

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  return (


    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryBook />} />
          <Route path="/readinglist" element={<ReadingList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-home" element={<AdminHome />} />
        </Routes>
      </main>
      <Footer/>
    </div>

  );
}

export default App;
