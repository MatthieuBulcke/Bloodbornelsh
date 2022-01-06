import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from './option';

@Injectable({
  providedIn: 'root'
})
export class ChangeTextService {

  options! :Observable<Option[]>;  
  constructor() { }

  // getOption(id: number) : Observable<Option>{
  //   return this.options[id];
  // }
}