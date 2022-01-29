import React, { useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { actions } from '../../redux/store';

import ProductItem from '../ProductItem';

import styles from './styles.module.css';

interface IProductListProps {
  favClicked: boolean;
}

const ProductsList = ({ favClicked }: IProductListProps) => {
  // const myFavs: string[] = JSON.parse(localStorage.getItem('favs') ?? '[]');
  // const trendingProducts: Product[] = useMemo(() => {
  //   if (!myFavs) return Store.data;
  //   return favClicked && myFavs.length ? Store.data.filter((product) => myFavs.indexOf(product._id) >= 0) : Store.data;
  // }, [Store, favClicked, myFavs]);

  // const renderProductList = () => (
  //   <div className={`${styles.mainContainer}`}>
  //     {trendingProducts.map((product) => (
  //       <ProductItem key={product._id} product={product} favs={myFavs} />
  //     ))}
  //   </div>
  // );

  // const getMoreProducts = async () => {
  //   if (!favClicked) {
  //     await Store.getProducts();
  //   }
  // };

  const dispatch = useAppDispatch();
  const hasNext = useAppSelector((state) => (!favClicked ? state.products.hasNext : false));
  const products = useAppSelector((state) => (!favClicked ? state.products.products : state.favorites.products));

  const renderProductList = () => (
    <div className={`${styles.mainContainer}`}>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} showFav={favClicked} />
      ))}
    </div>
  );

  return (
    <>
      {hasNext ? (
        <InfiniteScroll
          dataLength={products.length}
          hasMore={hasNext}
          next={() => dispatch(actions.productActions.fetchProducts())}
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

export default ProductsList;
