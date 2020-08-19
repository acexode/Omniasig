import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CesiuneFormComponent } from './cesiune-form.component';

describe('CesiuneFormComponent', () => {
  let component: CesiuneFormComponent;
  let fixture: ComponentFixture<CesiuneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesiuneFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CesiuneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
