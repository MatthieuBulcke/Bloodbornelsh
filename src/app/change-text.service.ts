import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Option } from './option';
import { Weapon } from './weapon';
import { Monster } from './monster';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class ChangeTextService {
  headers= new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
  options! :Observable<Option[]>; 
  weapons :Weapon[] = [];
  monsters :Monster[] = [];
  private idSource = new BehaviorSubject('2');
  currentId = this.idSource.asObservable();

  constructor(private http: HttpClient) { }


changeId(id: string){
  this.idSource.next(id);
}

  LoadWeapons() : Observable<any>{
  return this.http.get<any>('https://localhost:7276/api/Weapons');
  }
  getOption(idText: string) :Observable<Option>{
    let id : number=+idText;
    let element = this.http.get<Option>(`https://localhost:7276/api/Stories/${id}`);
    console.log(`https://localhost:7276/api/Stories/${id}`);
    console.log(element);
    return element;
  }


}

