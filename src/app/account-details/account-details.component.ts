import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountDetailsService } from '../services/AccountDetailsService';
import { TransactionService } from '../services/transactionservice';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetails: any;
  transactionHistory: any[] = [];
  displayedTransactions: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 30;

  constructor(
    private route: ActivatedRoute,
    private accountDetailsService: AccountDetailsService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const accountNumber = this.route.snapshot.paramMap.get('accountNumber');
    this.getAccountDetails(accountNumber);
  }

  getAccountDetails(accountNumber: string | null): void {
    if (accountNumber) {
      this.accountDetailsService.getAccountDetails(accountNumber).subscribe(
        (data) => {
          this.accountDetails = data[0];
          this.loadTransactionHistory(accountNumber);
        },
        (error) => {
          console.error('Error fetching account details:', error);
        }
      );
    } else {
      console.error('Account number is invalid.');
    }
  }

  loadTransactionHistory(accountNumber: string): void {
    this.loading = true;
    this.transactionService.getTransactionsForAccount(accountNumber).subscribe(
      (data) => {
        this.transactionHistory = data;
        this.updateDisplayedTransactions();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching transaction history:', error);
        this.loading = false;
      }
    );
  }

  applySearch(): void {
    this.updateDisplayedTransactions();
    this.currentPage = 1; // Reset current page after filtering
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedTransactions();
    }
  }
  
  nextPage(): void {
    const totalPages = Math.ceil(this.transactionHistory.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedTransactions();
    }
  }
  
  updateDisplayedTransactions(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.transactionHistory.length);
    this.displayedTransactions = this.transactionHistory.slice(startIndex, endIndex);
  }
  
}
