export default function ApplicantForm({handleSubmit, formData, handleChange}){
  return(
    <>
      <h2>Stocktaker Application Form</h2>
      <form onSubmit = {handleSubmit}>
        {/* First names */}
        <label>First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange= {handleChange}
            required
          />
        </label>
        <br />

        {/* Last name */}
        <label>Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange= {handleChange}
            required
          />
        </label>
        <br />

        {/* South African ID Number */}
        <label>South ID Number:
          <input
            type="text"
            name="saID"
            value={formData.saID}
            onChange= {handleChange}
            pattern="[0-9]{13}"
            title="Must be a valid 13-digit South African ID number"
            required
          />
        </label>
        <br />

        {/* Email */}
        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange= {handleChange}
            required
          />
        </label>
        <br />

        {/* Cellphone Number*/}
        <label>Cellphone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange= {handleChange}
            pattern="^0\d{9}$"
            title="Must be a valid 10-digit South African cellphone number starting with 0"
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
