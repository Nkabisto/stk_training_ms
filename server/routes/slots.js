import express from 'express';
import { pool } from '../db/pool.js'; 

const router = express.Router();

//GET /api/slots
router.get('/api/slots', async(req, res)=>{
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

router.post('/slots', async(req, res)=>{
  const {
    startTime,
    endTime,
    maxStd
  }= req.body;

  if(!startTime || !endTime){
    return res.status(400)
      .json({
        error:"Missing start start time or end time"
      });
  }

  try{
    await pool.query(`
      INSERT INTO appointment_slots(start_time, end_time, maxStd) 
      VALUES($1,$2,$3)`,
      [startTime, endTime, maxStd]
    )
  } catch(err){
    console.error({'Error creating appointments:',err});
    res.status(500).json(error: 'Internal server error')
  }
})

export default router;
