import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message?: string;
  createdAt: string;
}

let db: { appointments: Appointment[] } = { appointments: [] };

if (fs.existsSync(DB_PATH)) {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  db = JSON.parse(data);
}

export function saveAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>) {
  const newAppointment: Appointment = {
    ...appointment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  db.appointments.push(newAppointment);
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  return newAppointment;
}

export function getAppointments() {
  return db.appointments;
}
