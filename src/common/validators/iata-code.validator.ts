import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import iataCodes from '../data/iata-codes.json';

@ValidatorConstraint({ name: 'isIataCode', async: false })
export class IsIataCode implements ValidatorConstraintInterface {
    validate(code: string, args: ValidationArguments): boolean {
        // Check if the code is in the list of valid IATA codes
        return iataCodes.includes(code);
    }

    defaultMessage(args: ValidationArguments): string {
        // Determine the property name that is invalid
        const property = args.property; // This is either 'origin' or 'destination'
        return `The ${property} code $value is not a valid IATA code.`;
    }
}