import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecuperarePasscodeCodComponent } from './recuperare-passcode-cod.component';

describe('RecuperarePasscodeCodComponent', () => {
  let component: RecuperarePasscodeCodComponent;
  let fixture: ComponentFixture<RecuperarePasscodeCodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarePasscodeCodComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarePasscodeCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
