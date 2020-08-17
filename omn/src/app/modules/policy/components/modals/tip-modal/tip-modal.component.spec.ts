import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipModalComponent } from './tip-modal.component';

describe('TipModalComponent', () => {
  let component: TipModalComponent;
  let fixture: ComponentFixture<TipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
