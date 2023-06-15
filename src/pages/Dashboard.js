import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';
import Footer from '../components/Common/Footer';


const Dashboard = () => {

  let [coins, setCoins] = useState([]);
  let [paginatedCoins, setPaginatedCoins] = useState([]);
  let [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10))
  };

  function onSearchChange(e) {
    setSearch(e.target.value)
  }

  let filterdCoin = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())
    || item.symbol.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const myCoins = await get100Coins();
    if (myCoins) {
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice((page - 1) * 10, (page - 1) * 10 + 10));
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filterdCoin : paginatedCoins} />
          {!search && <PaginationComponent page={page} handlePageChange={handlePageChange} />}
        </div>
      )}
      <Footer />
    </>
  )
}

export default Dashboard;