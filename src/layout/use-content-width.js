import { useContext } from 'react';
import contentWidthContext from './content-width-context';

const useContentWidth = () => useContext(contentWidthContext);

export default useContentWidth;
