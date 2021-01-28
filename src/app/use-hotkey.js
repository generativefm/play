import { useEffect } from 'react';

const MODIFIER_KEYS = ['Alt', 'AltGraph', 'Control', 'OS', 'Meta', 'Shift'];

const useHotkey = (key, callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key !== key ||
        MODIFIER_KEYS.some((modifierKey) => event.getModifierState(modifierKey))
      ) {
        return;
      }
      event.preventDefault();
      callback(event);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
};

export default useHotkey;
