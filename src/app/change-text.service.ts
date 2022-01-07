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

  options! :Observable<Option[]>; 
  weapons :Weapon[] = [];
  monsters :Monster[] = [];
  constructor(private http: HttpClient) { }

  loadItems():Observable<Weapon[]>{
    let element:Observable<Weapon[]> = this.http.get('https://localhost:7276/api/Weapons',httpOptions);
    return element;
  }
}