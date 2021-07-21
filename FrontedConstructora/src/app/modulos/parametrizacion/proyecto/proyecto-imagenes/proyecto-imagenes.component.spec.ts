import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoImagenesComponent } from './proyecto-imagenes.component';

describe('ProyectoImagenesComponent', () => {
  let component: ProyectoImagenesComponent;
  let fixture: ComponentFixture<ProyectoImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoImagenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
