import { Fila , Atendimento  } from './../models/Fila';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe, formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit
{

  atendimento1: Atendimento ;
  atendimento2: Atendimento ;
  totalatendimento: number ;
  listaatendimento: Atendimento[] = new Array();

  dados: AngularFireList<any[]>;
  dadosColection: Observable<any[]>;
  dadosColectionKey: Observable<any[]>;

  chavefila: String;

  constructor(private afire: AngularFireDatabase , private filaatendimento: Fila )
  {

  }

  ngOnInit(): void
  {

  }

  AdicionarFila(keyestabelecimento: String , NomeEstabelecimento: String ): String
  {
    console.log('Adicionar Fila');
    this.filaatendimento = new Fila();
    console.log(this.filaatendimento);
    this.filaatendimento.keyEstabelecimento   = keyestabelecimento;
    this.filaatendimento.NomeEstabelecimento  = NomeEstabelecimento;
    this.filaatendimento.DataAtendimento      = formatDate(  Date.now() , 'dd/MM/yyyy' , 'en-US' , '+530' );
    this.filaatendimento.StatusFila = 'A';
    var filakey = this.afire.list('Fila').push(this.filaatendimento);
    console.log(this.filaatendimento);
    console.log( filakey );

    return filakey.key;
  }

  FilaAtendimento( chavefila: String )
  {
      console.log(chavefila);
      this.chavefila = chavefila;
      this.dados = this.afire.list('Fila/'+this.chavefila);
      this.dadosColection = this.dados.valueChanges() as Observable<any[]>;
      this.dadosColectionKey = this.dados.snapshotChanges().pipe(
          map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()}))) );
      this.SetPrimeiroAtendimento();
      //this.Settotalatendimento();
      console.log('total ate:');
      console.log(this.totalatendimento);
  }

  GetPrimeiroAtendimento():Atendimento
  {
     return this.atendimento1;
  }


  SetPrimeiroAtendimento()
  {
      this.dadosColectionKey.subscribe( d =>
      {
        this.totalatendimento = 0;
        this.listaatendimento = d;
        let cont = 0;
        for ( let atend of this.listaatendimento )
        {
          if (atend.keyfila !== undefined)
          {
              if (cont == 0)
                {
                    this.atendimento1 = atend;
                }

            cont = cont + 1;
            this.totalatendimento = cont;
          }

        }

        console.log( 'primeiro atendimento' + this.chavefila );
        console.log( this.atendimento1 );
        console.log('total atendimento');
        console.log( this.totalatendimento );
      }
    );
    //return this.atendimento1;

  }

  GetSegundoAtendimento():Atendimento
  {

    this.dadosColectionKey.subscribe( d =>
      {
        //console.log(d);
        this.totalatendimento = 0;
        this.listaatendimento = d;
        let cont = 0;
        for ( let atend of this.listaatendimento )
        {
          if (atend.keyfila !== undefined)
          {
              if (cont == 1)
                {
                    console.log('atendimento 1' );
                    this.atendimento2 = atend;
                    console.log( this.atendimento1 );

                }
          }
        }
      }
    );


    return this.atendimento2;
  }

  Settotalatendimento()
  {

    this.dadosColectionKey.subscribe( d =>
      {
        //console.log(d);
        this.totalatendimento = 0;
        this.listaatendimento = d;
        let cont = 0;
        for ( let atend of this.listaatendimento )
        {
          if (atend.keyfila !== undefined)
          {
             cont = cont + 1;
          }
        }

        this.totalatendimento = cont;
      }
    );
  }


}
