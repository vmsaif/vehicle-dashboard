/**
 * @file:        dataController.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-29
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Controller for fetching data from the database.
 */


import { query } from '../../db/config';


async function getData(req, res) {
  try {
    const result = await query('SELECT * FROM your_table');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default { getData };