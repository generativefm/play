import { useContext } from 'react';
import snackbarContext from './snackbar-context';

const useShowSnackbar = () => useContext(snackbarContext);

export default useShowSnackbar;
