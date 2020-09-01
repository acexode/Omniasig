import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentPagePage } from './document-page.page';

describe('DocumentPagePage', () => {
  let component: DocumentPagePage;
  let fixture: ComponentFixture<DocumentPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
