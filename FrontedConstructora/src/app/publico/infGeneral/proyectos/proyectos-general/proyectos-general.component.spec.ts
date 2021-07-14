import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosGeneralComponent } from './proyectos-general.component';

describe('ProyectosGeneralComponent', () => {
  let component: ProyectosGeneralComponent;
  let fixture: ComponentFixture<ProyectosGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
