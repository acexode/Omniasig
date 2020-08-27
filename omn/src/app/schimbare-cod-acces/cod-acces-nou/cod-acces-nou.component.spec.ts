import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodAccesNouComponent } from './cod-acces-nou.component';

describe('CodAccesNouComponent', () => {
  let component: CodAccesNouComponent;
  let fixture: ComponentFixture<CodAccesNouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodAccesNouComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodAccesNouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
