import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmExitDialogComponent } from '../../dialog/confirm-exit-dialog/confirm-exit-dialog.component';
import { CanDeactivate } from '../../models/can-deactivate';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.css']
})
export class NovoFuncionarioComponent implements OnInit, CanDeactivate {

  @ViewChild('fileInput')
  fileInput!: ElementRef

  funcionario: FormGroup = this.fb.group({
    nome:['',[Validators.required ]],
    email:['',[Validators.required, Validators.email ]],
    foto:['']
  })

  foto!: File

  constructor(
    private fb: FormBuilder,
    private funHttpService: FuncionarioHttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) { }
  
  
  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.funcionario.dirty){
      const ref = this.dialog.open(ConfirmExitDialogComponent)
      return ref.afterClosed();
    }
    return true;
  }

  ngOnInit(): void {
    
  }

  selectInput(): void{
    this.fileInput.nativeElement.click();
  }

  submit(): void{
    const funcionario = this.funcionario.value;
    funcionario.foto = null;
    

    this.funHttpService
    .addFuncionario(funcionario)
    .subscribe(
      (f) => {

        if(this.foto != undefined){

          const formData: FormData =new FormData();

          formData.append('foto', new Blob([this.foto], {type: this.foto.type}));

          const filename = `funcionario-${f.idFuncionario}.${this.foto.type.split('/')[1]}`;

          this.funHttpService.addFoto(f.idFuncionario || 0, formData, filename)
          .subscribe(
            () => {
              this.funcionario.reset();
          this.showSuccessAndRedirect()
        },(e: HttpErrorResponse) =>{

          this.showErrorMessage(e)
         
        })

        } else{
          this.funcionario.reset();
          this.showSuccessAndRedirect();
        }
      },
      (e: HttpErrorResponse) =>{
        this.showErrorMessage(e)
      })

  }

  fileChange(event: any) {
    this.foto = event.target.files[0];
  }

  showSuccessAndRedirect():void{

    this.snackBar.open('Funcionario cadastrado com sucesso!','ok',{
      duration: 3000,
      horizontalPosition:'left',
     verticalPosition:'top'
   })
   this.router.navigateByUrl('/funcionario')

  }

  showErrorMessage(e: HttpErrorResponse):void{

    this.snackBar.open(`Ocorreu um erro no salvamento! (Erro: ${e.status})`, "ok",{
      duration: 3000,
      horizontalPosition:'left',
      verticalPosition:'top'
    })

  }

}