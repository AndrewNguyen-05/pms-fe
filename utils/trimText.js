const trimText = (title, maxTitleLength = 10) => {
  return title.length > maxTitleLength
    ? title.substring(0, maxTitleLength) + "..."
    : title;
};

export default trimText;
