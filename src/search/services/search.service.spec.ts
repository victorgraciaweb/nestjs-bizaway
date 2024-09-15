import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { MappingService } from 'src/common/services/mapping.service';
import { SearchTripDto } from '../dto';

describe('SearchService', () => {
    let service: SearchService;
    let httpMock: AxiosAdapter;
    let mappingServiceMock: MappingService;
    let exceptionHandlerMock: ExceptionHandlerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchService,
                {
                    provide: AxiosAdapter,
                    useValue: {
                        get: jest.fn(), // Mock de AxiosAdapter
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            switch (key) {
                                case 'urlBizaway':
                                    return 'http://api.bizaway.com/trips';
                                case 'apiKeyBizaway':
                                    return 'dummy-api-key';
                                default:
                                    return null;
                            }
                        }),
                    },
                },
                {
                    provide: ExceptionHandlerService,
                    useValue: {
                        handleExceptions: jest.fn(),
                    },
                },
                {
                    provide: MappingService,
                    useValue: {
                        mapToResponseSearchTripDto: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<SearchService>(SearchService);
        httpMock = module.get<AxiosAdapter>(AxiosAdapter);
        mappingServiceMock = module.get<MappingService>(MappingService);
        exceptionHandlerMock = module.get<ExceptionHandlerService>(ExceptionHandlerService);
    });

    it('should call http.get and return mapped trips', async () => {
        // Arrange
        const searchTripDto: SearchTripDto = {
            origin: 'NYC',
            destination: 'LAX',
            sort_by: 'fastest',
        };

        const mockResponse = [
            { origin: 'FRA', destination: 'BCN', cost: 559, duration: 5, type: 'car', id: '18c80f09-2e29-499a-aba1-98c20a856244', display_name: 'from FRA to BCN by car' },
            { origin: 'FRA', destination: 'BCN', cost: 983, duration: 6, type: 'train', id: 'd96f711a-8aae-44fe-9c04-5d10ed36c052', display_name: 'from FRA to BCN by train' },
        ];

        const mappedResponse = [
            { id: '18c80f09-2e29-499a-aba1-98c20a856244', origin: 'NYC', destination: 'LAX', cost: 100, duration: 300, type: 'car', display_name: 'Trip 1' },
            { id: 'd96f711a-8aae-44fe-9c04-5d10ed36c052', origin: 'NYC', destination: 'LAX', cost: 450, duration: 200, type: 'car', display_name: 'Trip 2' },
        ];

        jest.spyOn(httpMock, 'get').mockResolvedValue(mockResponse);
        jest.spyOn(mappingServiceMock, 'mapToResponseSearchTripDto').mockReturnValue(mappedResponse);

        // Act
        const result = await service.findTrips(searchTripDto);

        // Assert
        expect(httpMock.get).toHaveBeenCalledWith('http://api.bizaway.com/trips', {
            headers: { 'x-api-key': 'dummy-api-key' },
            params: { origin: 'NYC', destination: 'LAX' },
        });
        expect(mappingServiceMock.mapToResponseSearchTripDto).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mappedResponse);
    });


    it('should call http.get and return mapped trips', async () => {
        // Arrange
        const searchTripDto: SearchTripDto = {
            origin: 'NYC',
            destination: 'LAX',
            sort_by: 'cheapest',
        };

        const mockResponse = [
            { origin: 'FRA', destination: 'BCN', cost: 559, duration: 5, type: 'car', id: '18c80f09-2e29-499a-aba1-98c20a856244', display_name: 'from FRA to BCN by car' },
            { origin: 'FRA', destination: 'BCN', cost: 983, duration: 6, type: 'train', id: 'd96f711a-8aae-44fe-9c04-5d10ed36c052', display_name: 'from FRA to BCN by train' },
        ];

        const mappedResponse = [
            { id: '18c80f09-2e29-499a-aba1-98c20a856244', origin: 'NYC', destination: 'LAX', cost: 100, duration: 300, type: 'car', display_name: 'Trip 1' },
            { id: 'd96f711a-8aae-44fe-9c04-5d10ed36c052', origin: 'NYC', destination: 'LAX', cost: 450, duration: 200, type: 'car', display_name: 'Trip 2' },
        ];

        jest.spyOn(httpMock, 'get').mockResolvedValue(mockResponse);
        jest.spyOn(mappingServiceMock, 'mapToResponseSearchTripDto').mockReturnValue(mappedResponse);

        // Act
        const result = await service.findTrips(searchTripDto);

        // Assert
        expect(httpMock.get).toHaveBeenCalledWith('http://api.bizaway.com/trips', {
            headers: { 'x-api-key': 'dummy-api-key' },
            params: { origin: 'NYC', destination: 'LAX' },
        });
        expect(mappingServiceMock.mapToResponseSearchTripDto).toHaveBeenCalledWith(mockResponse);
        expect(result).toEqual(mappedResponse);
    });


    it('should call ExceptionHandlerService on error', async () => {
        // Arrange
        const searchTripDto: SearchTripDto = {
            origin: 'NYC',
            destination: 'LAX',
            sort_by: 'fastest',
        };

        const apiError = new Error('API Error');
        jest.spyOn(httpMock, 'get').mockRejectedValue(apiError);
        
        // Act
        await service.findTrips(searchTripDto).catch((error) => {
            // Assert
            expect(exceptionHandlerMock.handleExceptions).toHaveBeenCalledWith(apiError);
            expect(error).toEqual(apiError); // Asegúrate de que el error sea lanzado como se espera
        });
    });
});
