import { parseCsv, calculateTotalAmount } from '../utils/root.js';

const sum = async (req, res) => {
  try {
    const { file, product } = req.body;

    // 1. read csv
    const parsedData = await parseCsv({ file });

    // 3. calculate amount
    const amount = calculateTotalAmount(parsedData, product);

    const sumString = amount.toString();
    res.status(200).json({ file, sum: sumString });
    return;
  } catch (error) {
    if (error.response && error.response.data) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};

export { sum };
