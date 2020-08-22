import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsistentaTechnicaPage } from './asistenta-technica.page';

describe('AsistentaTechnicaPage', () => {
  let component: AsistentaTechnicaPage;
  let fixture: ComponentFixture<AsistentaTechnicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistentaTechnicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistentaTechnicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
