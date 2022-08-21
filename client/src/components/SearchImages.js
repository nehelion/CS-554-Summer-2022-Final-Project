import React from 'react';

const SearchImages = (props) => {
  const handleChange = (event) => {
    props.searchValue(event.target.value);
  };
  return (
    <form
      method='POST '
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name='formName'
      className='center'
    >
      <label>
        <span>Search Shows: </span>
        <input
          autoComplete='off'
          type='text'
          name='searchTerm'
          onKeyDown={(event)=> {
              console.log(event.key);
              if(event.key === 'Enter')
                handleChange(event);
            }
          }
        />
      </label>
    </form>
  );
};

export default SearchImages;