import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatePersonaleValidateEmailComponent } from './date-personale-validate-email.component';

describe('DatePersonaleValidateEmailComponent', () => {
  let component: DatePersonaleValidateEmailComponent;
  let fixture: ComponentFixture<DatePersonaleValidateEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePersonaleValidateEmailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePersonaleValidateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
