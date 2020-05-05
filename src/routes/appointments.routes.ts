import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepositiry from '../repositories/AppointmentsRepositiry';

const appointmentsRouter = Router();
const appointmentsRepositiry = new AppointmentsRepositiry();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepositiry.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepositiry.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alredy booked' });
  }

  const appointment = appointmentsRepositiry.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
