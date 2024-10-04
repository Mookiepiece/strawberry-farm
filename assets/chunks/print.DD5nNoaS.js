const n=`const BYTE_UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];\r
const printDigitalSize = (bytes: number) => {\r
  let i = 0;\r
  while (bytes >= 1024 && i < BYTE_UNITS.length) (bytes /= 1024), i++;\r
};\r
\r
const printVideoLength = (seconds: number) =>\r
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]\r
    .map(n => n.toString().padStart(2, '0'))\r
    .join(':');\r
`;export{n as default};
