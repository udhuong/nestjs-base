let sequence = 0;
let lastTimestamp = -1;

function currentTimestamp(): number {
  return Date.now();
}

function waitNextMillis(last: number): number {
  let timestamp = currentTimestamp();
  while (timestamp <= last) {
    timestamp = currentTimestamp();
  }
  return timestamp;
}

export function generateSnowflakeId(workerId = 1, datacenterId = 1): bigint {
  const twepoch = 1577836800000n; // 2020-01-01
  let timestamp = BigInt(currentTimestamp());

  if (Number(timestamp) === lastTimestamp) {
    sequence = Number(BigInt(sequence + 1) % 4096n); // 👈 FIXED
    if (sequence === 0) {
      timestamp = BigInt(waitNextMillis(lastTimestamp));
    }
  } else {
    sequence = 0;
  }

  lastTimestamp = Number(timestamp);

  return ((timestamp - twepoch) << 22n) | (BigInt(datacenterId) << 17n) | (BigInt(workerId) << 12n) | BigInt(sequence);
}
