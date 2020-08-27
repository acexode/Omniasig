import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PetitiiPage } from './petitii.page';

describe('PetitiiPage', () => {
  let component: PetitiiPage;
  let fixture: ComponentFixture<PetitiiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitiiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PetitiiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
