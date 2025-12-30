import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServComponent } from './add-serv.component';

describe('AddServComponent', () => {
  let component: AddServComponent;
  let fixture: ComponentFixture<AddServComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
