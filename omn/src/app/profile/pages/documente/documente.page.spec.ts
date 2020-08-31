import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentePage } from './documente.page';

describe('DocumentePage', () => {
  let component: DocumentePage;
  let fixture: ComponentFixture<DocumentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
