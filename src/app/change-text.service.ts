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
  inventory:any;
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
  InsertWeapon(id:any,inventory:any): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyInventory/${id}/${inventory}`);
  }
  private idSource = new BehaviorSubject('2'); //Pour changer le main texte sur un clique d'option.
  currentId = this.idSource.asObservable();

  private dmgType = new BehaviorSubject(1); //Gère le type de dégâts
  currentDmgType = this.dmgType.asObservable();

  private atk = new BehaviorSubject(5); //Gère la valeur d'attaque du joueur
  currentAtk = this.atk.asObservable();

  private time = new BehaviorSubject(1); //Gère le temps
  currentTime = this.time.asObservable();

  private zone = new BehaviorSubject("Place de Yarnham"); //Gère la zone
  currentZone = this.zone.asObservable();

  private fight = new BehaviorSubject(0); //Ecoute en permanence si un combat doit se déclencher
  currentFight = this.fight.asObservable();

  private vials = new BehaviorSubject(5); // Gère les fioles de soin du joueur
  currentVial = this.vials.asObservable();

  private pvJoueur = new BehaviorSubject(100); //Gère les pv du joueur
  currentPv = this.pvJoueur.asObservable();

  private bullets = new BehaviorSubject(5); //Gère les balles d'argent du joueur
  currentBullets = this.bullets.asObservable();

  changeId(id: string) {
    this.idSource.next(id);
  }

  changeWeapon(weapon: Weapon) {
    this.dmgType.next(weapon.dmgType);
    this.atk.next(weapon.atk);
  }

  changeMainGlobalInfos(option: Option) {
    this.time.next(option.time);
    this.zone.next(option.zone);
    this.fight.next(option.combat);
  }

  useHeal() {
    if (this.pvJoueur.value < 50 && this.vials.value > 0) {
      this.pvJoueur.next(this.pvJoueur.value + 50);
      this.vials.next(this.vials.value - 1);
    }
    else if (this.pvJoueur.value > 50 && this.pvJoueur.value < 100 && this.vials.value > 0) {
      this.pvJoueur.next(100);
      this.vials.next(this.vials.value - 1);
    }
  }

  takeDamage(dmg: number) {
    this.pvJoueur.next(this.pvJoueur.value - dmg);
  }

  useBullet() {
    if(this.bullets.value<0){
    this.bullets.next(this.bullets.value - 1);
    }
  }

  LoadWeapons(): Observable<any> {
    let weapons = this.http.get<Weapon>(`https://localhost:7276/api/Weapons`)
    return weapons;
  }
  LoadWeapon(id:number): Observable<any> {
    let weapon = this.http.get<Weapon>(`https://localhost:7276/api/Weapons/${id}`)
    //console.log(weapon);
    return weapon;
  }
  getOption(idText: string): Observable<Option> {
    let id: number = +idText;
    let element = this.http.get<Option>(`https://localhost:7276/api/Stories/${id}`);
    return element;
  }

  getMonster(id: number) {
    return this.http.get<Monster>(`https://localhost:7276/api/Monsters/${id}`);
  }
}