import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasontableComponent } from './seasontable.component';

describe('SeasontableComponent', () => {
  let component: SeasontableComponent;
  let fixture: ComponentFixture<SeasontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
