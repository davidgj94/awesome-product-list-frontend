import React, { useEffect, useMemo } from 'react';
import { view } from '@risingstack/react-easy-state';
import InfiniteScroll from 'react-infinite-scroll-component';
import Store from '../../Store';
import styles from './styles.module.css';
import { Product } from '../../interfaces';

import ProductItem from '../ProductItem';

interface IProductListProps {
  favClicked: boolean;
}

const ProductsList: React.FC<IProductListProps> = ({ favClicked }) => {
  const myFavs: string[] = JSON.parse(localStorage.getItem('favs') ?? '[]');
  const trendingProducts: Product[] = useMemo(() => {
    if (!myFavs) return Store.data;
    return favClicked && myFavs.length ? Store.data.filter((product) => myFavs.indexOf(product._id) >= 0) : Store.data;
  }, [Store, favClicked, myFavs]);

  const renderProductList = () => (
    <div className={`${styles.mainContainer}`}>
      {trendingProducts.map((product) => (
        <ProductItem key={product._id} product={product} favs={myFavs} />
      ))}
    </div>
  );

  const getMoreProducts = async () => {
    if (!favClicked) {
      await Store.getProducts();
    }
  };

  return (
    <>
      {Store.hasMore ? (
        <InfiniteScroll
          dataLength={Store.data.length}
          hasMore={favClicked ? false : Store.hasMore}
          next={getMoreProducts}
          loader={<p>Is loading ...</p>}
        >
          {renderProductList()}
        </InfiniteScroll>
      ) : (
        renderProductList()
      )}
    </>
  );
};

export default view(ProductsList);
