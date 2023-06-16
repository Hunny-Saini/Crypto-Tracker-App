import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from "react-toastify";


export default function TemporaryDrawer() {
    const [open, setOpen] = useState(false);

      useEffect(() => {
        if (localStorage.getItem("theme") == "light") {
          setLight();
        } else {
          setDark();
        }
      }, []);

      const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") == "dark" ? true : false
      );
    
      const changeMode = () => {
        setDarkMode(!darkMode);
        toast.success("Theme Changed!");
        const mode = localStorage.getItem("theme");
        if (mode == "dark") {
          setLight();
        } else {
          setDark();
        }
      };
    
      const setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
      };
    
      const setLight = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
      };  


    return (

        <div>


            <IconButton onClick={() => setOpen(true)}>
                <MenuRoundedIcon className='link' />
            </IconButton>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className='drawer-div'>
                    <Link to='/'>
                        <p className='link'>Home</p>
                    </Link>
                    <Link to='/compare'>
                        <p className='link'>Compare</p>
                    </Link>
                    <Link to='/watchlist'>
                        <p className='link'>Watchlist</p>
                    </Link>
                    <Link to='/dashboard'>
                        <p className='link'>Dashboard</p>
                    </Link>
                    <div className='switch-wrapper'>
                        <p className='link'>Dark Mode</p>
                        <Switch
                            checked={darkMode}
                            onClick={() => {
                                changeMode();
                            }}
                        />
                    </div>
                </div>

            </Drawer>
        </div>
    );
}