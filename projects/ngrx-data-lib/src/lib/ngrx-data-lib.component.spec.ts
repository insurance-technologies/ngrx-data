import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataLibComponent } from './ngrx-data-lib.component';

describe('NgrxDataLibComponent', () => {
  let component: NgrxDataLibComponent;
  let fixture: ComponentFixture<NgrxDataLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxDataLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxDataLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
