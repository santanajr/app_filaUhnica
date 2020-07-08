import { Fila , Atendimento } from './../models/Fila';
import { Observable } from 'rxjs/Observable';
import { Estabelecimento } from './../models/estabelecimento';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { FilaComponent } from './../fila/fila.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mainestabelecimento',
  templateUrl: './mainestabelecimento.component.html',
  styleUrls: ['./mainestabelecimento.component.css']
})
export class MainestabelecimentoComponent implements OnInit {

  keyEstabelecimento: String;

  dadosEstab1: Observable<any>;
  dadosfila1: AngularFireList<any[]>;
  dadosColectionfila1: Observable<any[]>;
  dadosColectionkeyfila1: Observable<any[]>;

  dadosEstabelecimentoLogado: Estabelecimento;

  statusfila: Boolean;

  filacomp: FilaComponent;

  filaatendimento: Fila;

  filaarray: Fila[] = new Array();
  filaatendimentoarray: Atendimento[] = new Array();
  dadosColectionfila: Observable<any[]>;


  PrimeiroAtendimento: Atendimento;
  SegundoAtendimento: Atendimento;

  totalatendimentoativosnafilaaberta: number;

  chavefila: String;

  dadosfila2: AngularFireList<any[]>;
  dadosColection2: Observable<any[]>;
  dadosColectionKey2: Observable<any[]>;

  FilaObj: AngularFireObject<any>;


//  constructor(private afire: AngularFireDatabase, private UrlChamada: ActivatedRoute , private fila: FilaComponent )
  constructor(private afire: AngularFireDatabase, private UrlChamada: ActivatedRoute , private rota: Router  )
  {

  }

  ngOnInit(): void
  {
      this.UrlChamada.params.subscribe(params => this.keyEstabelecimento = params['keyEstabelecimento'] );
      this.UrlChamada.params.subscribe(params => this.chavefila = params['keyfila'] );

      //console.log( this.chavefila );

      this.dadosEstab1 = this.afire.object( '/Estabelecimento/'+  this.keyEstabelecimento  ).valueChanges();
      //this.dadosfila1 = this.afire.list( '/Fila/'+  this.chavefila  ).valueChanges();
      //this.dadosfila1 = this.afire.list( '/Fila').valueChanges();

      this.dadosfila2 = this.afire.list('Fila/'+this.chavefila);
      this.dadosColection2 = this.dadosfila2.valueChanges() as Observable<any[]>;
      this.dadosColectionKey2 = this.dadosfila2.snapshotChanges().pipe(
          map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()}))) );

      //this.dadosColectionKey2.subscribe( d =>
      //  {
      //  this.filaatendimentoarray = d;
      //    console.log('----- fila array ----');
      //    console.log(this.filaatendimentoarray);
      //  });

      this.dadosColectionKey2.subscribe( d =>
        {
          this.filaatendimentoarray = d;
          console.log(this.filaatendimentoarray);
          let cont = 0;
          this.PrimeiroAtendimento = undefined;
          this.SegundoAtendimento  = undefined;
          this.totalatendimentoativosnafilaaberta = 0;
          for ( let atend of this.filaatendimentoarray )
          {
            //console.log('atend');
            //console.log(atend);
            if (atend.keyfila !== undefined)
            {

               if (atend.Ativo == 'S')
               {
                  if (cont == 0)
                  {
                      this.PrimeiroAtendimento = atend;
                  }
                  if (cont == 1)
                  {
                      this.SegundoAtendimento = atend;
                  }

                cont = cont + 1;
                this.totalatendimentoativosnafilaaberta = cont;

               }

            }

          }

          console.log('primeiro atendi');
          console.log(this.PrimeiroAtendimento);
          console.log('segundo atendi');
          console.log(this.SegundoAtendimento) ;

          console.log('totalatendimento');
          console.log(this.totalatendimentoativosnafilaaberta);

        }
        );

      this.dadosEstab1.subscribe( d =>
        {
          this.dadosEstabelecimentoLogado = d;
          //this.chavefila = this.dadosEstabelecimentoLogado.keyfila;
          //console.log('chavefila1' + this.chavefila );
          //this.filacomp = new FilaComponent( this.afire, this.filaatendimento );
          //this.filacomp.FilaAtendimento( this.chavefila );

        }

        );
  }

  ComecarDia()
  {

    console.log('Inicio - comecardia');
    this.filacomp = new FilaComponent( this.afire , this.filaatendimento );
    let keyfilaatendimento =  this.filacomp.AdicionarFila( this.keyEstabelecimento,
          this.dadosEstabelecimentoLogado.NomeEstabelecimento );
    console.log('keyatendimento:'+ keyfilaatendimento );
    console.log('Fim - comecardia');

    this.dadosEstabelecimentoLogado.PossuiFila = 'S';
    this.dadosEstabelecimentoLogado.keyfila = keyfilaatendimento;

    this.afire.object('/Estabelecimento/'+this.keyEstabelecimento ).update( this.dadosEstabelecimentoLogado);
    //console.log('Fim - PausarDia');

    this.rota.navigate(['/mainsestabelecimento/'+this.keyEstabelecimento+'/'+keyfilaatendimento ]);


  }

  EncerrarDia()
  {
    this.dadosEstabelecimentoLogado.PossuiFila = 'N';
    //console.log('Inicio - PausarDia');
    this.afire.object('/Estabelecimento/'+ this.keyEstabelecimento ).update( this.dadosEstabelecimentoLogado);

    this.FilaObj = this.afire.object('Fila/'+ this.dadosEstabelecimentoLogado.keyfila );

    let obj: any;
    obj = this.afire.object('Fila/'+ this.dadosEstabelecimentoLogado.keyfila ).snapshotChanges().
        subscribe( d =>
            {
              //console.log('dddddd');
              this.filaatendimento =  d.payload.exportVal();
              console.log('fila');
              console.log( this.filaatendimento );
              this.filaatendimento.StatusFila = 'E';
              this.afire.object('/Fila/'+ this.dadosEstabelecimentoLogado.keyfila ).update( this.filaatendimento );

            }

        );

  }


  PausarDia()
  {
    this.dadosEstabelecimentoLogado.PausaFilsa = 'S';
    //console.log('Inicio - PausarDia');
    this.afire.object('/Estabelecimento/'+this.keyEstabelecimento ).update( this.dadosEstabelecimentoLogado);
    //console.log('Fim - PausarDia');
  }

  BloqueioFila()
  {
    this.dadosEstabelecimentoLogado.BloqueioFila = 'S';
    //console.log('Inicio - PausarDia');
    this.afire.object('/Estabelecimento/'+this.keyEstabelecimento ).update( this.dadosEstabelecimentoLogado);
    //console.log('Fim - PausarDia');
  }

  DesBloqueioFila()
  {
    this.dadosEstabelecimentoLogado.BloqueioFila = 'N';
    //console.log('Inicio - PausarDia');
    this.afire.object('/Estabelecimento/'+this.keyEstabelecimento ).update( this.dadosEstabelecimentoLogado);
    //console.log('Fim - PausarDia');
  }

  DesPausarDia()
  {
    this.dadosEstabelecimentoLogado.PausaFilsa = 'N';
    //console.log('Inicio - PausarDia');
    this.afire.object('/Estabelecimento/'+this.keyEstabelecimento ).update( this.dadosEstabelecimentoLogado);
    //console.log('Fim - PausarDia');
  }

  Atendimento()
  {
    console.log('---- marcar atendimento atual ----');
    this.PrimeiroAtendimento.Ativo = 'S';
    this.PrimeiroAtendimento.AtendimentoAtual = 'S';
    this.afire.object('/Fila/'+this.chavefila+'/'+this.PrimeiroAtendimento.key).update( this.PrimeiroAtendimento );
    console.log('---- atualizar atendimento como atendimento atual ----');
    //console.log('Fim - PausarDia');
  }

  Atendido()
  {
    console.log('---- marcar atendimento como atendido ----');
    this.PrimeiroAtendimento.Ativo = 'A';
    this.PrimeiroAtendimento.AtendimentoAtual = 'N';
    this.afire.object('/Fila/'+this.chavefila+'/'+this.PrimeiroAtendimento.key).update( this.PrimeiroAtendimento );

    this.SegundoAtendimento  = undefined;
    console.log('---- atualizar atendimento como atendido ----');
    //console.log('Fim - PausarDia');
  }


}
