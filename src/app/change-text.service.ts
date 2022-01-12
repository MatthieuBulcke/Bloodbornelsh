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
  headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
  options!: Observable<Option[]>;
  weapons: Weapon[] = [];
  monsters: Monster[] = [];
  userWeapons:any;
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    let id: string | null = localStorage.getItem('userId');
    return this.http.get<any>(`https://localhost:7276/api/Profiles/${id}`);
  }
  LoadUsers(): Observable<any> {
    return this.http.get<any>('https://localhost:7276/api/Users');
  }
  InsertUser(user: any): Observable<any> {
    //console.log(this.http.post<any>('https://localhost:7276/api/Users',user))
    return this.http.post<any>('https://localhost:7276/api/Users', user);
  }
  private idSource = new BehaviorSubject('2'); //Pour changer le main texte sur un clique d'option.
  currentId = this.idSource.asObservable();

  private dmgType = new BehaviorSubject(1);
  currentDmgType = this.dmgType.asObservable();

  private atk = new BehaviorSubject(5);
  currentAtk = this.atk.asObservable();

  changeId(id: string) {
    this.idSource.next(id);
  }

  changeWeapon(weapon: Weapon) {
    this.dmgType.next(weapon.dmgType);
    this.atk.next(weapon.atk);
  }

  LoadWeapons(): Observable<any> {
    let profileUser: any;
    let weapons: any;
    let inventory:any;
    this.getUserProfile().subscribe((profile: any) => { profileUser = profile;
      inventory = profileUser.inventory;
      console.log("inventaire :"+inventory);
      for (let i = 0; i < inventory.length; i++) {
        this.LoadWeapon(inventory[i]);
      }
    });
    console.log('weapons :'+weapons)
    return weapons;
  }
  LoadWeapon(id:number){
    let weapon = this.http.get<Weapon>(`https://localhost:7276/api/Weapons${id}`)
    //console.log(weapon);
    return weapon;
  }
  getOption(idText: string): Observable<Option> {
    let id: number = +idText;
    let element = this.http.get<Option>(`https://localhost:7276/api/Stories/${id}`);
    //console.log(`https://localhost:7276/api/Stories/${id}`);
    //console.log(element);
    return element;
  }
}