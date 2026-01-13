import express from 'express';

const router = express.Router();

// POST /api/applicants
router.post('/applicants', (req, res)=>{
  const {
    firstName,
    lastName,
    saID,
    email,
    phone
  } = req.body;

  // Logic to save applicants to the database 
  const newApplicant = {
    id: Date.now(), 
    firstName,
    lastName,
    saID,
    email,
    phone,
    createdAt: new Date().toISOString()
  };

  // 201 status is standard for resource creation
  res.status(201).json({
    message: "Applicant created successfully",
    data: newApplicant
  });
});
