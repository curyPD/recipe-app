export const transformUnderscoreToCamelCase = function (string) {
  const newString = string
    .toLowerCase()
    .split('_')
    .map((word, i) =>
      i === 0 ? word : word.replace(word[0], word[0].toUpperCase())
    )
    .join('');
  return newString;
};

export const getJSON = async function (url, s) {
  try {
    return Promise.race([
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(
            new Error(
              'Took too long to fetch. Check your internet connection and try again'
            )
          );
        }, s * 1000)
      ),
      fetch(url),
    ]);
  } catch (err) {
    throw err;
  }
};
