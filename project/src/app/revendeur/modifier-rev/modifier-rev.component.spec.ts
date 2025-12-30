import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRevComponent } from './modifier-rev.component';

describe('ModifierRevComponent', () => {
  let component: ModifierRevComponent;
  let fixture: ComponentFixture<ModifierRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierRevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
