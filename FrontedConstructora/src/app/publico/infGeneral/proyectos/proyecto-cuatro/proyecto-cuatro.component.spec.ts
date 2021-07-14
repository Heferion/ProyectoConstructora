import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoCuatroComponent } from './proyecto-cuatro.component';

describe('ProyectoCuatroComponent', () => {
  let component: ProyectoCuatroComponent;
  let fixture: ComponentFixture<ProyectoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoCuatroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
