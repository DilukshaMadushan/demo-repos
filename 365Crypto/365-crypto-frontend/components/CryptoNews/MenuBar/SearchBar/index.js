import React from 'react';
import styles from './index.module.css';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = ({ handleSearchInputChange, searchSelection }) => {
  return (
    <div className={`${styles['main-div']}`}>
      <div className={`${styles['serach-div']}`}>
        <div className={`${styles['input-div']}`}>
          <input
            className={`${styles['input-search']}`}
            name="Search"
            value={searchSelection}
            placeholder="Search"
            type="text"
            onChange={e => handleSearchInputChange(e.target.value)}
          />
        </div>
      </div>
      {/* <div className={`${styles['icon-div']}`}>
				<HiOutlineSearch className={`${styles['icon']}`} />
			</div> */}
    </div>
  );
};

export default SearchBar;
