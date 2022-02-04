import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage('Produto deletado com sucesso!')
    })
    this.router.navigate(['/products'])
  }

  cancel() {
    this.router.navigate(['/products'])
  }

}