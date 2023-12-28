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
  } catch (err) {
    console.log(err);
  }
};

export default CopyToClipboard;