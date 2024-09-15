import { Test, TestingModule } from '@nestjs/testing';
import { AxiosAdapter } from './axios.adapter';
import { ExceptionHandlerService } from '../services/exception-handler.service';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

// Mock de ExceptionHandlerService
const mockExceptionHandlerService = {
  handleExceptions: jest.fn(),
};

// Mock manual de AxiosInstance
const mockAxiosInstance = {
  get: jest.fn(),
} as unknown as AxiosInstance;

describe('AxiosAdapter', () => {
  let adapter: AxiosAdapter;
  let exceptionHandlerService: ExceptionHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AxiosAdapter,
        { provide: ExceptionHandlerService, useValue: mockExceptionHandlerService },
        // Usamos una inyección de dependencia personalizada si es necesario
        { provide: 'AXIOS_INSTANCE', useValue: mockAxiosInstance },
      ],
    }).compile();

    adapter = module.get<AxiosAdapter>(AxiosAdapter);
    exceptionHandlerService = module.get<ExceptionHandlerService>(ExceptionHandlerService);

    // Asegúrate de que el adaptador usa el mock
    adapter['axios'] = mockAxiosInstance; // Reemplaza la instancia de axios con el mock
  });

  describe('get', () => {
    it('should return data when request is successful', async () => {
      const url = 'https://api.example.com/data';
      const config: AxiosRequestConfig = { headers: { 'Authorization': 'Bearer token' } };
      const mockData = { key: 'value' };

      // Configura el mock para que devuelva datos simulados
      (mockAxiosInstance.get as jest.Mock).mockResolvedValue({ data: mockData });

      // Llama al método `get` del adaptador
      const result = await adapter.get(url, config);

      // Verifica que el método `get` del mock fue llamado con los parámetros correctos
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, config);
      expect(result).toEqual(mockData);
    });

    it('should call exceptionHandlerService.handleExceptions on error', async () => {
      const url = 'https://api.example.com/data';
      const config: AxiosRequestConfig = { headers: { 'Authorization': 'Bearer token' } };
      const mockError = new Error('Request failed');

      (mockAxiosInstance.get as jest.Mock).mockRejectedValue(mockError);

      await expect(adapter.get(url, config)).resolves.toBeUndefined();
      expect(exceptionHandlerService.handleExceptions).toHaveBeenCalledWith(mockError);
    });
  });
});
