import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoFormComponent } from './cartao-form.component';

describe('CartaoFormComponent', () => {
  let component: CartaoFormComponent;
  let fixture: ComponentFixture<CartaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
