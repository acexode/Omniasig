import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyAddressFormComponent } from './policy-address-form.component';

describe('PolicyAddressFormComponent', () => {
  let component: PolicyAddressFormComponent;
  let fixture: ComponentFixture<PolicyAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAddressFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
