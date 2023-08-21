import {useState, useEffect} from 'react';
const useMediaQuery = () => {
  const [matches, setMatches] = useState({
    width: 0,
    heigth: 0,
  });
  useEffect(() => {
    setMatches(() => {
      return {
        width: window?.innerWidth,
        heigth: window?.innerHeight,
      };
    });
  }, []);
  useEffect(() => {
    const listener = () =>
      setMatches(() => {
        return {
          width: window?.innerWidth,
          heigth: window?.innerHeight,
        };
      });

    window.addEventListener('resize', listener);
    return () => window?.removeEventListener('resize', listener);
  }, [matches.width]);
  return matches;
};
export default useMediaQuery;
