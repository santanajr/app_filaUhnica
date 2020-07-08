import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainestabelecimentoComponent } from './mainestabelecimento.component';

describe('MainestabelecimentoComponent', () => {
  let component: MainestabelecimentoComponent;
  let fixture: ComponentFixture<MainestabelecimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainestabelecimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainestabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
