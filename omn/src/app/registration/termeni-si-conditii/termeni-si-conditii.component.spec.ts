import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermeniSiConditiiComponent } from './termeni-si-conditii.component';

describe('TermeniSiConditiiComponent', () => {
  let component: TermeniSiConditiiComponent;
  let fixture: ComponentFixture<TermeniSiConditiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermeniSiConditiiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermeniSiConditiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
