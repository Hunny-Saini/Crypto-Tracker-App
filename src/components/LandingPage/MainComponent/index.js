import React from 'react';
import "./style.css";
import Button from '../../Common/Button';
import iphone from '../../../assets/iphone.png'
import gradient from '../../../assets/gradient.png'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { RWebShare } from "react-web-share";

const MainComponent = () => {
    return (
        <div className='flex-info'>
            <div className='left-component'>

                <motion.h1
                    className='heading'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <span className='track-crypto-heading'>Track Crypto</span>
                    <br />
                    <span className='real-time-heading'>Real Time</span>
                </motion.h1>
                <motion.p
                    className='info-text'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >Track crypto through a public api in real time. Visit the dashboard to do so! </motion.p>
                <motion.div
                    className='info-btn'
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    <Link to='/dashboard'>
                        <Button text={"Dashboard"} onClick={() => console.log("Clicked")} outlined={false} />
                    </Link>
                    <RWebShare
                        data={{
                            text: "Hey!, Checkout my crypto tracker made using React!",
                            url: "https://crypto-app-hunny.netlify.app/",
                            title: "CryptoTracker.",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                    <Button text={"Share"} onClick={() => console.log("Shared")} outlined={true} />
                    </RWebShare>
                </motion.div>
            </div>
            <div className='phone-component'>
                <motion.img
                    src={iphone}
                    alt='iphone'
                    className='iphone'
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        type: "smooth",
                        repeatType: 'mirror',
                        duration: 2,
                        repeat: Infinity
                    }}
                />
                <img src={gradient} alt='gredient' className='gredient' />
            </div>
        </div>
    )
}

export default MainComponent;