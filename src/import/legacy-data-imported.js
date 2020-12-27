export const LEGACY_DATA_IMPORTED = 'LEGACY_DATA_IMPORTED';

const legacyDataImported = (legacyState) => ({
  type: LEGACY_DATA_IMPORTED,
  payload: legacyState,
});

export default legacyDataImported;
