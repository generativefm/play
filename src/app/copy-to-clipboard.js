const execCommandCopy = (text) =>
  new Promise((resolve) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    resolve();
  });

const clipboardApiCopy = (text) => navigator.clipboard.writeText(text);

const copyToClipboard = navigator.clipboard
  ? clipboardApiCopy
  : execCommandCopy;

export default copyToClipboard;
