import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignMedalComponent } from './asign-medal.component';

describe('AsignMedalComponent', () => {
  let component: AsignMedalComponent;
  let fixture: ComponentFixture<AsignMedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignMedalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
