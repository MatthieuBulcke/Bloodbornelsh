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
  options! :Observable<Option[]>; 
  weapons :Weapon[] = [];
  monsters :Monster[] = [];
  constructor(private http: HttpClient) { }

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

  // getOptions(ids: string[]){
  //   let elements : any;
  //   let i:number;
  //   console.log("oui");
  //   console.log(ids);

  //   for(i=0;i<ids.length;i++){
  //     console.log("non");
  //     let id : number = +ids[i];
  //     console.log(`https://localhost:7276/api/Stories/${id}`);
  //     this.http.get<Option>(`https://localhost:7276/api/Stories/${id}`)
  //     .subscribe((Element) =>{ 
  //       console.log(Element);
  //       elements.push(Element);
  //     });
  //   }
  //   console.log("peut-être");
  //   this.options=elements;
  //   return this.options;
  // }

}

