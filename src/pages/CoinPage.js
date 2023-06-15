import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { convertObject } from '../functions/convertObject';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import TogglePriceType from '../components/Coin/TogglePriceType';
import Footer from '../components/Common/Footer';

const CoinPage = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    let [chartData, setChartData] = useState({});
    const [priceType, setPriceType] = useState('prices');

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        setIsLoading(true);
        const data = await getCoinData(id);
        if (data) {
            convertObject(setCoinData, data);
            const prices = await getCoinPrices(id, days, priceType)
            if (prices.length > 0) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value,priceType);
        if (prices.length > 0) {
            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices = await getCoinPrices(id, days,event.target.value);
        if (prices.length > 0) {
            settingChartData(setChartData, prices);
            setIsLoading(false);
        }
    };

    return (

        <div>
            <Header />
            {isLoading ? (<Loader />) : (
                <>
                    <div className='grey-wrapper'>
                        <List coin={coinData} />
                    </div>
                    <div className='grey-wrapper'>
                        <SelectDays days={days} handleDaysChange={handleDaysChange} />
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                        <LineChart chartData={chartData} priceType={priceType}/>
                    </div>
                    <div className='grey-wrapper'>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </div>
                </>
            )}
            <Footer />
        </div>
    )
}

export default CoinPage;