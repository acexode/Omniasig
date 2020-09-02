import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmareCodAccesComponent } from './confirmare-cod-acces.component';

describe('ConfirmareCodAccesComponent', () => {
  let component: ConfirmareCodAccesComponent;
  let fixture: ComponentFixture<ConfirmareCodAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmareCodAccesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmareCodAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
