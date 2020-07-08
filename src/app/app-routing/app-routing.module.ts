import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import {Routes , RouterModule } from '@angular/router';
import { DataBindingComponent } from '../data-binding/data-binding.component';
import { SegundoComponenteComponent } from '../segundo-componente/segundo-componente.component';
import { NgifNgforComponent } from '../ngif-ngfor/ngif-ngfor.component';
import { CrudComponent } from '../componentes/crud/crud.component';
import { MainComponent } from '../main/main.component';
import { EstabelecimentocadastrarComponent } from '../estabelecimento/estabelecimentocadastrar/estabelecimentocadastrar.component';
import { MainestabelecimentoComponent } from '../mainestabelecimento/mainestabelecimento.component';
import { AtendimentoComponent } from '../atendimento/atendimento.component';

const routes: Routes = [
       { path: 'primeiro-componente' , component: DataBindingComponent},
       { path: 'segundo-componente' , component: SegundoComponenteComponent},
       { path: 'teste' , component: NgifNgforComponent},
       { path: 'main' , component: MainComponent },
       { path: 'estabelecimentocadastrar' , component: EstabelecimentocadastrarComponent },
       { path: 'login' , component: LoginComponent },
       { path: 'mainsestabelecimento/:keyEstabelecimento/:keyfila' , component: MainestabelecimentoComponent },
       { path: 'atendimento' , component: AtendimentoComponent }
      // { path: 'crud' , component: CrudComponent}


      ];


@NgModule({
  imports: [RouterModule.forRoot(routes) /*, CrudComponent*/ ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
