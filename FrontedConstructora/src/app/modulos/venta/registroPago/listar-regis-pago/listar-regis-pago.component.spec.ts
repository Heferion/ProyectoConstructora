import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegisPagoComponent } from './listar-regis-pago.component';

describe('ListarRegisPagoComponent', () => {
  let component: ListarRegisPagoComponent;
  let fixture: ComponentFixture<ListarRegisPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRegisPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRegisPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
