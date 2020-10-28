import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePhoneNumberInfoComponent } from './change-phone-number-info.component';

describe('ChangePhoneNumberInfoComponent', () => {
  let component: ChangePhoneNumberInfoComponent;
  let fixture: ComponentFixture<ChangePhoneNumberInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhoneNumberInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePhoneNumberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
