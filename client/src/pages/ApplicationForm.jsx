import React, {useState } from "react";
import ApplicantForm from "../ApplicantForm";

export default function ApplicationForm(){
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    saID:"",
    email:"",
    phone:""
  });

  // Response displays feedback message of form submission
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleChange=(e)=>{
    const {name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]:value}));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if(!res.ok){
        throw new Error("Internal server error, failed to submit form");
      }

      const data = await res.json();
      setResponse(data);
    }catch(err){
      setError(err.message);
    }
  };

  return (
    <>
      <ApplicantForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    <div>
      {response && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          <strong>{response.message}</strong>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  </>
);
}
