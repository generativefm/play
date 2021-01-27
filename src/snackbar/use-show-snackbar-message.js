import { useContext } from 'react';
import snackbarContext from './snackbar-context';

const useShowSnackbarMessage = () => useContext(snackbarContext);

export default useShowSnackbarMessage;
