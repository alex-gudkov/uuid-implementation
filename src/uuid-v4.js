function randomArrayElement(array) {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}

const HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function randomHexDigitsArray(length) {
  const hexDigitsArray = [];

  for (let i = 0; i < length; i++) {
    hexDigitsArray.push(randomArrayElement(HEX_DIGITS));
  }

  return hexDigitsArray;
}

const UUID_VERSION = '4';

const UUID_VARIANT_1_VALUES = ['8', '9', 'A', 'B'];

function uuidV4() {
  // generate 128 random bits (32 hex chars)
  const randomHexDigits = randomHexDigitsArray(32);

  // set UUID version
  randomHexDigits[12] = UUID_VERSION;

  // set UUID variant
  const uuidVariant = randomArrayElement(UUID_VARIANT_1_VALUES);

  randomHexDigits[16] = uuidVariant;

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
