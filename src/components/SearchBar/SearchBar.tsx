import React, { useCallback } from 'react';
import { debounce } from 'lodash';

import { useAppDispatch } from '../../hooks';
import { actions } from '../../redux/store';

import styles from './styles.module.css';
import trending from '../../../src/assets/images/trending.png';

interface ISearchBarProps {
  toggleShowFav: () => void;
}

const SearchBar = ({ toggleShowFav }: ISearchBarProps) => {
  const dispatch = useAppDispatch();

  const onChangeText = useCallback(
    debounce((text: string) => {
      dispatch(actions.productActions.setText(text));
      dispatch(actions.productActions.fetchProducts());
    }, 500),
    []
  );

  return (
    <div className={`${styles.searchBarContainer}`}>
      <div className={`${styles.searchBarTitleContainer}`}>
        <img src={trending} className={`${styles.trending}`} />
        <button className={`${styles.myFaves}`} onClick={toggleShowFav}>
          My faves
        </button>
      </div>
      <input
        type="text"
        className={`${styles.searchInput}`}
        placeholder="Search"
        onChange={(event) => onChangeText(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
