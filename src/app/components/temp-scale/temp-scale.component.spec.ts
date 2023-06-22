import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempScaleComponent } from './temp-scale.component';

describe('TempScaleComponent', () => {
  let component: TempScaleComponent;
  let fixture: ComponentFixture<TempScaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempScaleComponent]
    });
    fixture = TestBed.createComponent(TempScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
