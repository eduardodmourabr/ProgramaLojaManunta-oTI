import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioHttpService {

  private readonly baseUrl = 'http://localhost:8080/servicos/funcionario'

  constructor(
    private http: HttpClient,
  ) {}

    getFuncionarios(): Observable<Funcionario[]>{
      return this.http.get<Funcionario[]>(this.baseUrl)
    }

    getFuncionarioById(id: number): Observable<Funcionario>{
      return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
    }

    deleteFuncionario(id: number): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }

    addFuncionario(funcionario: Funcionario): Observable<Funcionario>{
      return this.http.post<Funcionario>(this.baseUrl, funcionario)
    }

    addFoto(id: number, data:FormData, fileName:String): Observable<void>{
      return this.http.post<void>(`${this.baseUrl}/addFoto/${id}?nome=${fileName}`,data)
    }

    updateFuncionario(funcionario: Funcionario): Observable<Funcionario>{
      return this.http.put<Funcionario>(`${this.baseUrl}/${funcionario.idFuncionario}`, funcionario)
    }

}
