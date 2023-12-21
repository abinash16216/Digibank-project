import { Component, OnInit } from '@angular/core';
import { SummaryFetchService } from '../services/fetch-account-summary';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {
  accounts: any[] = [];
constructor ( private summaryfetchservice :SummaryFetchService){}

ngOnInit():void{
  this.summaryfetchservice.getAccounts().subscribe(
    (data)=>{
      this.accounts=data;
    },
    error=>{
      alert('Error fetching accounts.')
    }
  )
}

}
