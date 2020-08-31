import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutentificareComponent } from './autentificare.component';

describe('AutentificareComponent', () => {
  let component: AutentificareComponent;
  let fixture: ComponentFixture<AutentificareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutentificareComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutentificareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
