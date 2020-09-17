import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugestiiPage } from './sugestii.page';

describe('SugestiiPage', () => {
  let component: SugestiiPage;
  let fixture: ComponentFixture<SugestiiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugestiiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SugestiiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
