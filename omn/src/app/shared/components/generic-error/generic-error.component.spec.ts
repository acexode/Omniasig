import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenericErrorComponent } from './generic-error.component';

describe('GenericErrorComponent', () => {
  let component: GenericErrorComponent;
  let fixture: ComponentFixture<GenericErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericErrorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
