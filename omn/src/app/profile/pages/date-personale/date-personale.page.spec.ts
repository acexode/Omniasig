import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatePersonalePage } from './date-personale.page';

describe('DatePersonalePage', () => {
  let component: DatePersonalePage;
  let fixture: ComponentFixture<DatePersonalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePersonalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePersonalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
