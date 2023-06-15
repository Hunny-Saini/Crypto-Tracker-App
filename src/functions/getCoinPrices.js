import axios from "axios";

export const getCoinPrices = (id,days,priceType) => {
    // console.log(days);
    const prices =  axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
        .then((res)=>{
            // console.log(res.data);
             return res.data[priceType];
        })
        .catch((error)=>{
            console.log("Error",error);
        });
    return prices;
}