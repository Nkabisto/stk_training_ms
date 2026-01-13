import express from 'express';
import { pool } from '../db/pool.js'; 

const router = express.Router();

// POST /api/bookings
router.post('/', async (req, res)=>{
  const { applicantID, slotID } = req.body;
  
  if (!applicantID || !slotID){
    return res.status(400)
      .json({
        error:"Missing applicant id or slot id" 
      });
  }

  const client = await pool.connect();

  try{
    await client.query('BEGIN');
    await client.query(`
      INSERT INTO booking_slots (applicant_id, slot_id) 
      VALUES($1,$2)`, 
      [applicantID,slotID]
    );

    await client.query(`
      UPDATE appointment_slots 
      SET current_bookings = current_bookings+1,
      WHERE id = $1`,
      [slotID]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: "Booking successful",
    });

  } catch(err){
    await client.query('ROLLBACK');
    console.error('Transaction error:',err)

    res.status(500).json ({
      error:"Internal server error",
      details: err.message
    });

  } finally{
    client.release(); 
  }

});

export default router;

