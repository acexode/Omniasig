import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayModalComponent } from './payment-pay-modal.component';

describe('PaymentPayModalComponent', () => {
  let component: PaymentPayModalComponent;
  let fixture: ComponentFixture<PaymentPayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
