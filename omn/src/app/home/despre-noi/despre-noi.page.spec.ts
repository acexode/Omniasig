import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DespreNoiPage } from './despre-noi.page';

describe('DespreNoiPage', () => {
  let component: DespreNoiPage;
  let fixture: ComponentFixture<DespreNoiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespreNoiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DespreNoiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
