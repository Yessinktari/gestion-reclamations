import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierServComponent } from './modifier-serv.component';

describe('ModifierServComponent', () => {
  let component: ModifierServComponent;
  let fixture: ComponentFixture<ModifierServComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierServComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
