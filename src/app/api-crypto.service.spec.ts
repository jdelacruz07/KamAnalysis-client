import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { ApiCryptoService } from './api-crypto.service';

describe('ApiCryptoService', () => {
  let service: ApiCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ApiCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
