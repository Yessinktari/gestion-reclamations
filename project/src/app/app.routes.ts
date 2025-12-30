import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import path from 'path';
import { Component } from '@angular/core';

import { ClientComponent } from './client/client.component';
import { AddComponent } from './client/add/add.component';
import { ModifierComponent } from './client/modifier/modifier.component';



import { ArticleComponent } from './article/article.component';
import { AddARTComponent } from './article/add/add.component';
import { ModifierARTComponent } from './article/modifier/modifier.component';



import { ServiceComponent } from './service/service.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { RevendeurComponent } from './revendeur/revendeur.component';
import { ModifierRevComponent } from './revendeur/modifier-rev/modifier-rev.component';
import { AddRevComponent } from './revendeur/add-rev/add-rev.component';
import { AddServComponent } from './service/add-serv/add-serv.component';
import { ModifierServComponent } from './service/modifier-serv/modifier-serv.component';
import { ModifierTechComponent } from './technicien/modifier-tech/modifier-tech.component';
import { AddTechComponent } from './technicien/add-tech/add-tech.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './reclamation/update-reclamation/update-reclamation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'client', component: ClientComponent,children:[{path:'AddClient', component: AddComponent},{path:'UpdateClient/:id', component: ModifierComponent}]},

  {path:'article', component:ArticleComponent,children:[{path:'AddArticle', component: AddARTComponent},{path:'UpdateArticle/:id', component: ModifierARTComponent}]},

  {path:'revendeur' , component : RevendeurComponent,children:[{path:'AddRevendeur', component: AddRevComponent},{path:'UpdateRevendeur/:id', component: ModifierRevComponent}]},

  {path: 'service', component:ServiceComponent,children:[{path:'AddService', component: AddServComponent},{path:'UpdateService/:id', component: ModifierServComponent}]},

  {path:'technicien', component:TechnicienComponent,children:[{path:'AddTechnicien', component: AddTechComponent},{path:'UpdateTechnicien/:id', component: ModifierTechComponent}]},

 {path:'reclamation', component:ReclamationComponent,children:[{path:'AddReclamation', component: AddReclamationComponent},{path:'UpdateReclamation/:id', component: UpdateReclamationComponent}]},


  { path: '**', redirectTo: '/login' }
];
