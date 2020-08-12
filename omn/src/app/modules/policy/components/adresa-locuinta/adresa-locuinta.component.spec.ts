import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdresaLocuintaComponent } from './adresa-locuinta.component';

describe('AdresaLocuintaComponent', () => {
  let component: AdresaLocuintaComponent;
  let fixture: ComponentFixture<AdresaLocuintaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdresaLocuintaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdresaLocuintaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
