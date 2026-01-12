import express from 'express';
import { pool } from '../db/pool.js'; 

const router = express.Router();

//GET /api/slots
router.get('/', async(req, res)=>{
  try{
    const queryText = `
    SELECT * FROM appointment_slots
    WHERE current_bookings < 10
    ORDER BY start_time;
    `;
    const { rows } = await pool.query(queryText)
    // Return the available slots as JSON
    res.status(200).json(rows);
  } catch(error){
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
})

export default router;
