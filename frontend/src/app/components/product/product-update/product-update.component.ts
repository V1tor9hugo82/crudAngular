import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  /*Esse componente foi renderizado passado o id
  do produto clicado na ROTA. Então eu tenho que pegar o id
  do produto na Rota ativa no momento(activatedRoute)*/
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /*Ao inicializar esse componente,renderizo os campos
  com os valores atuais do produto que está sendo editado.
  Pra isso, pego o id do produto que foi passado na rota*/
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!')
    })
    this.router.navigate(['/products'])
  }
  /*Volta pra tela inicial de product*/
  cancel(): void {
    this.router.navigate(['/products'])
  }
}