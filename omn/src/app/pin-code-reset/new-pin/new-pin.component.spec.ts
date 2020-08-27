import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPinComponent } from './new-pin.component';

describe('NewPinComponent', () => {
  let component: NewPinComponent;
  let fixture: ComponentFixture<NewPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPinComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
