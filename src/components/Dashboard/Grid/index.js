import React, { useState } from 'react';
import "./style.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link } from 'react-router-dom';
import { hasBeenAdded } from "../../../functions/hasBeenAdded";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";

const Grid = ({ coin, isWatchlistPage }) => {
    const [added, setAdded] = useState(hasBeenAdded(coin.id));

    return (

        <Link to={`/coin/${coin.id}`}>
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{  duration: 0.5, delay:0.5 }}
            className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`} style={{ display: isWatchlistPage && !added && "none" }}>
                <div className='info-flex-container'>
                    <div className='info-flex'>
                        <img src={coin.image} alt='coin' className='coin-logo' />
                        <div className='name-col'>
                            <p className='coin-symbol'>{coin.symbol}</p>
                            <p className='coin-name'>{coin.name}</p>
                        </div>

                    </div>
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            if (added) {
                                if(removeFromWatchlist(coin.id)){
                                    setAdded(false);
                                }
                            } else {
                                addToWatchlist(coin.id);
                                setAdded(true);
                            }
                        }}
                    >
                    {added ? (
                        <div className={`icon-chip ${coin.price_change_percentage_24h < 0 && "chip-red"
                            }`}>
                            <StarRoundedIcon
                                sx={{ fontSize: "2rem !important" }} />
                        </div>
                    ) : (
                        <div className={`icon-chip ${coin.price_change_percentage_24h < 0 && "chip-red"
                            }`}>
                            <StarBorderRoundedIcon
                                sx={{ fontSize: "2rem !important" }} />
                        </div>
                    )}
                    </IconButton>
                </div>


                {coin.price_change_percentage_24h > 0 ? <div className='chip-flex'>
                    <div className='price-chip'>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className='icon-chip'>
                        <TrendingUpRoundedIcon />
                    </div>
                </div> :
                    <div className='chip-flex'>
                        <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip chip-red'>
                            <TrendingDownRoundedIcon />
                        </div>
                    </div>}
                <div className='info-container'>
                    <h3 className='coin-price'
                        style={{
                            color:
                                coin.price_change_percentage_24h > 0
                                    ? "var(--green)"
                                    : "var(--red)"
                        }}
                    >
                        ${coin.current_price.toLocaleString()}
                    </h3>
                    <p className='total-volume'>
                        Total Volume : ${coin.total_volume.toLocaleString()}
                    </p>
                    <p className='market-cap'>
                        Market Cap : ${coin.market_cap.toLocaleString()}
                    </p>
                </div>
            </motion.div>
        </Link>
    )
}

export default Grid;