import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { EstabelecimentoDataService } from './../../services/estabelecimento.service';
import { Estabelecimento } from './../../models/estabelecimento';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EstabelecimentoService } from './../../../../src/app/services/estabelecimento.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  //dados: Observable<any>;
  estab = [];
  dados: AngularFireList<any[]>;

  dadosColection: Observable<any[]>;
  dadosColectionKey: Observable<any[]>;

  //constructor(private  service: EstabelecimentoService, private estabdataservice: EstabelecimentoDataService )
  //constructor(private  service: EstabelecimentoService  )
  constructor(private afire: AngularFireDatabase)
  {
    console.log('passou aqui 1');

  }

  ngOnInit()
  {
    //this.dados = this.service.getAll();
    this.dados = this.afire.list('/Estabelecimento');
    this.dadosColection = this.dados.valueChanges() as Observable<any[]>;

    this.dadosColectionKey = this.dados.snapshotChanges().pipe(
        map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()}))) );

    console.log('passou aqui 2');
    console.log(this.dados );
  }

}
