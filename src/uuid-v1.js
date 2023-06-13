function randomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array.at(randomIndex);
}

function randomHexString(length) {
  const hexDigits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];
  let hexString = '';

  for (let i = 0; i < length; i++) {
    hexString += randomArrayElement(hexDigits);
  }

  return hexString;
}

function randomMacAddress() {
  const emptyMacAddressParts = Array(6).fill('00');
  const macAddressParts = emptyMacAddressParts.map(() => randomHexString(2));

  return macAddressParts.join(':').toUpperCase();
}

// UUID timestamp is measured in 100 nanoseconds intervals
const MILLISECONDS_TO_100_NANOSECONDS = 10000;

const UUID_EPOCH_DATE = new Date('1582-10-14T00:00:00.000Z');

const HEX_RADIX = 16;

function uuidV1({ date, macAddress } = {}) {
  // set default values
  date ??= new Date();
  macAddress ??= randomMacAddress();

  // calculate timestamp from UUID epoch
  const uuidTimestamp = (date - UUID_EPOCH_DATE) * MILLISECONDS_TO_100_NANOSECONDS;

  // use the low 60 bits of the timestamp (last 15 hex chars)
  const uuidTimestampHex = uuidTimestamp.toString(HEX_RADIX).padStart(15, '0').slice(-15);

  // XXXXXXXX-xxxx-1xxx-yxxx-xxxxxxxxxxxx
  const timeLow = uuidTimestampHex.slice(-8);

  // xxxxxxxx-XXXX-1xxx-yxxx-xxxxxxxxxxxx
  const timeMid = uuidTimestampHex.slice(-12, -8);

  // xxxxxxxx-xxxx-1XXX-yxxx-xxxxxxxxxxxx
  const timeHiAndVersion = '1' + uuidTimestampHex.slice(-15, -12);

  // xxxxxxxx-xxxx-1xxx-YXXX-xxxxxxxxxxxx
  const clockSeqHiAndReserved = randomArrayElement(['8', '9', 'A', 'B']) + randomHexString(3);

  // xxxxxxxx-xxxx-1xxx-yxxx-XXXXXXXXXXXX
  const nodeId = macAddress.split(':').join('');

  // build UUID
  const uuidParts = [timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, nodeId];

  return uuidParts.join('-').toLowerCase();
}

module.exports = {
  uuidV1,
};
