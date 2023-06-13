function randomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array.at(randomIndex);
}

const HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function randomHexDigitsArray(length) {
  const hexDigitsArray = [];

  for (let i = 0; i < length; i++) {
    hexDigitsArray.push(randomArrayElement(HEX_DIGITS));
  }

  return hexDigitsArray;
}

function uuidV4() {
  const randomHexDigits = randomHexDigitsArray(32);

  // set UUID version
  randomHexDigits[12] = '4';

  // set UUID variant
  randomHexDigits[16] = randomArrayElement(['8', '9', 'A', 'B']);

  // build UUID
  const uuidParts = [
    // XXXXXXXX-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    randomHexDigits.slice(0, 8).join(''),

    // xxxxxxxx-XXXX-4xxx-yxxx-xxxxxxxxxxxx
    randomHexDigits.slice(8, 12).join(''),

    // xxxxxxxx-xxxx-4XXX-yxxx-xxxxxxxxxxxx
    randomHexDigits.slice(12, 16).join(''),

    // xxxxxxxx-xxxx-4xxx-YXXX-xxxxxxxxxxxx
    randomHexDigits.slice(16, 20).join(''),

    // xxxxxxxx-xxxx-4xxx-yxxx-XXXXXXXXXXXX
    randomHexDigits.slice(20, 32).join(''),
  ];

  return uuidParts.join('-').toLowerCase();
}

module.exports = {
  uuidV4,
};
