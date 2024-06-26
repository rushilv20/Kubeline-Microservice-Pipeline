import { checkIfFileExists, checkIfValidCSV } from '../utils/root.js';
import axios from 'axios';
import fs from 'fs';
import { VOLUME_PATH } from '../constants/index.js';

const calculate = async (req, res) => {
  const { file, product } = req.body;

  // Case 1: If the file name is not provided
  if (!file) {
    return res.status(200).json({ file: null, error: 'Invalid JSON input.' });
  }

  // Case 2: If a filename is provided, but not found in the mounted disk volume
  if (file) {
    const { fileExists } = checkIfFileExists({ file });
    if (!fileExists) {
      return res.status(200).json({ file, error: 'File not found.' });
    }
  }

  // Case 3: If a filename is provided, but the file contents cannot be parsed due to not following the CSVformat
  try {
    const isValid = await checkIfValidCSV({ file });
    if (!isValid) {
      res.status(200).json({ file, error: 'Input file not in CSV format.' });
      return;
    }
  } catch (error) {
    res.status(200).json({ file, error: 'Input file not in CSV format.' });
    return;
  }

  try {
    const response = await axios.post(
      'http://communicate-service/sum',
      {
        file,
        product
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.data) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log('error', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};

const store = async (req, res) => {
    const { file, data } = req.body;
  
    if (!file) {
      return res.status(200).json({ file: null, error: 'Invalid JSON input.' });
    }

    // Store the file in the persistent storage
    const filePath = `${VOLUME_PATH}/${file}`;

    fs.open(filePath, 'w', (openErr, fd) => {
      if (openErr) {
        console.error(openErr);
      }
  
      let result = data.replace(/[^\S\n]/g, "");
      fs.writeFile(fd, result, (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res
            .status(200)
            .json({ file, error: 'Error while storing the file to the storage.' });
        }
  
        fs.close(fd, (closeErr) => {
          if (closeErr) {
            console.error(closeErr);
          }

          return res.json({ file, message: 'Success.' });
        });
      });
    });
  };

export { calculate, store };
