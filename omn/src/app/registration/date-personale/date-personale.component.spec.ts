import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatePersonaleComponent } from './date-personale.component';

describe('DatePersonaleComponent', () => {
  let component: DatePersonaleComponent;
  let fixture: ComponentFixture<DatePersonaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePersonaleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
