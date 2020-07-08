import { Injectable } from '@angular/core';
import { Atendimento } from './../models/Fila';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AtendimentoDataService 
{
  private AtendimentoSource = new BehaviorSubject({ atend: null, key: '' });
  currentAtendimento = this.AtendimentoSource.asObservable();

  constructor()
  {


  }

  changeAtendimento(atend: Atendimento, key: string) {
    this.AtendimentoSource.next({ atend: atend, key: key });
  }
}



export class AtendimentoService {

  constructor() { }
}
