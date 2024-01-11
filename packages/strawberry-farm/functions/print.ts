const BYTE_UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
const printDigitalSize = (bytes: number) => {
  let i = 0;
  while (bytes >= 1024 && i < BYTE_UNITS.length) (bytes /= 1024), i++;
};

const printVideoLength = (seconds: number) =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
    .map(n => n.toString().padStart(2, '0'))
    .join(':');
