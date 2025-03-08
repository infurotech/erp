import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsComponent } from './leads.component';

describe('LeadsComponent', () => {
  let component: LeadsComponent;
  let fixture: ComponentFixture<LeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
