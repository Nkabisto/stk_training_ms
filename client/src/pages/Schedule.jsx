import React from "react";

export default function Schedule() {
  // Generate time slots from 09:00 to 12:00 in 30 min intervals
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

  // Example dates (you can replace with dynamic ones)
  const dates = ["2026-01-13", "2026-01-14", "2026-01-15"];

  return (
    <div style={{ width: "400px", border: "1px solid #ccc", padding: "10px" }}>
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>Calendar</h2>
      {dates.map((date) => (
        <div key={date} style={{ marginBottom: "10px" }}>
          <h3 style={{ margin: "5px 0" }}>{date}</h3>
          {times.map((time) => (
            <div
              key={`${date}-${time}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  marginRight: "5px",
                  padding: "8px",
                  backgroundColor: "#e0f7fa",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {date}
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor: "#f1f8e9",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {time}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
