function _truncateFromMiddle(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const words = text.split(" ");
  let leftPart = "";
  let rightPart = "";
  let totalLength = 0;
  const halfMaxLength = Math.floor(maxLength / 2);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordLength = word.length;

    if (totalLength + wordLength + 1 <= halfMaxLength) {
      leftPart += word + " ";
      totalLength += wordLength + 1;
    } else {
      break;
    }
  }

  totalLength = 0;

  for (let i = words.length - 1; i >= 0; i--) {
    const word = words[i];
    const wordLength = word.length;

    if (totalLength + wordLength + 1 <= halfMaxLength) {
      rightPart = " " + word + rightPart;
      totalLength += wordLength + 1;
    } else {
      break;
    }
  }

  const truncatedText = leftPart.trim() + "...." + rightPart.trim();

  return truncatedText;
}

export function truncateFromMiddle(str1, maxLength1, str2, maxLength2) {
  const truncatedStr1 = _truncateFromMiddle(str1, maxLength1);
  const truncatedStr2 = _truncateFromMiddle(str2, maxLength2);

  const adjustedMaxLength1 = Math.max(maxLength1, truncatedStr2.length + 3);
  const adjustedMaxLength2 = Math.max(maxLength2, truncatedStr1.length + 3);

  const finalTruncatedStr1 = _truncateFromMiddle(str1, adjustedMaxLength1);
  const finalTruncatedStr2 = _truncateFromMiddle(str2, adjustedMaxLength2);

  return [finalTruncatedStr1, finalTruncatedStr2];
}
