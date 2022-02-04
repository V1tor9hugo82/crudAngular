import { Product } from './../product.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductRead2DataSource } from './product-read2-datasource';

@Component({
  selector: 'app-product-read2',
  templateUrl: './product-read2.component.html',
  styleUrls: ['./product-read2.component.css']
})
export class ProductRead2Component implements AfterViewInit, OnInit {
  /*Quem instancia essa variável paginator é o Angular.
  Pra instanciar o paginator, eu cham esse decorator "Filho da
  minha visão"m passando o tipo de componente que eu quero que
  seja selecionado. Então o Angular vai percorrer minha view/componente,
  e ver onde está o componente paginator. Aí ele vai pegar o primeiro
  componente paginator e vai jogar dentro da variável paginator( mais 
      abaixo no método "ngAfterViewInit").
  Ou seja, quando eu uso esse decorator "ViewChild", oo póprio angular
  vai percorrer meu template e pegar a primeira ocorrência desse componente
  e jogar pra dentro dessa variável paginetor*/
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price'];

  ngOnInit() {
    this.dataSource = new ProductRead2DataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}