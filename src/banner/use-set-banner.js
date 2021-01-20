import { useContext } from 'react';
import bannerContext from './banner-context';

const useSetBanner = () => useContext(bannerContext);

export default useSetBanner;
