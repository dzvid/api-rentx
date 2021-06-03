import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(new Date(date)).utc().local().format();
  }

  compareInHoursUTC(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
