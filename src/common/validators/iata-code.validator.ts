import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import iataCodes from '../data/iata-codes.json';

@ValidatorConstraint({ name: 'isIataCode', async: false })
export class IsIataCode implements ValidatorConstraintInterface {
    validate(code: string, args: ValidationArguments): boolean {
        return iataCodes.includes(code);
    }

    defaultMessage(args: ValidationArguments): string {
        const property = args.property;
        return `The ${property} code $value is not a valid IATA code.`;
    }
}