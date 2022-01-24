import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Product } from '../../interfaces';
import OrderInfo from '../OrderInfo';
import moment from 'moment';
import styles from './styles.module.css';
import favIcon from '../../../src/assets/images/IconShape.png';
import heart from '../../../src/assets/images/heart.png';
import avatar from '../../../src/assets/images/avatar.svg';
import clock from '../../../src/assets/images/clock.svg';

interface IProductItemProps {
  product: Product;
  favs: string[];
}

const getTimeDiff = (lastOrder: Date): number => {
  const now = moment(new Date());
  return now.diff(moment(lastOrder), 'minute');
};

const ProductItem: React.FC<IProductItemProps> = ({ product, favs }) => {
  const [isFav, setIsFav] = useState<boolean>(false);
  useEffect(() => {
    if (favs.filter((fav: string) => fav === product._id).length) setIsFav(true);
  }, []);
  const swapFav = useCallback(() => {
    setIsFav(!isFav);
  }, [isFav]);

  const minutesFromLastOrder = useMemo(
    () =>
      product.lastOrderDate
        ? getTimeDiff(product.lastOrderDate) > 0
          ? getTimeDiff(product.lastOrderDate)
          : '0'
        : null,
    [product]
  );

  const saveFav = () => {
    swapFav();
    let currentFavs: string[] = JSON.parse(localStorage.getItem('favs') ?? '[]');
    console.log(product);
    if (!currentFavs.includes(product._id)) {
      currentFavs.push(product._id);
      localStorage.setItem('favs', JSON.stringify(currentFavs));
    } else {
      currentFavs = currentFavs.filter((id) => id !== product._id);
      localStorage.setItem('favs', JSON.stringify(currentFavs));
    }
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.titleContainer}`}>
        <p className={`${styles.title}`}>{product.name}</p>
        <input type="image" alt="fav" src={isFav ? heart : favIcon} onClick={saveFav} className={`${styles.input}`} />
      </div>
      <div>
        <p className={`${styles.restaurant}`}>
          {product.restaurant.name} · {product.restaurant.location}
        </p>
        <div className={`${styles.priceContainer}`}>
          <p className={`${styles.oldPrice}`}>${product.price + 100}</p>
          <p className={`${styles.discount}`}>
            ${product.price} · {product.discountName}
          </p>
        </div>
        <div className={`${styles.recentOrdersContainer}`}>
          {product.volume ? <OrderInfo img={avatar} text={`${product.volume} recent orders`} /> : null}
          {minutesFromLastOrder ? (
            <OrderInfo
              img={clock}
              text={minutesFromLastOrder === '0' ? 'just now' : `${minutesFromLastOrder} minutes ago`}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
