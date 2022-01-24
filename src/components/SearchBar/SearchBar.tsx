import React, { useCallback } from 'react';
import styles from './styles.module.css';
import trending from '../../../src/assets/images/trending.png';

interface ISearchBarProps {
  setFavClicked: (isClicked: boolean) => void;
  favClicked: boolean;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ setFavClicked, favClicked, onChangeText }) => {
  const swapFav = useCallback(() => {
    setFavClicked(!favClicked);
  }, [favClicked]);

  return (
    <div className={`${styles.searchBarContainer}`}>
      <div className={`${styles.searchBarTitleContainer}`}>
        <img src={trending} className={`${styles.trending}`} />
        <button className={`${styles.myFaves}`} onClick={swapFav}>
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
