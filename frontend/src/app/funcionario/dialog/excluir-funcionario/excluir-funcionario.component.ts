import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario';

@Component({
  selector: 'app-excluir-funcionario',
  templateUrl: './excluir-funcionario.component.html',
  styleUrls: ['./excluir-funcionario.component.css']
})
export class ExcluirFuncionarioComponent implements OnInit {

  idFuncionario!: number | null;
  funcionario!: Funcionario

  constructor() { }

  ngOnInit(): void {

  }

  


}
