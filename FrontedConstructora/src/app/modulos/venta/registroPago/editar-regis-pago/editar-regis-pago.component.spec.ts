import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRegisPagoComponent } from './editar-regis-pago.component';

describe('EditarRegisPagoComponent', () => {
  let component: EditarRegisPagoComponent;
  let fixture: ComponentFixture<EditarRegisPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRegisPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRegisPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
