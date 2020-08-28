import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetariPage } from './setari.page';

describe('SetariPage', () => {
  let component: SetariPage;
  let fixture: ComponentFixture<SetariPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetariPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
