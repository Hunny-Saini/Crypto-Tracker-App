import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import CoinPage from './pages/CoinPage';
import ComparePage from './pages/ComparePage';
import WatchList from './pages/WatchList';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';


function App() {

  var cursor;
  var cursorPointer;

  useEffect(() => {
    cursor = document.getElementById("cursor");
    cursorPointer = document.getElementById("cursor-pointer");

    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursor.style.left = e.clientX + "px"),
        (cursor.style.top = e.clientY + "px"),
        (cursorPointer.style.left = e.clientX + "px"),
        (cursorPointer.style.top = e.clientY + "px")
      );
    });

    document.body.addEventListener("mousedown", function (e) {
      return (
        (cursor.style.height = "0.5rem"),
        (cursor.style.width = "0.5rem"),
        (cursorPointer.style.height = "3rem"),
        (cursorPointer.style.width = "3rem")
      );
    });

    document.body.addEventListener("mouseup", function (e) {
      return (
        (cursor.style.height = "0.3rem"),
        (cursor.style.width = "0.3rem"),
        (cursorPointer.style.height = "2rem"),
        (cursorPointer.style.width = "2rem")
      );
    });
  }, []);

  return (
    <div className="App">
      <div className="cursor" id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/coin/:id' element={<CoinPage />} />
            <Route path='/compare' element={<ComparePage />} />
            <Route path='/watchlist' element={<WatchList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
