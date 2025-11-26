import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealidadAumentadaPage } from './realidad-aumentada.page';

describe('RealidadAumentadaPage', () => {
  let component: RealidadAumentadaPage;
  let fixture: ComponentFixture<RealidadAumentadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RealidadAumentadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
