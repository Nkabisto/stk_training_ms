import express from 'express';
import { pool } from '../db/pool.js'; 

const router = express.Router();

// POST /api/applicants
router.post('/api/applicants',async(req, res)=>{
  const {
    firstName,
    lastName,
    saID,
    email,
    phone
  } = req.body;

  try{
    const queryText = `
      INSERT INTO applicants(first_name,last_name,sa_id,email,phone,created_at)
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *;
    `;
    const values = [firstName, lastName, saID,email,phone,new Date().toISOString()];

  if (!firstName || !lastName || !saID || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

    const result = await pool.query(queryText, values);

    // 201 status is standard for resource creation
    res.status(201).json({
      message: "Submission was successful.",
      data: result.rows[0],
    });
  }catch(err){
    console.error("SERVER ERROR:",err);
    res.status(500).json({error: err.message});
  }
});

export default router;
