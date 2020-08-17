import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumarTelefonComponent } from './numar-telefon.component';

describe('NumarTelefonComponent', () => {
  let component: NumarTelefonComponent;
  let fixture: ComponentFixture<NumarTelefonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumarTelefonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumarTelefonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
