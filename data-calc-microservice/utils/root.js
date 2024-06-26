import fs from 'fs';
import csv from 'csv-parser';
import { VOLUME_PATH } from '../constants/index.js';

const parseCsv = ({ file }) => {
  const filePath = `${VOLUME_PATH}/${file}`;

  const data = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const product = row.product;
        const amount = Number(row.amount);
        data.push({ product, amount });
      })
      .on('end', () => {
        resolve(data);
      });

    return data;
  });
};

const calculateTotalAmount = (data, product) => {
  let totalAmount = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].product === product) {
      totalAmount += Number(data[i].amount);
    }
  }

  return totalAmount;
};

export { parseCsv, calculateTotalAmount };
