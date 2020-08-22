import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsistentaModalPagePage } from './asistenta-modal-page.page';

describe('AsistentaModalPagePage', () => {
  let component: AsistentaModalPagePage;
  let fixture: ComponentFixture<AsistentaModalPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistentaModalPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistentaModalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
