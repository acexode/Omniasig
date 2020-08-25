import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegNumarTelefonComponent } from './reg-numar-telefon.component';

describe('RegNumarTelefonComponent', () => {
  let component: RegNumarTelefonComponent;
  let fixture: ComponentFixture<RegNumarTelefonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNumarTelefonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegNumarTelefonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
