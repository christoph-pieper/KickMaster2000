import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySeasonComponent } from './modify-season.component';

describe('ModifySeasonComponent', () => {
  let component: ModifySeasonComponent;
  let fixture: ComponentFixture<ModifySeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
