import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesListComponent } from './cartoes-list.component';

describe('CartoesListComponent', () => {
  let component: CartoesListComponent;
  let fixture: ComponentFixture<CartoesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartoesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
