import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepositiry from '../repositories/AppointmentsRepositiry';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepositiry: AppointmentsRepositiry;

  constructor(appointmentsRepositiry: AppointmentsRepositiry) {
    this.appointmentsRepositiry = appointmentsRepositiry;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepositiry.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is alredy booked');
    }

    const appointment = this.appointmentsRepositiry.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
