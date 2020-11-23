import { useState, useEffect } from 'react';

// хук для считывания размера экрана
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.screen.width,
        height: window.screen.height,
      });
    }

    // слушатель на изменение размера экрана
    window.addEventListener("resize", handleResize);

    // вызов функции для записи в стейт данных ширины и высоты при каждом изменениия экрана
    handleResize();

    // снятие слушателя
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;