const CopyToClipboard = (text, locale) => {
  const input = document.createElement("input");
  input.value = text;
  input.style.position = "fixed";
  input.style.top = "-2000px";
  document.body.appendChild(input);
  input.select();
  try {
    new Promise((resolve) => {
      if (document.execCommand("copy")) {
        resolve();
      }
    });
    document.body.removeChild(input);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default CopyToClipboard;