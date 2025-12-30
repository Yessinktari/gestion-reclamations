import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTechComponent } from './modifier-tech.component';

describe('ModifierTechComponent', () => {
  let component: ModifierTechComponent;
  let fixture: ComponentFixture<ModifierTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
