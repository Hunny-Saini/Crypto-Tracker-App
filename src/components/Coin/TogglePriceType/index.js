import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./style.css";

export default function TogglePriceType({priceType,handlePriceTypeChange}) {
    

    return (
        <div className='toggle-prices'>
            <ToggleButtonGroup
                color="primary"
                value={priceType}
                exclusive
                onChange={handlePriceTypeChange}
                sx={{
                    "&.Mui-selected, &.Mui-selected:hover": {
                        color: "#3a80e9 !important",
                        backgroundColor: "#3a80e9",
                    },
                    borderColor: "#3a80e9",
                    border: "unset !important",
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "1px solid !important",
                        borderColor: "unset",
                        color: "#3a80e9",
                    },
                    "& .MuiToggleButton-standard": {
                        color: "#3a80e9",
                    },
                }}
            >
                <ToggleButton value="prices" className='toggle-btn'>PRICE</ToggleButton>
                <ToggleButton value="market_caps" className='toggle-btn'>MKT CAP</ToggleButton>
                <ToggleButton value="total_volumes" className='toggle-btn'>VOLUME</ToggleButton>
            </ToggleButtonGroup>
        </div>

    );
}