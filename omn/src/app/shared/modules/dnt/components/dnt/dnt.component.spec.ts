import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DntComponent } from './dnt.component';

describe('DntComponent', () => {
  let component: DntComponent;
  let fixture: ComponentFixture<DntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DntComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
