import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokalComponent } from './pokal.component';

describe('PokalComponent', () => {
  let component: PokalComponent;
  let fixture: ComponentFixture<PokalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
