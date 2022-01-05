"use strict";
//let button = document.getElementsByClassName("choices");
/*SETUP COMBAT*/
//window.localStorage.setItem("monsterName","Rat");
/*CONNECTION A LA BASE DE DONNEES*/
$("#buttonId").click(function (e) {
    e.preventDefault();
    console.log('buttoned')
    $.ajax({
        url: "./Connect.cs"
    });
});
/*DATAS*/
let data; /*Info texte*/
let data2; /*Info joueur*/
let data3; /*Infos monstres*/
let data4; /*Infos armes*/
let audio = new Audio('../assets/slash.mp3');
/*Creation de l'inventaire*/
if (!window.localStorage.getItem('inventory')) {
    window.localStorage.setItem('inventory', "");
}
let game = document.getElementsByClassName("game");
/*************Espaces de textes***************/
let firstOption = document.getElementsByClassName("one");
let secondOption = document.getElementsByClassName("two");
let thirdOption = document.getElementsByClassName("three");
let fourthOption = document.getElementsByClassName("four");
/*Arme de départ*/
let chooseWeapon = document.getElementsByClassName("chooseWeapon");
/*User*/
let h3 = document.getElementsByClassName("values");
let life = document.getElementsByClassName("life");
let stam = document.getElementsByClassName("stam");
let time = document.getElementsByClassName("time");
let echos = document.getElementsByClassName("echos");
let heal = document.getElementsByClassName("heal");
let bullets = document.getElementsByClassName("bullets");
let type = document.getElementsByClassName("type");
/*Combats*/
let buttons = document.getElementsByTagName("button");
let monsterName = document.getElementsByClassName("monster");
let monsterFrame = document.getElementsByClassName("monsterFrame");
let monsterImg = document.getElementsByClassName("monsterImg");
/*********************************************/
let icons = document.getElementsByClassName("icon");
let main = document.getElementsByClassName("text");
/****************EQUIPEMENTS******************/
let weap = document.getElementsByTagName("figcaption");
let inventory = document.getElementsByClassName("inventory");
let weapons = document.getElementsByClassName("weaponImg");
let eachWeapons = window.localStorage.getItem("inventory");
eachWeapons = eachWeapons.split('/');
//console.log(eachWeapons);
let resetButton = document.getElementsByClassName("reset");
/******************MAGASIN********************/
let buyButtons = document.getElementsByClassName("buy");
let shopFrame = document.getElementsByClassName("shop");
let exit = document.getElementsByClassName("exit");
/***********Path des options******************/
let Goto = 1;
//console.log(p);
/*Récupération du JSON*/
function readJsonFile(file, callback) {
    let textFile = new XMLHttpRequest();
    textFile.overrideMimeType("application/json");
    textFile.open("GET", file, true);
    textFile.onreadystatechange = function () {
        if (textFile.readyState === 4 && textFile.status == 200) {
            callback(textFile.responseText);
        }
    };
    textFile.send(null);
}
function init() {
    /*Lecture du JSON*/
    /*Initialisation de l'intro*/
    readJsonFile("assets/txt/intro.json", function (text) {
        data = JSON.parse(text);
        //console.log(data);
        Goto = 1;
        if (window.localStorage.getItem("textId")) {
            let textId = window.localStorage.getItem("textId");
            if (data.story[textId].zone == "egout") {
                game[1].classList.add("firstBack");
            }
            else if (data.story[textId].zone == "Faubourg de la cathédrale") {
                game[1].classList.add("secondBack");
            }
            main[0].innerHTML = data.story[textId].text;
            if (data.story[textId].NextId[0]) {
                firstOption[0].classList.remove("empty");
                firstOption[0].innerHTML = data.story[data.story[textId].NextId[0]].text;
            }
            else {
                firstOption[0].classList.add("empty");
            }
            if (data.story[textId].NextId[1]) {
                secondOption[0].classList.remove("empty");
                secondOption[0].innerHTML = data.story[data.story[textId].NextId[1]].text;
            }
            else {
                secondOption[0].classList.add("empty");
            }
            if (data.story[textId].NextId[2]) {
                thirdOption[0].classList.remove("empty");
                thirdOption[0].innerHTML = data.story[data.story[textId].NextId[2]].text;
            }
            else {
                thirdOption[0].classList.add("empty");
            }
            if (data.story[textId].NextId[3]) {
                fourthOption[0].classList.remove("empty");
                fourthOption[0].innerHTML = data.story[data.story[textId].NextId[4]].text;
            }
            else {
                fourthOption[0].classList.add("empty");
            }
        }
        else {
            main[0].innerHTML = data.story[1].text;
            if (data.story[1].NextId[0]) {
                firstOption[0].classList.remove("empty");
                firstOption[0].innerHTML = data.story[data.story[1].NextId[0]].text;
            }
            else {
                firstOption[0].classList.add("empty");
            }
            if (data.story[1].NextId[1]) {
                secondOption[0].classList.remove("empty");
                secondOption[0].innerHTML = data.story[data.story[1].NextId[1]].text;
            }
            else {
                secondOption[0].classList.add("empty");
            }
            if (data.story[1].NextId[2]) {
                thirdOption[0].classList.remove("empty");
                thirdOption[0].innerHTML = data.story[data.story[1].NextId[2]].text;
            }
            else {
                thirdOption[0].classList.add("empty");
            }
            if (data.story[1].NextId[3]) {
                fourthOption[0].classList.remove("empty");
                fourthOption[0].innerHTML = data.story[data.story[1].NextId[4]].text;
            }
            else {
                fourthOption[0].classList.add("empty");
            }
        }
        /*Initialisation du User*/
        readJsonFile("assets/txt/player.json", function (text2) {
            data2 = JSON.parse(text2);
            /*Vie et Mana*/
            let localLife = window.localStorage.getItem("life");
            let localStam = window.localStorage.getItem("stam");
            let localTime = window.localStorage.getItem("time");
            h3[0].innerHTML = window.localStorage.getItem("life") + "/" + (data2.player.vie).split('/')[1];
            h3[1].innerHTML = window.localStorage.getItem("stam") + "/" + (data2.player.endu).split('/')[1];
            life[0].setAttribute("value", localLife);
            stam[0].setAttribute("value", localStam);
            life[0].setAttribute("max", (data2.player.vie).split('/')[1]);
            stam[0].setAttribute("max", (data2.player.endu).split('/')[1]);
            //console.log(data2);
            if (!window.localStorage.getItem("life")) {
                window.localStorage.setItem("life", (data2.player.vie).split('/')[0]);
                h3[0].innerHTML = window.localStorage.getItem("life") + "/" + (data2.player.vie).split('/')[1];
                life[0].setAttribute("value", localLife);
                life[0].setAttribute("max", (data2.player.vie).split('/')[1]);
            }
            if (!window.localStorage.getItem("stam")) {
                window.localStorage.setItem("stam", (data2.player.endu).split('/')[0]);
                h3[1].innerHTML = window.localStorage.getItem("stam") + "/" + (data2.player.endu).split('/')[1];
                stam[0].setAttribute("value", localStam);
                stam[0].setAttribute("max", (data2.player.endu).split('/')[1]);
            }
            if (!window.localStorage.getItem("time")) {
                window.localStorage.setItem("time", data2.player.time);
                if (localTime == 1) {
                    time[0].innerHTML = "temps: Lever de soleil";
                }
                else if (localTime == 2) {
                    time[0].innerHTML = "temps: Jour";
                }
                else if (localTime == 3) {
                    time[0].innerHTML = "temps: Coucher de soleil";
                }
                else {
                    time[0].innerHTML = "temps: Nuit";
                }
            }
            if (!window.localStorage.getItem("echos")) {
                window.localStorage.setItem("echos", data2.player.echos);
                echos[0].innerHTML = "echos: " + window.localStorage.getItem("echos");
            }
            if (!window.localStorage.getItem("fioles")) {
                window.localStorage.setItem("fioles", data2.player.fioles);
                heal[0].innerHTML = "fioles: " + window.localStorage.getItem("fioles");
            }
            if (!window.localStorage.getItem("balles")) {
                window.localStorage.setItem("balles", data2.player.balles);
                bullets[0].innerHTML = "balles: " + window.localStorage.getItem("balles");
            }
            if (!window.localStorage.getItem("weapon")) {
                chooseWeapon[0].classList.remove("empty");
            }
            if (data2.player.damageType == 1) {
                type[0].innerHTML = "Tranchant";
                icons[4].setAttribute("src", "../assets/img/Tranch.png");
            }
            else if (data2.player.damageType == 2) {
                type[0].innerHTML = "Contandant";
                icons[4].setAttribute("src", "../assets/img/Cont.png");
            }
            else {
                type[0].innerHTML = "Zéro";
                icons[4].setAttribute("src", "../assets/img/Ammo.png");
            }
        });
        readJsonFile("assets/txt/monstre.json", function (text3) {
            data3 = JSON.parse(text3);
        });
        readJsonFile("assets/txt/weapons.json", function (text4) {
            data4 = JSON.parse(text4);
            displayWeapons();
        });
        //console.log(data2);
        /*Autres*/
        time[0].innerHTML = "temps: " + window.localStorage.getItem("time");
        echos[0].innerHTML = "echos: " + window.localStorage.getItem("echos");
        heal[0].innerHTML = "fioles: " + window.localStorage.getItem("fioles");
        bullets[0].innerHTML = "balles: " + window.localStorage.getItem("balles");
        if (window.localStorage.getItem("weapon")) {
            for (let i = 0; i < weapons.length; i++) {
                let weapon = weap[i + 5].textContent;
                if (weapon == window.localStorage.getItem("weapon")) {
                    weapons[i].classList.add("active");
                }
            }
        }
        //Si le joueur est en combat
        if (window.localStorage.getItem("monsterName") == "eileen") {
            shopFrame[0].classList.remove("empty");
        }
        else if (window.localStorage.getItem("monsterName")) {
            monsterFrame[0].classList.remove("empty");
            monsterName[0].innerHTML = window.localStorage.getItem("monsterName") + " vie: " + window.localStorage.getItem("monsterHealth");
            monsterImg[0].setAttribute("src", "../assets/img/monstres/" + window.localStorage.getItem("monsterName") + ".png");
        }
        else {
            monsterFrame[0].classList.add("empty");
        }
    });
}
init();
function showOptions() {
    readJsonFile("assets/txt/intro.json", function (text) {
        let data = JSON.parse(text);
        /*********Affichage des différents choix********/
        if (data.story[Goto].NextId[0]) {
            firstOption[0].classList.remove("empty");
            firstOption[0].innerHTML = data.story[data.story[Goto].NextId[0]].text;
        }
        else {
            firstOption[0].classList.add("empty");
        }
        if (data.story[Goto].NextId[1]) {
            secondOption[0].classList.remove("empty");
            secondOption[0].innerHTML = data.story[data.story[Goto].NextId[1]].text;
        }
        else {
            secondOption[0].classList.add("empty");
        }
        if (data.story[Goto].NextId[2]) {
            thirdOption[0].classList.remove("empty");
            thirdOption[0].innerHTML = data.story[data.story[Goto].NextId[2]].text;
        }
        else {
            thirdOption[0].classList.add("empty");
        }
        if (data.story[Goto].NextId[3]) {
            fourthOption[0].classList.remove("empty");
            fourthOption[0].innerHTML = data.story[data.story[Goto].NextId[3]].text;
        }
        else {
            fourthOption[0].classList.add("empty");
        }
    });
}
/*******Fonction de nav entre les options et les choix ********/
function option(num) {
    /****Progression de l'histoire en cliquant****/
    readJsonFile("assets/txt/intro.json", function (text) {
        console.log(num.target.classList[0]);
        if (num.target.classList[0] == "one") {
            firstOption[0].innerHTML = data.story[data.story[Goto].NextId[0]].text;
            Goto = data.story[data.story[Goto].NextId[0]].NextId;
            main[0].innerHTML = data.story[Goto].text;
        }
        else if (num.target.classList[0] == "two") {
            secondOption[0].innerHTML = data.story[data.story[Goto].NextId[1]].text;
            Goto = data.story[data.story[Goto].NextId[1]].NextId;
            main[0].innerHTML = data.story[Goto].text;
        }
        else if (num.target.classList[0] == "three") {
            thirdOption[0].innerHTML = data.story[data.story[Goto].NextId[2]].text;
            Goto = data.story[data.story[Goto].NextId[2]].NextId;
            main[0].innerHTML = data.story[Goto].text;
        }
        window.localStorage.setItem("textId", data.story[Goto].id);
        /*TEMPS*/
        window.localStorage.setItem("time", data.story[Goto].time);
        time[0].innerHTML = "temps: " + window.localStorage.getItem("time");
        /*ZONE*/
        let textId = window.localStorage.getItem("textId");
        if (data.story[textId].zone == "egout") {
            game[0].classList.add("firstBack");
        }
        else if (data.story[textId].zone == "Faubourg de la cathédrale") {
            game[0].classList.add("secondBack");
        }
        /*COMBAT*/
        if (data.story[Goto].Fight == "eileen") {
            window.localStorage.setItem("monsterName", "eileen");
            shop();
        }
        else if (data.story[Goto].Fight) {
            window.localStorage.setItem("monsterId", data.story[Goto].Fight);
            let name = window.localStorage.getItem("monsterId");
            let monsterLife = data3.monstres[name].pv;
            name = data3.monstres[name].nom;
            window.localStorage.setItem("monsterName", name);
            window.localStorage.setItem("monsterHealth", monsterLife);
            console.log("Tatakaï");
            fight();
        }
        showOptions();
    });
}
/*Changer d'arme*/
function changeWeapon() {
    if (!window.localStorage.getItem("weapon")) {
        chooseWeapon[0].classList.add("empty");
        this.classList.add("active");
        for (let i = 0; i < weapons.length; i++) {
            if (weapons[i].classList.contains("active")) {
                window.localStorage.setItem("weapon", (weap[i]).toString().textContent);
                window.localStorage.setItem("inventory", weap[i].textContent);
                addWeapon(weap[i].textContent);
            }
        }
    }
    else {
        for (let i = 0; i < weapons.length; i++) {
            weapons[i].classList.remove("active");
        }
        this.classList.add("active");
        for (let i = 0; i < weapons.length; i++) {
            if (weapons[i].classList.contains("active")) {
                let weaponName = weap[i + 5].textContent.split("/");
                window.localStorage.setItem("weapon", weaponName[0]);
                for (let j = 0; j < data4.weapon.length; j++) {
                    if (data4.weapon[j].name == window.localStorage.getItem("weapon")) {
                        /*DAMAGE TYPES*/
                        let weaponType = String(data4.weapon[j].dmg_type);
                        //console.log(String(weaponType).charAt(0));
                        if (parseInt(weaponType.charAt(0)) == 1) {
                            type[0].innerHTML = "Tranchant";
                        }
                        if (parseInt(weaponType.charAt(0)) == 2) {
                            type[0].innerHTML = "Contandant";
                        }
                        if (parseInt(weaponType.charAt(0)) == 3) {
                            type[0].innerHTML = "Magique";
                        }
                        if (parseInt(weaponType.charAt(1)) == 1) {
                            type[0].innerHTML += "/Feu";
                        }
                        if (parseInt(weaponType.charAt(1)) == 2) {
                            type[0].innerHTML += "/Foudre";
                        }
                        if (parseInt(weaponType.charAt(1)) == 3) {
                            type[0].innerHTML += "/Poison";
                        }
                        if (parseInt(weaponType.charAt(1)) == 4) {
                            type[0].innerHTML += "/Saignement";
                        }
                    }
                }
            }
        }
        //console.log(this);
    }
}
/*Ajouter une arme*/
function addWeapon(weapon) {
    let weaponDamage;
    console.log(weapon);
    for (let i = 0; i < data4.weapon.length; i++) {
        if (data4.weapon[i].name == weapon) {
            weaponDamage = data4.weapon[i].atk;
        }
    }
    if (window.localStorage.getItem("inventory") == window.localStorage.getItem("weapon")) {
        chooseWeapon[0].classList.add("empty");
        displayWeapons();
    }
    else {
        inventory[0].innerHTML += `<figure class="weapon">
                                    <img class="weaponImg" src="../assets/img/weapons/${weapon}.jpg"></img>
                                    <figcaption>${weapon}/DMG:${weaponDamage}</figcaption>
                                    </figure>`;
    }
    for (let i = 0; i < weapons.length; i++) {
        weapons[i].addEventListener("click", changeWeapon);
    }
}
/*****************COMBAT*FUNCTIONS******************/
/*SETUP MAGASIN*/
function shop() {
    let shopables = "";
    for (let i = 0; i < 3;) {
        let number = Math.floor(Math.random() * 8);
        if (shopables.includes(number.toString()) == false) {
            shopables = shopables + number;
            i++;
        }
    }
    console.log(shopables);
    shopFrame[0].classList.remove("empty");
    shopFrame[0].innerHTML = `<figure>
                        <img src="../assets/img/PNJ/eileen.png" alt="Eileen"></img>
                        <figcaption class="monster"></figcaption>
                    </figure>
                    <div class="articles">
                        <figure class="article">
                            <img class="icon" src="../assets/img/Heal.png"></img>
                            <figcaption class="heal">Fioles</figcaption>
                            <button class="buy first">Acheter</button>
                        </figure>
                        <figure class="article">
                            <img class="icon" src="../assets/img/Ammo.png"></img>
                            <figcaption class="bullets">Balles</figcaption>
                            <button class="buy second">Acheter</button>
                        </figure>
                        <figure class="article">
                            <img class="icon" src="../assets/img/weapons/${data4.weapon[shopables[0]].name}.jpg"></img>
                            <figcaption class="weapon">${data4.weapon[shopables[0]].name}</figcaption>
                            <button class="buy third">Acheter</button>
                        </figure>
                        <figure class="article">
                            <img class="icon" src="../assets/img/weapons/${data4.weapon[shopables[1]].name}.jpg"></img>
                            <figcaption class="weapon">${data4.weapon[shopables[1]].name}</figcaption>
                            <button class="buy fourth">Acheter</button>
                        </figure>
                        <figure class="article">
                            <img class="icon" src="../assets/img/weapons/${data4.weapon[shopables[2]].name}.jpg"></img>
                            <figcaption class="weapon">${data4.weapon[shopables[2]].name}</figcaption>
                            <button class="buy fifth">Acheter</button>
                        </figure>
                        <button class="exit">Continuer votre route</button>
                    </div>`;
    for (let i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener("click", buy);
    }
    exit[0].addEventListener("click", exitShop);
}
function exitShop() {
    shopFrame[0].classList.add("empty");
    shopFrame[0].innerHTML = "";
    window.localStorage.setItem("monsterName", "");
    for (let i = 0; i < weapons.length; i++) {
        weapons[i].addEventListener("click", changeWeapon);
    }
}
/*SETUP COMBAT*/
function fight() {
    let monsterName = window.localStorage.getItem("monsterName");
    let monsterId = window.localStorage.getItem("monsterId");
    //console.log(data3.monstres.monsterName);
    let monsterLife = data3.monstres[monsterId].pv;
    monsterFrame[0].innerHTML = `<img class="monsterImg" src="../assets/img/monstres/${monsterName}.png"></img>
                                <figcaption class="monster">${monsterName} vie: ${monsterLife}</figcaption>
                                <button class="atk">ATK</button>
                                <button class="useHeal">HEAL</button>
                                <button class="shoot">TIRER</button>`;
    monsterFrame[0].classList.remove("empty");
    buttons[1].addEventListener("click", atk);
    buttons[2].addEventListener("click", useHeal);
    buttons[3].addEventListener("click", shoot);
}
/*Récupère les infos de combat du JSON*/
function atk() {
    let monsterId = window.localStorage.getItem("monsterId");
    let splited = data4.weapon;
    //console.log("Les armes:"+splited[1]);
    /*variables combat*/
    let playerDamage = 5;
    let playerDamageType = 0;
    let monsterDamageType = data3.monstres[monsterId].faiblesse;
    /*Chercher le nom de l'arme equipée*/
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].classList.contains("active")) {
            let found = weap[i + 5].textContent;
            //console.log(found);
            for (let j = 0; j < splited.length; j++) {
                //console.log(splited[j].includes(found));
                if (splited[j].name.includes(found)) {
                    playerDamage = splited[j].atk;
                    playerDamageType = splited[j].dmg_type;
                    //console.log(playerDamage);
                }
            }
        }
    }
    console.log(String(playerDamageType)[0] + " / " + String(monsterDamageType)[0]);
    if (String(playerDamageType)[0] == String(monsterDamageType)[0]) {
        if (String(playerDamageType)[1] == String(monsterDamageType)[1]) {
            playerDamage = playerDamage * 2.25;
        }
        else {
            playerDamage = playerDamage * 1.75;
        }
    }
    else if (String(playerDamageType)[1] == String(monsterDamageType)[1]) {
        playerDamage = playerDamage * 1.75;
    }
    let actualHealth = parseInt(window.localStorage.getItem("life"));
    let monsterHealth = parseInt(window.localStorage.getItem("monsterHealth"));
    let monsterDamage = data3.monstres[monsterId].atk;
    //Si le monstre a + de vie que le joueur a de dégats:
    console.log("vie du monstre:" + monsterHealth);
    console.log("Atk du joueur:" + playerDamage);
    if (monsterHealth > playerDamage) {
        //Calcul les dégats du joueur
        monsterHealth = monsterHealth - playerDamage;
        window.localStorage.setItem("monsterHealth", monsterHealth.toString());
        monsterName[0].innerHTML = window.localStorage.getItem("monsterName") + " vie: " + window.localStorage.getItem("monsterHealth");
        //Si la vie du joueur est supérieur aux dégats du monstre
        if (actualHealth > monsterDamage) {
            //Calcul les dégats du monstre
            actualHealth = actualHealth - monsterDamage;
            window.localStorage.setItem("life", actualHealth.toString());
            life[0].setAttribute("value", window.localStorage.getItem("life"));
            h3[0].innerHTML = window.localStorage.getItem("life") + "/" + (data2.player.vie).split('/')[1];
        }
        else {
            lost();
        }
    }
    else {
        /*Supprimer le monstre*/
        monsterName[0].innerHTML = window.localStorage.getItem("monsterName") + " vie: 0";
        window.localStorage.setItem("monsterName", "");
        let loot = data3.monstres[monsterId].loot;
        loot = +window.localStorage.getItem("echos") + loot;
        window.localStorage.setItem("echos", loot);
        echos[0].innerHTML = "echos: " + window.localStorage.getItem("echos");
        monsterFrame[0].classList.add("empty");
        //console.log("lédédax");
    }
    audio.play();
}
//console.log(window.localStorage.getItem("fioles"))
function useHeal() {
    let fioles = parseInt(window.localStorage.getItem("fioles"));
    let actualHealth = window.localStorage.getItem("life");
    if (fioles > 0) {
        /*Utilise une fiole*/
        window.localStorage.setItem("fioles", (fioles - 1).toString());
        heal[0].innerHTML = "fioles: " + window.localStorage.getItem("fioles");
        /*Si il manque 50PV ou moins au joueur, lui rend tous ses PV*/
        if (parseInt(window.localStorage.getItem("life")) >= ((data2.player.vie).split('/')[1]) - 50) {
            window.localStorage.setItem("life", ((data2.player.vie).split('/')[1]));
        }
        /*Sinon, le soigne de 50*/
        else {
            window.localStorage.setItem("life", (+actualHealth + 50).toString());
            //console.log(actualHealth);
        }
        life[0].setAttribute("value", window.localStorage.getItem("life"));
        h3[0].innerHTML = window.localStorage.getItem("life") + "/" + (data2.player.vie).split('/')[1];
    }
}
function shoot() {
    let balles = parseInt(window.localStorage.getItem("balles"));
    if (balles > 0) {
        window.localStorage.setItem("balles", (balles - 1).toString());
        bullets[0].innerHTML = "balles: " + window.localStorage.getItem("balles");
        let monsterId = window.localStorage.getItem("monsterId");
        let monsterHealth = +window.localStorage.getItem("monsterHealth") - 10;
        window.localStorage.setItem("monsterHealth", monsterHealth.toString());
        if (monsterHealth > 0) {
            monsterName[0].innerHTML = window.localStorage.getItem("monsterName") + " vie: " + window.localStorage.getItem("monsterHealth");
        }
        else {
            /*Supprimer le monstre*/
            monsterName[0].innerHTML = window.localStorage.getItem("monsterName") + " vie: 0";
            window.localStorage.setItem("monsterName", "");
            let loot = data3.monstres[monsterId].loot;
            loot = +window.localStorage.getItem("echos") + loot;
            window.localStorage.setItem("echos", loot);
            echos[0].innerHTML = "echos: " + window.localStorage.getItem("echos");
            monsterFrame[0].classList.add("empty");
        }
    }
}
/****************************************************/
/********************MAGASIN************************/
/**************************************************/
function buy(evt) {
    let weaps;
    for (let i = 0; i < weap.length; i++) {
        if (weap[i].classList.contains("weapon")) {
            weaps += "/" + weap[i].textContent;
        }
    }
    //weaps = weaps.split("/");
    //achat de soin
    if (this.classList.contains("first")) {
        let fioles = window.localStorage.getItem("fioles");
        if (parseInt(window.localStorage.getItem("echos")) >= 10) {
            window.localStorage.setItem("fioles", (+fioles + 1).toString());
            fioles = window.localStorage.getItem("fioles");
            heal[0].innerHTML = "fioles: " + fioles;
            let money = parseInt(window.localStorage.getItem("echos")) - 10;
            window.localStorage.setItem("echos", money.toString());
            echos[0].innerHTML = "echos: " + window.localStorage.getItem("echos");
        }
    }
    //achat de balles
    else if (this.classList.contains("second")) {
        let ammos = window.localStorage.getItem("balles");
        if (parseInt(window.localStorage.getItem("echos")) >= 10) {
            window.localStorage.setItem("balles", (+ammos + 1).toString());
            ammos = window.localStorage.getItem("balles");
            bullets[0].innerHTML = "balles: " + window.localStorage.getItem("balles");
            let money = parseInt(window.localStorage.getItem("echos")) - 10;
            window.localStorage.setItem("echos", money.toString());
            echos[0].innerHTML = "echos: " + window.localStorage.getItem("echos");
        }
    }
    //achat 1ère arme
    else if (this.classList.contains("third")) {
        console.log(weaps);
        let items = window.localStorage.getItem("inventory");
        let weapsTable = weaps.split("/");
        if (items.includes(weapsTable[1]) == false) {
            items += "/" + weapsTable[1];
            window.localStorage.setItem("inventory", items);
            addWeapon(weapsTable[1]);
        }
    }
    //achat 2ème arme
    else if (this.classList.contains("fourth")) {
        //console.log(weap[12].textContent);
        let items = window.localStorage.getItem("inventory");
        let weapsTable = weaps.split("/");
        if (items.includes(weapsTable[2]) == false) {
            items += "/" + weapsTable[2];
            window.localStorage.setItem("inventory", items);
            addWeapon(weapsTable[2]);
        }
    }
    //achat 3ème arme
    else if (this.classList.contains("fifth")) {
        //console.log(weap[3].textContent);
        let items = window.localStorage.getItem("inventory");
        let weapsTable = weaps.split("/");
        if (items.includes(weapsTable[3]) == false) {
            items += "/" + weapsTable[3];
            window.localStorage.setItem("inventory", items);
            addWeapon(weapsTable[3]);
        }
    }
}
function displayWeapons() {
    /*Equipement*/
    let weaponDamage;
    for (let i = 0; i < data4.weapon.length; i++) {
        if (data4.weapon[i].name == window.localStorage.getItem("weapon")) {
            weaponDamage = data4.weapon[i].atk;
        }
    }
    if (window.localStorage.getItem('inventory')) {
        for (let j = 0; j < eachWeapons.length; j++) {
            //console.log(eachWeapons[j]);
            for (let k = 0; k < data4.weapon.length; k++) {
                if (eachWeapons[j] == data4.weapon[k].name)
                    weaponDamage = data4.weapon[k].atk;
            }
            let weaponName = window.localStorage.getItem("inventory").split("/");
            weaponName[j] = weaponName[j].split("-");
            weaponName = weaponName[j][0];
            inventory[0].innerHTML += `<figure class="weapon">
                                        <img class="weaponImg" src="../assets/img/weapons/${weaponName}.jpg"></img>
                                        <figcaption>${weaponName}/DMG:${weaponDamage}</figcaption>
                                    </figure>"`;
        }
    }
    for (let i = 0; i < weapons.length; i++) {
        weapons[i].addEventListener("click", changeWeapon);
    }
}
/**************************************************/
function lost() {
    //Définit la vie du joueur a zéro si il meurt
    life[0].setAttribute("value", (0).toString());
    h3[0].innerHTML = "0" + "/" + (data2.player.vie).split('/')[1];
    monsterFrame[0].classList.add("empty");
    window.localStorage.clear();
    inventory[0].innerHTML = "";
    init();
}
/*Au chargement de la page*/
document.addEventListener('DOMContentLoaded', function () {
    /*EventsListeners Options*/
    /*
    resetButton[0].addEventListener("click",lost);
    firstOption[0].addEventListener("click", option);
    firstOption.value = 1;
    secondOption[0].addEventListener("click", option);
    secondOption.value = 2;
    thirdOption[0].addEventListener("click", option);
    thirdOption.value = 3;
    */
    /*EventListeners Buttons*/
    /*
    buttons[1].addEventListener("click", atk);
    buttons[2].addEventListener("click", useHeal);
    buttons[3].addEventListener("click", shoot);
    exit[0].addEventListener("click", exitShop);

    for (let i = 0; i < weapons.length; i++) {
        weapons[i].addEventListener("click", changeWeapon);
    }
    for (let i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener("click", buy);
    }
    */
});
