import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDataGridComponent } from './transaction-data-grid.component';

describe('TransactionDataGridComponent', () => {
  let component: TransactionDataGridComponent;
  let fixture: ComponentFixture<TransactionDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDataGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
