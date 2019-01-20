import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTableComponent } from './table.component';

describe('TableTableComponent', () => {
  let component: TableTableComponent;
  let fixture: ComponentFixture<TableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
