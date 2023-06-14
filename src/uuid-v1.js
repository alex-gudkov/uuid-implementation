function randomArrayElement(array) {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}

const HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function randomHexString(length) {
  let hexString = '';

  for (let i = 0; i < length; i++) {
    hexString += randomArrayElement(HEX_DIGITS);
  }

  return hexString;
}

function randomMacAddress() {
  const emptyMacAddressParts = Array(6).fill('00');
  const macAddressParts = emptyMacAddressParts.map(() => randomHexString(2));

  return macAddressParts.join(':').toUpperCase();
}

// UUID timestamp is measured in 100 nanoseconds intervals
const MILLISECOND_TO_100_NANOSECONDS = 10000;

const UUID_EPOCH_DATE = new Date('1582-10-14T00:00:00.000Z');

const HEX_RADIX = 16;

const UUID_VERSION = '1';

const UUID_VARIANT_1_VALUES = ['8', '9', 'A', 'B'];

function uuidV1({ date, macAddress } = {}) {
  // define undefined values
  date ??= new Date();
  macAddress ??= randomMacAddress();

  // calculate timestamp from UUID epoch
  const uuidTimestamp = (date - UUID_EPOCH_DATE) * MILLISECOND_TO_100_NANOSECONDS;

  // use the low 60 bits of the timestamp (last 15 hex chars)
  const uuidTimestampHex = uuidTimestamp.toString(HEX_RADIX).padStart(15, '0').slice(-15);

  // XXXXXXXX-xxxx-1xxx-yxxx-xxxxxxxxxxxx
  const timeLow = uuidTimestampHex.slice(-8);

  // xxxxxxxx-XXXX-1xxx-yxxx-xxxxxxxxxxxx
  const timeMid = uuidTimestampHex.slice(-12, -8);

  // xxxxxxxx-xxxx-1XXX-yxxx-xxxxxxxxxxxx
  const versionAndTimeHigh = UUID_VERSION + uuidTimestampHex.slice(-15, -12);

  // xxxxxxxx-xxxx-1xxx-YXXX-xxxxxxxxxxxx
  const uuidVariant = randomArrayElement(UUID_VARIANT_1_VALUES);
  const variantAndRandom = uuidVariant + randomHexString(3);

  // xxxxxxxx-xxxx-1xxx-yxxx-XXXXXXXXXXXX
  const nodeId = macAddress.split(':').join('');

  // build UUID
  const uuidParts = [timeLow, timeMid, versionAndTimeHigh, variantAndRandom, nodeId];

  return uuidParts.join('-').toLowerCase();
}

module.exports = {
  uuidV1,
};
