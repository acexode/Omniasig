import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatePersonaleFormComponent } from './date-personale-form.component';

describe('DatePersonaleFormComponent', () => {
  let component: DatePersonaleFormComponent;
  let fixture: ComponentFixture<DatePersonaleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePersonaleFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePersonaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
