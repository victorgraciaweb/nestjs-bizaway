import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { ExceptionHandlerService } from './services/exception-handler.service';

@Module({
    providers: [
        AxiosAdapter,
        ExceptionHandlerService
    ],
    exports: [
        AxiosAdapter,
        ExceptionHandlerService
    ]
})
export class CommonModule { }