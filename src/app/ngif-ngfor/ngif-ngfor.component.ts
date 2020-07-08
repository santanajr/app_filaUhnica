import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngif-ngfor',
  templateUrl: './ngif-ngfor.component.html',
  styleUrls: ['./ngif-ngfor.component.css']
})
export class NgifNgforComponent implements OnInit {
  numero: Number ;
  arrNumeros = [ 1, 2, 3 , 4, 5 , 6, 7, 8, 9, 10];
  arrNomes = [ "AAAA", "BBBB", "CCCCC"];
  constructor() { }

  ngOnInit() {
  }

  ObterNumero(num: Number )
  {
    this.numero = num;


  }

}
