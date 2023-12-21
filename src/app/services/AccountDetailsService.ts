// account-details.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
  private apiUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  getAccountDetails(accountNumber: string): Observable<any> {
    const url = `${this.apiUrl}?accountNumber=${accountNumber}`;
    return this.http.get<any>(url);
  }
}
