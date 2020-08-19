import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExclusionSlidesComponent } from './exclusion-slides.component';

describe('ExclusionSlidesComponent', () => {
  let component: ExclusionSlidesComponent;
  let fixture: ComponentFixture<ExclusionSlidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusionSlidesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExclusionSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
