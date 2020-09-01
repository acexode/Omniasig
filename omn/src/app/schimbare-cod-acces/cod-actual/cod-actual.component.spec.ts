import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodActualComponent } from './cod-actual.component';

describe('CodActualComponent', () => {
  let component: CodActualComponent;
  let fixture: ComponentFixture<CodActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodActualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
