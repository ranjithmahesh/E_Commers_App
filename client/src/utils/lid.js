export const TextEllipsis = (text, num) => {
  const words = text.split(/\s+/);

  const isTruncated = words.length > num;

  const truncatedWords = isTruncated ? words.slice(0, num) : words;

  const truncatedText = truncatedWords.join(" ");

  return <div>{isTruncated ? `${truncatedText}...` : text}</div>;
};
