import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDays';
import { getCoinData } from '../functions/getCoinData';
import { convertObject } from '../functions/convertObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import Loader from '../components/Common/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { settingChartData } from '../functions/settingChartData';
import LineChart from '../components/Coin/LineChart';
import TogglePriceType from '../components/Coin/TogglePriceType';
import Footer from '../components/Common/Footer';

const ComparePage = () => {

    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [crypto1Data, setCrypto1Data] = useState({});
    const [crypto2Data, setCrypto2Data] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [priceType, setPriceType] = useState("prices");
    const [chartData,setChartData] = useState({});

    const [days, setDays] = useState(30);

    async function handleDaysChange(event) {
        setIsLoading(true);
        setDays(event.target.value)
        const prices1 = await getCoinPrices(crypto1, event.target.value, "prices");
        const prices2 = await getCoinPrices(crypto2, event.target.value, "prices");
        settingChartData(setChartData, prices1,prices2);
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        setIsLoading(true);
        const data1 = await getCoinData(crypto1);
        const data2 = await getCoinData(crypto2);
        if (data1) {
            convertObject(setCrypto1Data, data1);
        }

        if (data2) {
            convertObject(setCrypto2Data, data2);
        }

        if (data1 && data2) {
            const prices1 = await getCoinPrices(crypto1, days, "prices");
            const prices2 = await getCoinPrices(crypto2, days, "prices");
            if (prices1.length > 0 && prices2.length > 0) {
                settingChartData(setChartData, prices1,prices2);
                // console.log("prices fetched >", prices1, prices2);
                setIsLoading(false);
            }
        }
    }

    const handleCoinChange = async (event, isCoin2) => {
        if (isCoin2) {
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
            convertObject(setCrypto2Data, data);
            // console.log(crypto2Data);

            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);

            if (prices1.length > 0 && prices2.length > 0) {
                // settingChartData(setChartData, prices);
                console.log("prices fetched >", prices1, prices2);
                setIsLoading(false);
            }
        } else {
            setCrypto1(event.target.value);
            const data = await getCoinData(event.target.value);
            convertObject(setCrypto1Data, data);
            // console.log(crypto1Data);
        }

    };

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices1 = await getCoinPrices(crypto1, days, event.target.value);
        const prices2 = await getCoinPrices(crypto2, days, event.target.value);
        settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);
    };

    return (

        <div>
            <Header />
            {isLoading ? (<Loader />) : (
                <>
                    <div className='coins-days-flex'>
                        <SelectCoins crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange} />
                        <SelectDays days={days} handleDaysChange={handleDaysChange} noPTag={true} />
                    </div>
                    <div className='grey-wrapper'>
                        <List coin={crypto1Data} />
                    </div>
                    <div className='grey-wrapper'>
                        <List coin={crypto2Data} />
                    </div>
                    <div className='grey-wrapper' style={{paddingTop:"0.5rem"}}>
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                    </div>
                    <div className='grey-wrapper'>
                        <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
                    </div>
                    <div className='grey-wrapper'>
                        <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
                    </div>
                </>
            )}
            <Footer />
        </div>
    )
}

export default ComparePage;