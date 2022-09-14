import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import styles from './index.module.css';

const Search = () => {
  return (
    <div className={`${styles['serach-div']}`}>
      <div style={{ marginLeft: '15px', marginRight: '10px' }}>
        <HiOutlineSearch size='20px' style={{ color: 'grey' }} />
      </div>
      <div>
        <input
          className={`${styles['input-search']}`}
          placeholder='Search for something'
          type='text'
        />
      </div>
    </div>
  );
};

export default Search;
