import { Estabelecimento } from './../models/estabelecimento';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstabelecimentoDataService 
{
  private EstabelecimentoSource = new BehaviorSubject({ estab: null, key: '' });
  currentEstabelecimento = this.EstabelecimentoSource.asObservable();

  constructor()
  {


  }

  changeEstabelecimento(estab: Estabelecimento, key: string) {
    this.EstabelecimentoSource.next({ estab: estab, key: key });
  }
}

export class EstabelecimentoService {

  estabList: AngularFireList<any>;
  no: string;

  constructor( private dba: AngularFireDatabase ) 
  {
    this.no = 'Estabelecimento';
  }

  getAll() {
    //this.estabList = this.db.list("Estabelecimento");
    //return this.estabList.snapshotChanges();
    return this.dba.list(this.no)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

  insert(est: Estabelecimento)
  {
      this.dba.list(this.no).push(est);
  }

  update(est: Estabelecimento, key: string)
  {
    this.dba.list(this.no).update(key, est);
  }

  delete(key: string)
  {
    this.dba.object(this.no + '/${key}').remove();
  }

}
