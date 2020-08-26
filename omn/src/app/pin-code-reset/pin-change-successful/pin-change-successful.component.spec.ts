import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PinChangeSuccessfulComponent } from './pin-change-successful.component';

describe('PinChangeSuccessfulComponent', () => {
  let component: PinChangeSuccessfulComponent;
  let fixture: ComponentFixture<PinChangeSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinChangeSuccessfulComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PinChangeSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
