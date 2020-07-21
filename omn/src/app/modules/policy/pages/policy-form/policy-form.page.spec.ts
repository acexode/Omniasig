import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyFormPage } from './policy-form.page';

describe('PolicyFormPage', () => {
  let component: PolicyFormPage;
  let fixture: ComponentFixture<PolicyFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
