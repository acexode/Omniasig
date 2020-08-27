import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CnpDigitsComponent } from './cnp-digits.component';

describe('CnpDigitsComponent', () => {
  let component: CnpDigitsComponent;
  let fixture: ComponentFixture<CnpDigitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnpDigitsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CnpDigitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
