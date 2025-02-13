export const extractTimestampFromUUIDv7 = (uuid: string) => {
  const timestampHex = uuid.replace(/-/g, "").slice(0, 12);
  const timestampMs = parseInt(timestampHex, 16);
  return new Date(timestampMs).getTime();
};