import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegisPagoComponent } from './crear-regis-pago.component';

describe('CrearRegisPagoComponent', () => {
  let component: CrearRegisPagoComponent;
  let fixture: ComponentFixture<CrearRegisPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRegisPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRegisPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
