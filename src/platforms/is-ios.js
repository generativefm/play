const iosPlatformNames = new Set(['iPhone', 'iPod', 'iPad']);

const isIos = navigator && iosPlatformNames.has(navigator.platform);

export default isIos;
