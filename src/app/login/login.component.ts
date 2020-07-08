import { EstabelecimentoDataService } from './../services/estabelecimento.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from '../models/estabelecimento';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Estabel: Estabelecimento;
  key: string = '';

  dados: AngularFireList<any[]>;
  dadosColection: Observable<any[]>;
  dadosColectionKey: Observable<any[]>;

  dadoslogin    : Estabelecimento[] = new Array();
  dadosloginkey : Estabelecimento[] = new Array();

  logadokey: string;
  logado   : Estabelecimento;


  constructor(private afire: AngularFireDatabase , private  DataSourceEstab: EstabelecimentoDataService ,
    private rota: Router )
  {



  }

  ngOnInit(): void
  {
    this.dados = this.afire.list('/Estabelecimento');
    this.dadosColection = this.dados.valueChanges() as Observable<any[]>;
    this.dadosColectionKey = this.dados.snapshotChanges().pipe(
      map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()}))) );



    this.Estabel = new Estabelecimento();
    this.DataSourceEstab.currentEstabelecimento.subscribe
      (  data =>
          {
             if (data.estab && data.key )
             {
                 this.Estabel = new Estabelecimento();
                 this.Estabel.Email   = data.estab.Email;
                 this.Estabel.Senha = data.estab.Senha;
                 this.key = data.key;
             }
          }
      );
  }

  onSubmit()
  {
     console.log( this.Estabel );
     //console.log( this.key );

     // this.dadosColection.subscribe( d =>
     //                               {   this.dadoslogin = d;
     //                                   console.log(this.dadoslogin );
     //                               }
     //                               );

      this.dadosColectionKey.subscribe( d =>
                                      {   this.dadosloginkey = d;
                                          console.log(this.dadosloginkey );
                                          console.log(this.dadosloginkey[0] );

                                          this.logadokey = '';
                                          for ( let loginestab of this.dadosloginkey )
                                          {
                                            console.log('chave' + loginestab.key );

                                            if ( (loginestab.Email == this.Estabel.Email ) &&
                                                   (loginestab.Senha == this.Estabel.Senha ) )
                                              {
                                                console.log('Email logado' + loginestab.Email );
                                                console.log('chave logado' + loginestab.key );

                                                this.logadokey = loginestab.key;
                                                this.logado    = loginestab;

                                                this.rota.navigate(['/mainsestabelecimento/'+this.logadokey+'/'+this.logado.keyfila]);

                                                console.log('logchave' + this.logadokey );
                                                console.log(this.logado );

                                              }
                                          }
                                          if (this.logadokey == '')
                                          {
                                            console.log('usuário não logado')
                                          }


                                      }
                                      );
/*
constructor(private router: Router)
}

functionOnWhichRedirectShouldHappen(){
  router.navigate(['/role']);
*/
   }



}
