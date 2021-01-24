import { useContext } from 'react';
import dialogContext from './dialog-context';

const useSetDialog = () => useContext(dialogContext);

export default useSetDialog;
