import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegInputSmsComponent } from './reg-input-sms.component';

describe('RegInputSmsComponent', () => {
  let component: RegInputSmsComponent;
  let fixture: ComponentFixture<RegInputSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegInputSmsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegInputSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
