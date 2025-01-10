import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishlistComponent } from './whishlist.component';

describe('WhishlistComponent', () => {
  let component: WhishlistComponent;
  let fixture: ComponentFixture<WhishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhishlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
