import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsistentaPage } from './asistenta.page';

describe('AsistentaPage', () => {
  let component: AsistentaPage;
  let fixture: ComponentFixture<AsistentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
