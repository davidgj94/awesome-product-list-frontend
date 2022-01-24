import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { view } from '@risingstack/react-easy-state';
import { debounce } from 'lodash';

import './App.css';

import ProductsList from './components/ProductsList';
import SearchBar from './components/SearchBar';
import Store from './Store';

const App: React.FC = () => {
  const onChangeText = useCallback(
    debounce((text: string) => {
      Store.clear();
      Store.setText(text);
    }, 500),
    []
  );

  useEffect(() => {
    Store.getProducts();
  }, [Store.text]);

  const [favClicked, setFavClicked] = useState(false);

  return (
    <BrowserRouter>
      <SearchBar setFavClicked={setFavClicked} favClicked={favClicked} onChangeText={onChangeText} />
      <ProductsList favClicked={favClicked} />
    </BrowserRouter>
  );
};

export default view(App);
