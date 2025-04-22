import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const nowUtc = () => dayjs.utc();

export const getNextSleepTime = (value: number, unit: any) => {
    let sleepTime = 0;
    const current = Date.now();
    const targetTime = dayjs().startOf(unit);

    if (targetTime.isAfter(current)) {
        sleepTime = targetTime.unix() * 1000 - current;
    } else {
        sleepTime = targetTime.add(value, unit).unix() * 1000 - current;
    }

    return sleepTime;
};

export const getStartOfDay = (value: string, formatDay: string) =>
    dayjs.utc(value, formatDay).startOf('day').unix();
export const getEndOfDay = (value: string, formatDay: string) =>
    dayjs.utc(value, formatDay).endOf('day').unix();
