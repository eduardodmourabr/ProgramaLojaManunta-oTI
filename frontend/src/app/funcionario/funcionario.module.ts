import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { NovoFuncionarioComponent } from './pages/novo-funcionario/novo-funcionario.component';
import { ListarFuncionarioComponent } from './pages/listar-funcionario/listar-funcionario.component';
import { HttpClientModule } from '@angular/common/http';
import { FuncionarioHttpService } from './services/funcionario-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { IsNumberGuard } from './guards/is-number.guard';
import { ExcluirFuncionarioComponent } from './dialog/excluir-funcionario/excluir-funcionario.component';
import { EditFuncionarioComponent } from './pages/edit-funcionario/edit-funcionario.component';
import { ConfirmExitGuard } from './guards/confirm-exit.guard';
import { ConfirmExitDialogComponent } from './dialog/confirm-exit-dialog/confirm-exit-dialog.component';


@NgModule({
  declarations: [
    NovoFuncionarioComponent,
    ListarFuncionarioComponent,
    FuncionarioComponent,
    ExcluirFuncionarioComponent,
    EditFuncionarioComponent,
    ConfirmExitDialogComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    IsNumberGuard,
    ConfirmExitGuard
  ]
})
export class FuncionarioModule { }
