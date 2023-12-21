
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getTransactionsForAccount(accountNumber: string): Observable<any[]> {
    const url = `${this.apiUrl}?sourceAccount=${accountNumber}`;
    return this.http.get<any[]>(url);
  }
}
