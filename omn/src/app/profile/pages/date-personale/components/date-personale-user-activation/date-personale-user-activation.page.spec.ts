import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatePersonaleUserActivationPage } from './date-personale-user-activation.page';

describe('DatePersonaleUserActivationPage', () => {
  let component: DatePersonaleUserActivationPage;
  let fixture: ComponentFixture<DatePersonaleUserActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePersonaleUserActivationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePersonaleUserActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
