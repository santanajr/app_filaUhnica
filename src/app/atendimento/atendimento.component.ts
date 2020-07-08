import { Fila } from './../models/Fila';
import { FilaComponent } from './../fila/fila.component';
import { Component, OnInit } from '@angular/core';
import { Atendimento } from '../models/Fila';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AtendimentoDataService } from './../services/atendimento.service';


@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit
{

  Atend: Atendimento;
  Fila: Fila;
  keyFila: string;
  key: string;

  dados: AngularFireList<any[]>;
  dadostelafila: Observable<any[]>;
  dadosfila: Observable<any[]>;

  filatela: Fila[] = new Array();
  filatelasemfiltro: Fila[] = new Array();

  constructor( private afire: AngularFireDatabase , private DataSourceAtendimento: AtendimentoDataService  )
  {


  }

  ngOnInit(): void
  {
    this.dados = this.afire.list('/Fila');
    this.dadosfila = this.dados.valueChanges() as Observable<any[]>;

    this.dadostelafila = this.dados.snapshotChanges().pipe(
      map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()}))) );


      this.dadostelafila.subscribe( d =>
        {
          //this.filatela = d;
          this.filatelasemfiltro = d;
          for ( let filatel of this.filatelasemfiltro )
            {
                if (filatel.StatusFila == 'A')
                  {
                      this.filatela.push( filatel );

                  }
            }

           console.log(this.filatela);
        }
        );


    this.Atend = new Atendimento();


    this.DataSourceAtendimento.currentAtendimento.subscribe
          (  data =>
              {
                if (data.atend && data.key )
                   {
                      this.Atend = new Atendimento();
                      this.Atend.NomeSolicitante = data.atend.NomeSolicitante;
                      this.Atend.Descricao       = data.atend.Descricao;
                      this.Atend.Celular         = data.atend.Celular;
                      this.Atend.keyfila         = data.atend.keyfila;
                      this.keyFila               = data.atend.keyfila;
                      this.Atend.Ativo           = 'S';
                      this.Atend.key             = data.key;
                      console.log('------Atend ----');
                      console.log(this.Atend);
                      console.log('------- keyfila------');
                      console.log(this.keyFila);
                   }
                }
           );







  }


  onSubmit(): void
     {
        console.log('---- atend submit ---------');
        console.log( this.Atend);
        console.log('---- key fila submit ---------');
        console.log(this.Atend.keyfila);
        this.Atend.Ativo = 'S';
        this.afire.list('/Fila/'+this.Atend.keyfila).push(this.Atend);
     }


 }
