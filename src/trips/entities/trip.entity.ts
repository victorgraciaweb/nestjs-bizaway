import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trip extends Document {

    @Prop({
        required: true,
        length: 3,
        validate: {
            validator: (value: string) => /^[A-Z]{3}$/.test(value),
            message: 'Origin must be a valid IATA code (exactly 3 uppercase letters).'
        }
    })
    origin: string;

    @Prop({
        required: true,
        length: 3,
        validate: {
            validator: (value: string) => /^[A-Z]{3}$/.test(value),
            message: 'Destination must be a valid IATA code (exactly 3 uppercase letters).'
        }
    })
    destination: string;

    @Prop({
        required: true,
        min: 0
    })
    cost: number;

    @Prop({
        required: true,
        min: 0
    })
    duration: number;

    @Prop({
        required: true
    })
    type: string;

    @Prop({
        required: true
    })
    display_name: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);