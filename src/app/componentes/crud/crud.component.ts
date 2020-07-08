import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Images } from '../../models/placeholder.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent implements OnInit {
  img: any;
  erro: any;
  
  constructor(private cService: CrudService )
  {
    this.getter();
  }

  getter()
  {
    this.cService.getFotos().subscribe
          (
              (data: Images ) => {this.img = data; console.log(data); } ,
              (error: any   ) => { this.erro = error; console.log(error); }
          );
  }

  ngOnInit()
  {

  }

}
