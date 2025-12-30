import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevComponent } from './add-rev.component';

describe('AddRevComponent', () => {
  let component: AddRevComponent;
  let fixture: ComponentFixture<AddRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
