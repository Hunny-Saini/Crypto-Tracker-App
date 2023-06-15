import React, { useState } from 'react';
import "./style.css";


const CoinInfo = ({heading, desc}) => {

    const [flag,setFlag] = useState(false);

    const longDesc = desc + "<span style='color:var(--grey)'> Read Less... </span>";
    const shortDesc = desc.slice(0,300) + "<span style='color:var(--grey)'> Read More... </span>";

  return (
    <div className='coin-info-wrapper'>
        <h2>{heading}</h2>
        {desc.length < 300 ? <p
        dangerouslySetInnerHTML={{__html: desc}} />
        :
        <p
        className='coin-desc-info'
        onClick={()=>setFlag(!flag)}
        dangerouslySetInnerHTML={{__html:!flag ? shortDesc : longDesc}} />}
    </div>
  )
}

export default CoinInfo;