import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/*Uma vez que o provided in root, esse service é
servido a nível de aplicação, em apenas uma instância,
segundo o padrão Singleton*/
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /*URL da API do Json server, que persiste em um Json todos os
  objetos que eu mando. Nesse caso, estou mandando um Produto*/
  baseUrl = 'http://localhost:3001/products'
  /*Injeção de dependência do snackBar: o Angular vai instanciar pra mim*/
  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  /*Manda requisição http pro backend pra salvar um produto.
  Ele retorna um Observable do tipo Product*/
  /*Com o pipe, eu retorno esse observable na função map,
  ou captura um erro se ele tiver ocorrido, mostro uma mensagem,
  e por fim retorno um observable vazio*/
  create(product: Product): Observable<Product> {
    /*Garantindo que o Observable retornado será um product*/
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  /*Esse método abaixo também retorna um observable
  então eu vou retornar um observable vazio,
  poque eu não quero sabe do erro do error handler,
  apenas do erro do .post(), que é a variável "e" aqui*/
  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  /*Atualiza um produto e retorna ele atualizado (observer)*/
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}