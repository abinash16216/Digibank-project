// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-transfers',
//   templateUrl: './transfers.component.html',
//   styleUrls: ['./transfers.component.css']
// })
// export class TransfersComponent {
//   transferForm: FormGroup;
//   accounts: any[] = [];

//   constructor(private formBuilder: FormBuilder, private http: HttpClient) {
//     this.transferForm = this.formBuilder.group({
//       sourceAccount: ['', Validators.required],
//       destinationAccount: ['', Validators.required],
//       amount: [0, [Validators.required, Validators.min(1)]],
//       transferDate: ['', Validators.required]
//     });
//     this.fetchAccounts();
//   }

//   fetchAccounts(): void {
//     this.http.get<any[]>('http://localhost:3000/accounts')
//       .subscribe(
//         (response) => {
//           this.accounts = response;
//         },
//         (error) => {
//           console.error('Error fetching accounts:', error);
//         }
//       );
//   }

//   transferFunds(): void {
//     if (this.transferForm.valid) {
//       const transferData = this.transferForm.value;

//       this.http.post('http://localhost:3000/transactions', transferData)
//         .subscribe(
//           (response: any) => {
//             alert('Transfer successful');
//           },
//           (error) => {
//             alert('Error in transferring funds');
//           }
//         );
//     } else {
//       alert('Invalid form data. Please check the fields.');
//     }
//   }

// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent {
  transferForm: FormGroup;
  accounts: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.transferForm = this.formBuilder.group({
      sourceAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      transferDate: ['', Validators.required]
    });
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.http.get<any[]>('http://localhost:3000/accounts')
      .subscribe(
        (response) => {
          this.accounts = response;
        },
        (error) => {
          console.error('Error fetching accounts:', error);
        }
      );
  }

  transferFunds(): void {
    if (this.transferForm.valid) {
      const transferData = this.transferForm.value;

      const sourceAccount = this.accounts.find(
        acc => acc.accountNumber === transferData.sourceAccount
      );

      if (sourceAccount) {
        if (sourceAccount.availableBalance >= transferData.amount) {
          sourceAccount.availableBalance -= transferData.amount;

          this.http.put(`http://localhost:3000/accounts/${sourceAccount.id}`, sourceAccount)
            .subscribe(
              () => {
                this.http.post('http://localhost:3000/transactions', transferData)
                  .subscribe(
                    () => {
                      alert('Transfer successful');
                      this.fetchAccounts(); // Refresh account data after transfer
                    },
                    () => {
                      alert('Error in transferring funds');
                    }
                  );
              },
              () => {
                alert('Error updating source account balance');
              }
            );
        } else {
          alert('Insufficient balance in the source account');
        }
      } else {
        alert('Source account not found');
      }
    } else {
      alert('Invalid form data. Please check the fields.');
    }
  }
}
