import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioModule } from './funcionario/funcionario.module';

const routes: Routes = [
  {
    path: 'funcionario',
    loadChildren: () => {
      return import('./funcionario/funcionario.module')
      .then((m) => {
        return m.FuncionarioModule
      })
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
