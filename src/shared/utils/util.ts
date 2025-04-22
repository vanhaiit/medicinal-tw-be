import { TransformationType } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import dotenv from 'dotenv';

dotenv.config();

export function getVariableName<TResult>(getVar: () => TResult): string {
    const m = /\(\)=>(.*)/.exec(
        getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
    );

    if (!m) {
        throw new Error(
            "The function does not contain a statement matching 'return variableName;'",
        );
    }

    const fullMemberName = m[1];

    const memberParts = fullMemberName.split('.');

    return memberParts[memberParts.length - 1];
}

/**
 * @param {number}  timeout - seconds.
 * @returns {Promise<void>} pause the excecution for number of seconds.
 */
export const sleepInSeconds = (timeout: number) =>
    new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, timeout * 1000);
    });

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function hexToBuffer(hexString: string) {
    // Remove '0x' prefix and convert to Buffer
    return Buffer.from(hexString.slice(2), 'hex');
}

export function enumize<K extends string>(...args: K[]): { [P in K]: P } {
    const ret = {} as { [P in K]: P };
    args.forEach(k => (ret[k] = k));
    return ret;
}

export const dateTransformer = ({
    value,
    type,
}: TransformFnParams): unknown => {
    if (!value) {
        return;
    }

    if (type === TransformationType.CLASS_TO_PLAIN) {
        return value.getTime();
    } else {
        return new Date(value);
    }
};

export const getRandomDeviateNumber = (
    sourceNumber: number,
    fromDeviation: number,
    toDeviation: number,
) => {
    const array = [1, -1];
    const randomIndex = Math.floor(Math.random() * array.length);
    const positiveOrNegative = array[randomIndex];

    const deviateNumber =
        fromDeviation + Math.random() * (toDeviation - fromDeviation);
    const randomDeviateNumber =
        sourceNumber +
        (sourceNumber * positiveOrNegative * deviateNumber) / 100;

    return randomDeviateNumber;
};

export function getRandomIntMax(max: number): number {
    return Math.floor(Math.random() * max) + 1;
}

export function getDelayUntilMidnight(): number {
    const now = new Date();
    const nextMidnight = getNextMidnight();
    return nextMidnight.getTime() - now.getTime();
}

export function getNextMidnight() {
    const now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0,
    );
}

/*------------------------- For testing--------------------------*/
export function getDelayUntilMidnightTest(): number {
    const now = new Date();
    const nextMidnight = getNextMidnightTest();
    return nextMidnight.getTime() - now.getTime();
}

export function getNextMidnightTest() {
    const now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() + 1,
        0,
        0,
        0,
    );
}
