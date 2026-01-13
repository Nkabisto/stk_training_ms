CREATE TABLE applicants(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	sa_id CHAR(13) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL,
	phone VARCHAR(10),
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointment_slots(
	id SERIAL PRIMARY KEY,
	start_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL,
	max_capacity INTEGER DEFAULT 10,
	current_bookings INTEGER DEFAULT 0 CHECK (current_bookings <= max_capacity)
);

CREATE TABLE booking_slots(
	applicant_id CHAR(13) REFERENCES applicants(sa_id),
	slot_id INTEGER REFERENCES appointment_slots(id),
	created_at TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (applicant_id, slot_id) -- Added composite key
);
