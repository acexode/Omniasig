import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmCodDeAccesComponent } from './confirm-cod-de-acces.component';

describe('ConfirmCodDeAccesComponent', () => {
  let component: ConfirmCodDeAccesComponent;
  let fixture: ComponentFixture<ConfirmCodDeAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCodDeAccesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCodDeAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
