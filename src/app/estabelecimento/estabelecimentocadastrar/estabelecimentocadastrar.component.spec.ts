import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentocadastrarComponent } from './estabelecimentocadastrar.component';

describe('EstabelecimentocadastrarComponent', () => {
  let component: EstabelecimentocadastrarComponent;
  let fixture: ComponentFixture<EstabelecimentocadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentocadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentocadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
