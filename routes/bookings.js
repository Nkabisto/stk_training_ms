import express from 'express';
import { pool } from '../db/pool.js'; 

const router = express.Router();

// POST /api/bookings
router.post('/bookings', (req, res)=>{
  const {
    applicantID,
    slotID
  } = req.body;


  res.status(201).json({
    message: "New booking created successfully",
    data: newBookig
  })

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
      WHERE id = $2;
      [applicantID, slotID]
      COMMIT
    );
    await client.query('COMMIT');
  } catch(err){
    await client.query('ROLLBACK');
    throw err;
  } finally{
    pool.release(); 
  }

