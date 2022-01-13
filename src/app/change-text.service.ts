import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Option } from './option';
import { Weapon } from './weapon';
import { Monster } from './monster';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Profile } from './model/profile.model';

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
  userWeapons: any;
  inventory: any;
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    let id: string = localStorage.getItem('userId') as string;
    if (id != null) {
      return this.http.get<any>(`https://localhost:7276/api/Profiles/${id}`);
    }
    else {
      return this.http.get<any>(`https://localhost:7276/api/Profiles/1`);
    }
  }
  LoadUsers(): Observable<any> {
    return this.http.get<any>('https://localhost:7276/api/Users');
  }
  InsertUser(user: any): Observable<any> {
    //console.log(this.http.post<any>('https://localhost:7276/api/Users',user))
    return this.http.post<any>('https://localhost:7276/api/Users', user);
  }
  InsertWeapon(id: number, inventory: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyInventory/${id}/${inventory}`);
  }
  UpdateLife(id: number, life: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyLife/${id}/${life}`);
  }
  UpdateStam(id: number, stam: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyStam/${id}/${stam}`);
  }
  UpdateTime(id: number, time: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyTime/${id}/${time}`);
  }
  UpdateEchos(id: number, echos: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyEchos/${id}/${echos}`);
  }
  UpdateWeapon(id: number, weaponId: number): Observable<any> {
    //en vrai c'est le type de dégat mais du coup on va dire que c'est l'arme équipée
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyWeapon/${id}/${weaponId}`);
  }
  UpdatePotions(id: number, potions: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyPotions/${id}/${potions}`);
  }
  UpdateBullets(id: number, bullets: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7276/api/Profiles/ModifyBullets/${id}/${bullets}`);
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

  private pvJoueur = new BehaviorSubject("100"); //Gère les pv du joueur
  currentPv = this.pvJoueur.asObservable();

  private bullets = new BehaviorSubject(5); //Gère les balles d'argent du joueur
  currentBullets = this.bullets.asObservable();

  private echos = new BehaviorSubject(10); //Gère l'argent du joueur
  currentEchos = this.echos.asObservable();

  private stamina = new BehaviorSubject("100");
  currentStam = this.stamina.asObservable();

  private weaponToAdd = new BehaviorSubject(0);
  currentWeaponToAdd = this.weaponToAdd.asObservable();

  addWeaponToIventory(id: number) {
    this.weaponToAdd.next(id);
  }

  initStats(profile: Profile) {
    this.pvJoueur.next(profile.life.split('/')[0]);
    this.stamina.next(profile.stamina.split('/')[0]);
    this.vials.next(profile.potions);
    this.bullets.next(profile.bullets);
    this.echos.next(profile.echos);
  }

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
    this.UpdateTime(parseInt(localStorage.getItem("idUser") as string), this.time.value );
  }

  useHeal() {
    let pvNum: number = +this.pvJoueur.value;
    if (pvNum < 50 && pvNum > 0) {
      this.pvJoueur.next(`${pvNum + 50}`);
      this.vials.next(this.vials.value - 1);
    }
    else if (pvNum > 50 && pvNum < 100 && this.vials.value > 0) {
      this.pvJoueur.next("100");
      this.vials.next(this.vials.value - 1);
    }
    this.UpdateLife(parseInt(localStorage.getItem("idUser") as string), this.pvJoueur.value);
    this.UpdatePotions(parseInt(localStorage.getItem("idUser") as string), this.vials.value);
  }
  addHeal(){
    this.vials.next(this.vials.value + 1);
  }
  addBullet(){
    this.bullets.next(this.bullets.value + 1);
  }
  takeDamage(dmg: number) {
    let pvNum: number = +this.pvJoueur.value;
    this.pvJoueur.next(`${pvNum - dmg}`);
    this.UpdateLife(parseInt(localStorage.getItem("idUser") as string), this.pvJoueur.value);
  }

  useBullet() {
    let fire: boolean;
    if (this.bullets.value > 0) {
      this.bullets.next(this.bullets.value - 1);
      fire = true;
      this.UpdateBullets(parseInt(localStorage.getItem("idUser") as string), this.bullets.value);
      return fire;
    }
    else {
      fire = false;
      return fire;
    }
  }

  changeEchos(gain: number) {
    this.echos.next(this.echos.value + gain);
    this.UpdateEchos(parseInt(localStorage.getItem("idUser") as string), this.echos.value);
  }

  LoadWeapons(): Observable<any> {
    let weapons = this.http.get<Weapon>(`https://localhost:7276/api/Weapons`)
    return weapons;
  }
  LoadWeapon(id: number): Observable<Weapon> {
    let weapon = this.http.get<Weapon>(`https://localhost:7276/api/Weapons/${id}`);
    //console.log(weapon);
    return weapon;
  }
  getOption(idText: string): Observable<Option> {
    let id: number = 2;
    if (idText != null) {
      id = +idText;
    }
    let element = this.http.get<Option>(`https://localhost:7276/api/Stories/${id}`);
    return element;
  }

  getMonster(id: number) {
    return this.http.get<Monster>(`https://localhost:7276/api/Monsters/${id}`);
  }
}