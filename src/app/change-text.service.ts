import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from './option';
import { Weapon } from './weapon';
import { Monster } from './monster';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ChangeTextService {

  options! :Option[]; 
  weapons :Weapon[] = [];
  monsters :Monster[] = [];
  constructor(private http: HttpClient) { }

  loadItems(){
    let element = this.http.get('https://localhost:7276/api/Weapons',httpOptions);
    return element;
  }
}