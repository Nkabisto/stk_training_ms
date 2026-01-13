import express from 'express';
import { pool } from '../db/pool.js'; 

const router = express.Router();

// POST /api/bookings
router.post('/api/bookings', async (req, res)=>{
  const { applicantID, slotID } = req.body;
  
  if (!applicantID || !slotID){
    return res.status(400)
      .json({
        error:"Missing applicant id or slot id" 
      });
  }

  try{
    await pool.query('BEGIN');
    await pool.query(`
      INSERT INTO booking_slots (applicant_id, slot_id) 
      VALUES($1,$2)`, 
      [applicantID,slotID]
    );

    await pool.query(`
      UPDATE appointment_slots 
      SET current_bookings = current_bookings+1,
      WHERE id = $1`,
      [slotID]
    );

    await pool.query('COMMIT');

    res.status(409).json({
      message: err.message,
    });

  } catch(err){
    await pool.query('ROLLBACK');

  } finally{
    pool.release(); 
  }

});

