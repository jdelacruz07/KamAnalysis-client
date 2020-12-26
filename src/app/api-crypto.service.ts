import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiCryptoService {

  constructor(private http: HttpClient) { }

  getCrypto(cryptoName) {
    return this.http.get(`https://api.coinbase.com/v2/prices/${cryptoName}/buy`)
  }
}
