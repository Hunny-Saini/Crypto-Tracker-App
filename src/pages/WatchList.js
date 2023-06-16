import React from 'react'
import Header from '../components/Common/Header';
import { useState } from 'react';
import { get100Coins } from "../functions/get100Coins";
import { useEffect } from 'react';
import Loader from '../components/Common/Loader';
import Button from '../components/Common/Button';
import TabsComponent from '../components/Dashboard/Tabs';
import { Link } from 'react-router-dom';

const WatchList = () => {

  const coins = JSON.parse(localStorage.getItem("watchlist"));
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setisLoading(true);
    const allCoins = await get100Coins();
    if (coins) {
      setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
    }
    setisLoading(false);
  };

  return (
    <div>
      {isLoading  ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {myWatchlist?.length === 0 || !coins ? (
            <div>
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/dashboard">
                  <Button text={"Dashboard"} onClick={() => console.log("Clicked")} outlined={false}/>
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <Header />
              <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WatchList;