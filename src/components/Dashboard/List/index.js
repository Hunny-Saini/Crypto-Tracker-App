import React from 'react';
import "./style.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import Tooltip from '@mui/material/Tooltip';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';
import { hasBeenAdded } from '../../../functions/hasBeenAdded';
import { useState } from 'react';
import { addToWatchlist } from '../../../functions/addToWatchlist';
import { removeFromWatchlist } from '../../../functions/removeFromWatchlist';
import { IconButton } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { motion } from "framer-motion";

const List = ({coin,isWatchlistPage}) => {
    const [added, setAdded] = useState(hasBeenAdded(coin.id));
  return (
    <Link to={`/coin/${coin.id}`}>
        <motion.tr 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{  duration: 0.5, delay:0.5 }}
        className={'list-row'} 
        style={{ display: isWatchlistPage && !added && "none" }}
        >
            <Tooltip title="Coin Logo" placement='bottom-start'>
            <td className='td-image'>
                <img src={coin.image} alt='coin' className='coin-logo'/>
            </td>
            </Tooltip>
            <Tooltip title="Coin Info" placement='bottom-start'>
            <td>
                <div className='name-col'>
                    <p className='coin-symbol td-text'>{coin.symbol}</p>
                    <p className='coin-name td-text'>{coin.name}</p>
                </div>
            </td>
            </Tooltip>
            <Tooltip title="Price Change In 24 hrs" placement='bottom-start'>
            {coin.price_change_percentage_24h > 0 ? <td className='chip-flex'>
                <div className='price-chip td-text'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip'>
                    <TrendingUpRoundedIcon />
                </div>
            </td> : 
            <td className='chip-flex'>
                <div className='price-chip chip-red td-text'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-chip chip-red'>
                    <TrendingDownRoundedIcon />
                </div>
            </td>}
            </Tooltip>
            <Tooltip title="Current Price" >
            <td>
                <h3 className='coin-price td-center-align td-text' 
                    style={{
                        color: 
                        coin.price_change_percentage_24h > 0 
                        ? "var(--green)" 
                        : "var(--red)"
                    }}
                >
                    ${coin.current_price.toLocaleString()}
                </h3>
            </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement='bottom'>
            <td className='desktop-total-vol'>
                <p className='total-volume td-right-align td-text'>
                    ${coin.total_volume.toLocaleString()}
                </p>
            </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement='bottom'>
            <td className='mobile-total-vol'>
                <p className='total-volume td-right-align td-text'>
                    ${convertNumber(coin.total_volume)}
                </p>
            </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement='bottom'>
            <td className='desktop-td-mkt'>
                <p className='market-cap td-right-align td-text'>
                    ${coin.market_cap.toLocaleString()}
                </p>
            </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement='bottom'>
            <td className='mobile-td-mkt '>
                <p className='market-cap td-right-align td-text'>
                    ${convertNumber(coin.market_cap)}
                </p>
            </td>
            </Tooltip>
            <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            if (added) {
                                removeFromWatchlist(coin.id);
                                setAdded(false);
                            } else {
                                addToWatchlist(coin.id);
                                setAdded(true);
                            }
                        }}
                    >
                    {added ? (
                        <div className={`icon-chip watchlist-icon ${coin.price_change_percentage_24h < 0 && "chip-red"
                            }`}>
                            <StarRoundedIcon
                                sx={{ fontSize: "2rem !important" }} />
                        </div>
                    ) : (
                        <div className={`icon-chip watchlist-icon ${coin.price_change_percentage_24h < 0 && "chip-red"
                            }`} style={{display: "flex"}}>
                            <StarBorderRoundedIcon
                                sx={{ fontSize: "2rem !important" }} />
                        </div>
                    )}
                    </IconButton>
        </motion.tr>
    </Link>
  )
}

export default List;