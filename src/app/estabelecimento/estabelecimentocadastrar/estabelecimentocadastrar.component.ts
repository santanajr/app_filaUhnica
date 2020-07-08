import { EstabelecimentoService, EstabelecimentoDataService } from './../../services/estabelecimento.service';
import { BehaviorSubject } from 'rxjs';
import { Estabelecimento } from './../../models/estabelecimento';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estabelecimentocadastrar',
  templateUrl: './estabelecimentocadastrar.component.html',
  styleUrls: ['./estabelecimentocadastrar.component.css']
})

export class EstabelecimentocadastrarComponent implements OnInit
{
  Estabel: Estabelecimento;
  key: string = '';

  //constructor( private serviceestab: EstabelecimentoService  )
  //constructor(   )
  constructor(private afire: AngularFireDatabase, private DataSourceEstab: EstabelecimentoDataService )
  {


  }

  ngOnInit(): void
  {
   // this.dados = this.afire.list('/Estabelecimento');
   // this.dadosColection = this.dados.valueChanges() as Observable<any[]>;

   // this.dadosColectionKey = this.dados.snapshotChanges().pipe(
   //     map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()}))) );

   // console.log('passou aqui 2');
   // console.log(this.dados );
    this.Estabel = new Estabelecimento();
    this.DataSourceEstab.currentEstabelecimento.subscribe
      (  data =>
          {
             if (data.estab && data.key )
             {
                 this.Estabel = new Estabelecimento();
                 this.Estabel.Celular = data.estab.Celular;
                 this.Estabel.Email   = data.estab.Email;
                 this.Estabel.IdEstabelecimento = '0';
                 this.Estabel.NomeEstabelecimento = data.estab.NomeEstabelecimento;
                 this.Estabel.PossuiFila = data.estab.PossuiFila;
                 this.Estabel.TamanhoMaximoFila = data.estab.TamanhoMaximoFila;
                 this.Estabel.TempoMedio = data.estab.TempoMedio;
                 this.Estabel.Senha = data.estab.Senha;
                 this.key = data.key;
             }
          }
      );

  }


  onSubmit()
  {


    console.log(this.Estabel);
    this.afire.list('Estabelecimento').push(this.Estabel);
    this.Estabel = new Estabelecimento();

  }




}
