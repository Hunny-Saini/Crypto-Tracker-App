import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider, createTheme } from '@mui/material';
import "./style.css";
import Grid from '../Grid';
import List from '../List';

export default function TabsComponent({coins, isWatchlistPage}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
        primary: {
            main : "#3a80e9",
        }
    }
  });

  const style = {
    color: "var(--white)",
    width : "50vw",
    fontSize : "1.2rem",
    fontWeight : 600,
    fontFamily : "Inter",
    textTransform : "capitalize"
  };

  return (
    <div>
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <div>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="Grid" value="grid" sx={style}/>
                    <Tab label="List" value="list" sx={style}/>
                </TabList>
                </div>
                <TabPanel value="grid">
                    <div className='grid-flex'>
                        {coins.length !== 0 ? (coins.map((value,index)=>{
                            return <Grid coin={value} key={index} isWatchlistPage={isWatchlistPage}/>
                        })) : (<p>No Crypto Currencies Found</p>)}
                    </div>
                </TabPanel>
                <TabPanel value="list">
                  <table className='list-table'>
                    {coins.length !== 0 ? coins.map((value,index)=>{
                      return <List coin={value} key={index} isWatchlistPage={isWatchlistPage}/>
                    }) : (<p>No Crypto Currencies Found</p>)}
                  </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    </div>
  );
}