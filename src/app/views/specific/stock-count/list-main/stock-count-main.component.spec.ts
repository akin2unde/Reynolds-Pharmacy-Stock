import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCountMainComponent } from './stock-count-main.component';

describe('StockCountMainComponent', () => {
  let component: StockCountMainComponent;
  let fixture: ComponentFixture<StockCountMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCountMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCountMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
