import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isJsonString', async: false })
export class IsJsonString implements ValidatorConstraintInterface {
    validate(value: string) {
        const strValue = JSON.stringify(value);
        if (typeof strValue !== 'string') {
            return false; // The value is not a string, so it can't be valid JSON
        }
        try {
            JSON.parse(strValue);
            return true; // If parsing succeeds, it's valid JSON
        } catch {
            return false; // If parsing fails, it's not valid JSON
        }
    }

    defaultMessage() {
        return 'Content must be a valid JSON ';
    }
}
