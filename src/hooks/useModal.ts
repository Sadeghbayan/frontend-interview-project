import { useState } from 'react';

const useModal = () : [boolean, (show: boolean) => void] => {
  const [isShow, setIsShowing] = useState(false);

  const toggle = () => setIsShowing(!isShow);

  return [
    isShow,
    toggle,
  ]
};

export default useModal;


