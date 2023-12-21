import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { TransactionDataGridComponent } from './transaction-data-grid/transaction-data-grid.component';
import { TransfersComponent } from './transfers/transfers.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'account-summary', component: AccountSummaryComponent },
  { path: 'transaction-data-grid', component: TransactionDataGridComponent },
  { path: 'transfer', component: TransfersComponent },
  { path: 'account-detail/:accountNumber', component: AccountDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
