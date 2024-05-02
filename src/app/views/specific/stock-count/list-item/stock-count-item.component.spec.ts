import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCountItemComponent } from './stock-count-item.component';

describe('StockCountItemComponent', () => {
  let component: StockCountItemComponent;
  let fixture: ComponentFixture<StockCountItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCountItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
