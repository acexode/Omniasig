import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocuintePage } from './locuinte.page';

describe('LocuintePage', () => {
  let component: LocuintePage;
  let fixture: ComponentFixture<LocuintePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocuintePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocuintePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
