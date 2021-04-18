import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRegisPagoComponent } from './eliminar-regis-pago.component';

describe('EliminarRegisPagoComponent', () => {
  let component: EliminarRegisPagoComponent;
  let fixture: ComponentFixture<EliminarRegisPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarRegisPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRegisPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
