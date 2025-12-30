import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendeurComponent } from './revendeur.component';

describe('RevendeurComponent', () => {
  let component: RevendeurComponent;
  let fixture: ComponentFixture<RevendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevendeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
