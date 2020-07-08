import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable(
  {
    providedIn: 'root'
  }
)


export class CrudService {

  constructor(private http: HttpClient )
  {


  }

  public getFotos(): Observable<any>
    {
      return  this.http.get('https://jsonplaceholder.typicode.com/photos');

    }

}
