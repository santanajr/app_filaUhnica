import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {
  numero: number;

  constructor() { }

  ngOnInit() {
  }

  ObtemNumero(num: number)
  {
    this.numero = num + 200;

  }

}
