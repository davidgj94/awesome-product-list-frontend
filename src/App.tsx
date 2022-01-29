import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, actions } from './redux/store';
import { useToggle, useAppDispatch } from './hooks';
import { setAuth } from './api';

import ProductsList from './components/ProductsList';
import SearchBar from './components/SearchBar';

import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const [showFavs, toggleShowFav] = useToggle();

  useEffect(() => {
    setAuth(localStorage.getItem('productList.accesToken'));
    dispatch(actions.productActions.fetchProducts());
    dispatch(actions.favActions.getFavorites());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <SearchBar toggleShowFav={toggleShowFav} />
        <ProductsList favClicked={showFavs} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
