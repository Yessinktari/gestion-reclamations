import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddARTComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddARTComponent;
  let fixture: ComponentFixture<AddARTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddARTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddARTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
