import { EstabelecimentoService } from './services/estabelecimento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SegundoComponenteComponent } from './segundo-componente/segundo-componente.component';
import { NgifNgforComponent } from './ngif-ngfor/ngif-ngfor.component';
import { CrudService } from './services/crud.service';
import { CrudComponent } from './componentes/crud/crud.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {RouterModule, Routes } from '@angular/router';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';

import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { ListComponent } from './estabelecimento/list/list.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { EstabelecimentocadastrarComponent } from './estabelecimento/estabelecimentocadastrar/estabelecimentocadastrar.component';
import { MainestabelecimentoComponent } from './mainestabelecimento/mainestabelecimento.component';
import { FilaComponent } from './fila/fila.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';

@NgModule({
  declarations: [
    AppComponent,
    SegundoComponenteComponent,
    NgifNgforComponent,
    DataBindingComponent,
  //  CrudComponent,
    ListComponent,
  MainComponent,
  LoginComponent,
  EstabelecimentocadastrarComponent,
  MainestabelecimentoComponent,
  FilaComponent,
  AtendimentoComponent

  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    HttpClientModule,



    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFireDatabaseModule




  ],
  //providers: [ HttpClient  ] ,
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
