import React, { useState } from 'react';

export const Input = () => {

  const [ val, setVal ] = useState('');

  const onInputChange = e => {
    e.preventDefault();
    setVal(e.target.value);
  };

  return <input type='text' onChange={onInputChange} value={val} />
};
