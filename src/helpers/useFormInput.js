import {useState} from 'react';

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e);
  };

  return {
    value,
    onChangeText: handleChange,
  };
};

export default useFormInput;
