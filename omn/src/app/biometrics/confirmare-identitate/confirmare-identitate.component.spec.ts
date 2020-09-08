import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmareIdentitateComponent } from './confirmare-identitate.component';

describe('ConfirmareIdentitateComponent', () => {
  let component: ConfirmareIdentitateComponent;
  let fixture: ComponentFixture<ConfirmareIdentitateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmareIdentitateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmareIdentitateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
