import fs from 'fs';
import csv from 'csv-parser';

import { VOLUME_PATH } from '../constants/index.js';

const checkIfFileExists = ({ file }) => {
  const filePath = `${VOLUME_PATH}/${file}`;

  if (!fs.existsSync(filePath)) {
    return {
      fileExists: false
    };
  }

  return {
    fileExists: true
  };
};

const checkIfValidCSV = ({ file }) => {
  const filePath = `${VOLUME_PATH}/${file}`;

  return new Promise((resolve, reject) => {
    let isValidHeader = false;
    let isValid = true;

    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('headers', (headers) => {
        isValidHeader = validateHeader(headers);
      })
      .on('data', (data) => {
        if (!isValid || !isValidHeader || !isValidRow(data)) {
          isValid = false;
        }
      })
      .on('error', (error) => {
        console.error(`Error occurred while checking the file: ${error}`);
        isValid = false;
        reject(error);
      })
      .on('end', () => {
        if (isValid && isValidHeader) {
          resolve(true); // Resolve the promise with true if CSV is valid
        } else {
          resolve(false); // Resolve the promise with false if CSV is invalid
        }
      });
  });
};

function validateHeader(headers) {
  return (
    headers.length === 2 && headers[0] === 'product' && headers[1] === 'amount'
  );
}

function isValidRow(row) {
  const keys = Object.keys(row);
  if (keys.length !== 2) {
    return false;
  }
  const product = row.product;
  const amount = Number(row.amount);

  if (typeof product !== 'string' || isNaN(amount)) {
    return false;
  }
  return true;
}

export { checkIfFileExists, checkIfValidCSV };
