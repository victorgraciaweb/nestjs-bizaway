import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { ExceptionHandlerService } from './services/exception-handler.service';
import { MappingService } from './services/mapping.service';

@Module({
    providers: [
        AxiosAdapter,
        ExceptionHandlerService,
        MappingService
    ],
    exports: [
        AxiosAdapter,
        ExceptionHandlerService,
        MappingService
    ]
})
export class CommonModule { }