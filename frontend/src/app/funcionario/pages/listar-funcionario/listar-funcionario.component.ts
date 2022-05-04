import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExcluirFuncionarioComponent } from '../../dialog/excluir-funcionario/excluir-funcionario.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ListarFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[] = [];

  columns: string[] = ['idFuncionario','nome','email','actions']

  constructor(
    private funHttpService: FuncionarioHttpService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.recoverFuncionarios();
  }

  


  openDialog(id:number, nome:string): void {
    const dialogRef = this.dialog.open(ExcluirFuncionarioComponent)
  
    dialogRef.afterClosed().subscribe( 
    canDelete => {
        if(canDelete) {
          this.funHttpService.deleteFuncionario(id)   .subscribe(
            ( ) => {
              this.snackBar.open(`O funcionário ${nome} foi deletado!`, "ok", {
                duration: 3000
              })
              this.recoverFuncionarios();
            }
          )
        }
      }
    )
  }

  recoverFuncionarios() {
    this.funHttpService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios
      }
    )
  }
    
  }
