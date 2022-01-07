import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  options! :Option[]; 
  weapons :Weapon[] = [];
  monsters :Monster[] = [];
  constructor(private http: HttpClient) { }

  loadWeapons(){
    let element = this.http.get('https://45.81.84.151:52234/api/Weapons');
    return element;
  }
  getOption(id: number){
    let element = this.http.get('https://45.81.84.151:52234/api/Options/${id}');
    return element;
  }

  getOptions(option: Option){
    option.nextId;
  }
}

