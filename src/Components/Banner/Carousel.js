import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem:{
    display: "flex",
    flexDirection:'column',
    alignItems: "center",
    cursor: "pointer",
    textTransform: 'uppercase',
    color: 'white',
  },
}))


export function numberWithCommas(x){
  var pattern = /\B(?=(\d{3})+(?!\d))/g;

  return x.toString().replace(pattern, ',')
}

const Carousel = () => {
  const classes = useStyles();

  const [trending, setTrending] = useState([]);

const {currency, symbol} = CryptoState();

const fetchTrendingCoins = async() => {
  const {data} = await axios.get(TrendingCoins(currency))
  setTrending(data);
};

console.log(trending)


useEffect(() => {
fetchTrendingCoins();
}, [currency]);

const items = trending.map((coins) =>{
let profit = coins.price_change_percentage_24h >=0;

  return(
    <Link
    className={classes.carouselItem}
    to={`/coins/${coins.id}`}
    >
      <img
        src={coins?.image}
        alt={coins.name}
        height='80'
        style={{marginBottom: 10}}
      />
      <span>{coins?.symbol}&nbsp;<span style={{
        color: profit > 0 ? 'rgba(14, 203, 129)':'red',
        fontWeight:'500',
      }}>{profit && "+"}{coins?.price_change_percentage_24h?.toFixed(2)}</span>
      
      
      </span>
      <span style={{fontSize: 22, fontWeight: 500}}>
{symbol} {numberWithCommas(coins?.current_price.toFixed(2))}
      </span>
    </Link>
    );
})

const responsive = {
  0:{
    items: 2,
  },
  512: {
    items: 4,
},
};

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  )
};

export default Carousel