



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"

import { getFirestore, onSnapshot,
	collection, doc, getDocs, getDoc,
	addDoc, deleteDoc, setDoc,
	query, where, orderBy, serverTimestamp,
	updateDoc } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

// firebase storage; 
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, list} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js'


const makeitgreenConfig = {
    apiKey: "AIzaSyDRHNu_OxJWPAT1yRlH7cFPue04dvsG3x8",
    authDomain: "make-it-green-d951a.firebaseapp.com",
    projectId: "make-it-green-d951a",
    storageBucket: "make-it-green-d951a.appspot.com",
    messagingSenderId: "316712968744",
    appId: "1:316712968744:web:1ac99ff65f7f9ea5c5cb1d",
    measurementId: "G-PFKZZ95240"
};

// const publicLineConfig = {
//     apiKey: "AIzaSyAF-kHhmhnZ2z6GDRhX3YK6ZeN1wQifC8M",
//     authDomain: "public-line-19206.firebaseapp.com",
//     projectId: "public-line-19206",
//     storageBucket: "public-line-19206.appspot.com",
//     messagingSenderId: "897098333489",
//     appId: "1:897098333489:web:883a9eaff7711d7c4ec410",
//     measurementId: "G-PLWGYD6KBC"
// };

// const bygreenConfig = {
//     apiKey: "AIzaSyDqK1z4fd7lO9g2ISbf-NNROMd7xpxcahc",
//     authDomain: "bygreen-453c9.firebaseapp.com",
//     projectId: "bygreen-453c9",
//     storageBucket: "bygreen-453c9.appspot.com",
//     messagingSenderId: "19954598250",
//     appId: "1:19954598250:web:ba57c792bdf65dbc18a513",
//     measurementId: "G-265TN8HGKX"
//     };

const bygreenConfig = {
    apiKey: "AIzaSyDqK1z4fd7lO9g2ISbf-NNROMd7xpxcahc",
    authDomain: "bygreen-453c9.firebaseapp.com",
    projectId: "bygreen-453c9",
    storageBucket: "bygreen-453c9.appspot.com",
    messagingSenderId: "19954598250",
    appId: "1:19954598250:web:ba57c792bdf65dbc18a513",
    measurementId: "G-265TN8HGKX"};



const makeitgreen = initializeApp(makeitgreenConfig, 'makeitgreen')
// const publicLine = initializeApp(publicLineConfig, 'publicLine')
const bygreen = initializeApp(bygreenConfig, 'bygreen')

// const makeitgreenAuth = getAuth(makeitgreen)
// const publicLineAuth = getAuth(publicLine)
// const bygreenAuth = getAuth(bygreen)

const makeitgreendb = getFirestore(makeitgreen)
// const publicLinedb= getFirestore(publicLine)
const bygreendb = getFirestore(bygreen)


// console.log(makeitgreen)
// console.log(publicLine)
// console.log(bygreendb)




////make objects 
        ////getting icon; icon is special object not just an image
        let conFinished = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-green.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });
        let conUnfinished = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-red.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });

        let nextCampPin = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-yellow.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });


///ui-js-data

// initialize the map; 
const map = L.map('map').setView([33.396600, 44.356579], 9); //leaflet basic map

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA'
    }).addTo(map);
    
    let control = L.Control.geocoder().addTo(map);
    

/////////public line; stuff 
let pathObjects = []
let pathList 
function displayLines (pd){
    console.log("get routes; ", pd)
    
    // Object.values(pd).forEach(e=>console.log(e.path))

    ///deploy them; store
    Object.values(pd).forEach(e => {

        let obje 


            console.log(e.path)
            obje = L.polyline(e.path, {
                // color: "red",
            }).addTo(map)
            // oldObjects.push(pathId) //dont need old objects
            // pathob.addEventListener("click", (e) => console.log(e.target))

        pathObjects.push(obje)
        obje.addEventListener("mouseover", (e)=>{
            pathObjects.forEach(e=>{e.setStyle({color: "#3388FF", fillColor: "#3388FF"})})
            let i = e.target
            map.removeLayer(e.target)
            i.addTo(map)
            pathObjects.push(i)
            i.setStyle({color:"rgb(223, 39, 39)", fillColor: "rgb(223, 39, 39)"})
        })
        obje.addEventListener("click", (e)=>{
            pathObjects.forEach(e=>{e.setStyle({color: "#3388FF", fillColor: "#3388FF"})})
            let i = e.target
            map.removeLayer(e.target)
            i.addTo(map)
            pathObjects.push(i)
            i.setStyle({color:"rgb(223, 39, 39)", fillColor: "rgb(223, 39, 39)"})
        })
    })


    
}
function hideLines(pd){
    pd.forEach(e=>{
        map.removeLayer(e)
    })
}
//////button that shows the lines 
document.querySelector(".displayLines").addEventListener("click", (e)=>{
    console.log(e.target.classList)

    e.target.classList.toggle("add")
    if(e.target.classList.contains("add")){
        e.target.style.background = "#ff2a2a"
        displayLines(pathList)
        // e.target.parentElement.append(suggetstMakeLinesBtn)
        document.querySelector(".suggest").style.display = "block"
    }else{
        hideLines(pathObjects)
        // e.target.style.background = "#27f060"
        e.target.style.background = '#68C451'
        // e.target.parentElement.lastElementChild.remove()
        document.querySelector(".suggest").style.display = "none"
    }
})



// //////pins 
// let prevMarker 
// function insertPins (dataList, type){

//     //new method; check if red or green then sub check if next or premade 
//     if(type == 'red'){
        
//         // loop over them; 
//         dataList.forEach(red=>{
//             // do shared stuff; 
//             // coords, imgs, names; make pin and link data with to be inserted onclick
//             let names
//             // edit; get one name; no need for loop and list 

//             if(red.next){
//                 names = accountsList.filter(account =>account.userName == red.next.by)

//                 console.log(red.next.by,names)
//                 names = `
//                 <a href=' http://${window.location.host+'/'+ red.next.by}/next '> <b style='color: blue;'> link </b> </a>
//                 <a href='http://${window.location.host+'/profile/'+ red.next.by}'>
//                 <span class="account contr teamContr">
//                     <h4 class="userName"> ${names[0].userName}</h4>
//                     <img class="accountImg" style="background-image: url('${names[0].img}');"></img>
//                 </span>
//                 </a>
//                 `

//             }else{
//                 let filtered = accountsList.filter(account=>'@'+account.userName == red.names)
            
//                 if(filtered[0]){
//                     console.log(filtered[0])
//                     names =  `
//                     <a href='http://${window.location.host+'/profile/'+ filtered[0].userName}'>
//                 <span class="account contr">
//                     <h4 class="userName">@${filtered[0].userName}</h4>
//                     ${filtered[0]?`<img class="accountImg" style="background-image: url('${filtered[0].img}');"></img>`:null}
                    
//                 </span>
//                 </a>
//                 `
                    
//                 }else{
//                     names = `<h4 class="contrName">${red.names[0]}</h4>`
//                 }
//             }

//     let pin = L.marker(red.coords, {
//         icon:redPin,
//         popupAnchor: [-10, -30]
//     }).bindPopup(`<div>${names}</div>`).addTo(map)
//     pin.id = red.id


//     // make the dom elements;

//     // new method
//     let beforeImgsElements = []
//     red.beforeImgs.forEach(img=>{
//         let imgEle = document.createElement('img')
//         imgEle.style.backgroundImage = `url('${img}')`
//         beforeImgsElements.push(imgEle)
//     })


//     // old method
//     // let beforeImgsElements = red.beforeImgs.map(img=>{
//     //     return `<img style='background-image:url("${img}")'>`
//     // })
//     // pin.beforeImgs = beforeImgsElements.join('').toString()

//     pin.addEventListener('click', (ev)=>{



//         // new method
//         document.querySelector('#beforeandafter').innerHTML = ``
//         let beforeImgsDiv = document.createElement('div')
//         beforeImgsDiv.setAttribute('id', 'beforeImgs')
        

//         let afterImgsDiv = document.createElement('div')
//         afterImgsDiv.setAttribute('id', 'afterImgs')
//         beforeImgsElements.forEach(imgDiv=>{
//             beforeImgsDiv.append(imgDiv)
//         })
//         document.querySelector('#beforeandafter').append(beforeImgsDiv, afterImgsDiv)
        
//         // old method
//         // document.querySelector('#beforeandafter').innerHTML = `
//         //     <div id="afterImgs">
//         //     </div>
//         //     <div id="beforeImgs">
//         //         ${ev.target.beforeImgs}
//         //     </div>
//         // `
//         // document.querySelector('#beforeImgs').innerHTML = ev.target.beforeImgs
//         // document.querySelector('#afterImgs').innerHTML = ''

//         document.querySelector('#details').textContent = ''
//         document.querySelector('#date').textContent = ''

//         console.log(ev.target)

//         //method; circle; 
//         prevMarker?map.removeLayer(prevMarker):null
//         prevMarker = L.circle(ev.target._latlng, {radius: 800 ,color: (red.next?'yellow':'red')}).addTo(map)
//         currentId = ev.target.id

//         //method; set property object to pin object; selected, normal


//         if(currentId){
//             document.querySelector('#sendRedToGreen').removeAttribute('disabled')
//             document.querySelector('#sendYellow').removeAttribute('disabled')
            
//         }else{
//             document.querySelector('#sendRedToGreen').setAttribute('disabled', true)
//             document.querySelector('#sendYellow').setAttribute('disabled', true)
//         }
//     })


//             // check if next 
//             if(red.next){

//                 // change icon 
//                 pin.setIcon(L.icon({
//                     iconUrl: `./imgs/${red.next.by}yellowpin.png`,
//                     shadowSize: [50, 64], // size of the shadow
//                     shadowAnchor: [4, 62], // the same for the shadow
//                     iconSize: [25, 41],
//                     iconAnchor: [12, 41],
//                     popupAnchor: [0, -30] 
//                 }))

//                 pin.addEventListener('click', ()=>{
//                 // change icon 

//                 })


//                 // settting time objects; 
//                 // let intendedDate = {}
//                 let intendedDate = {
//                     year: red.next.date.year,
//                     month: red.next.date.month,
//                     day: red.next.date.day,
//                     hour: red.next.date.hour, 
//                     minute: red.next.date.minute,
//                     part: red.next.date.part
//                 }

//                 var today = new Date();
//                 var dd = + String(today.getDate()).padStart(2, '0');
//                 var mm = + String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//                 var yyyy = today.getFullYear();

//                 let currentDate ={
//                     year: yyyy,
//                     month: mm,
//                     day: dd,
//                     hour: today.getHours(),
//                     minute: today.getMinutes()
//                 }

//                 intendedDate.part == 'pm'?intendedDate.hour = + intendedDate.hour + 12:null

//                 let remainedDay
//                 if(intendedDate.day >  currentDate.day ){
//                     remainedDay = intendedDate.day - currentDate.day
//                 }else{
//                     remainedDay = (intendedDate.day + 30) - currentDate.day
//                     intendedDate.month = intendedDate.month - 1
//                 }

//                 let reaminedHour 
//                 if(intendedDate.hour > currentDate.hour){
//                     reaminedHour = intendedDate.hour - currentDate.hour
//                 }else{
//                     reaminedHour = (intendedDate.hour + 24) - currentDate.hour
//                     intendedDate.day = intendedDate.day - 1
//                 }

//                 let remainedMinute
//                 if(intendedDate.minute > currentDate.minute ){
//                     remainedMinute = intendedDate.minute - currentDate.minute
//                 }else{
//                     remainedMinute = (intendedDate.minute + 60) - currentDate.minute
//                     intendedDate.hour = intendedDate.hour - 1
//                 }


//                 let remainedDate = {
//                     year: intendedDate.year - currentDate.year,
//                     month: intendedDate.month - currentDate.month,
//                     day: remainedDay,
//                     hour: reaminedHour,
//                     minute:remainedMinute
//                 }
//                 // how to find the remained minutes to the intended time ???
//                 console.log(intendedDate, currentDate, remainedDate)
//                 // find the team account and make the object; remove the normal user ???
//                 // inser the info 
//                 let coming = document.createElement('span')
//                 coming.classList.add('comingCounter')
//                 coming.textContent = red.next.going.length
//                 // coming.innerHTML = `<span class='comingCounter'>0</span>`
//                 // let coming = `<span class='comingCounter'>0</span>`
//                 let comingBtn = document.createElement('button')
//                 dbUser?comingBtn.setAttribute('disabled', true):removeAttribute('disabled')
//                 comingBtn.classList.add('coming', 'box', 'bycreate')
//                 comingBtn.textContent = 'coming'
//                 if(red.next.going.includes(dbUser.userName)){
//                     comingBtn.classList.toggle('on')
//                 }
//                 // comingBtn.setAttribute('disabled', true)

//                 let div = document.createElement('div')
//                 let newNames = document.createElement('div')
//                 newNames.innerHTML = names

//                 let intendedId = red.id

//                 comingBtn.addEventListener('click', (ev)=>{
//                     ev.target.classList.toggle('on')
//                     if(ev.target.classList.contains('on')){
//                         ev.target.parentElement.querySelector('.comingCounter').textContent ++
//                         updateDoc(doc(bygreenDb, 'tempRed', red.id),{"next.going":arrayUnion(dbUser.userName)}).then(()=>console.log('sent'))
//                     }else{
//                         ev.target.parentElement.querySelector('.comingCounter').textContent --
//                         updateDoc(doc(bygreenDb, 'tempRed', red.id),{"next.going":arrayRemove(dbUser.userName)}).then(()=>console.log('sent'))

//                     }
//                 })

//                 let campDetials = document.createElement('div')
//                 let detials = `
//                 <div class='timer'>
//                 <p>${red.next.info}</p>
//                 <b>
//         <p>${red.next.date.month}m-${red.next.date.day}d-${red.next.date.hour}h:${red.next.date.minute}min, ${red.next.date.part} </p>
//         <div style='color:red;'>الوقت المتبقي:</div>
//         <p style='color:red'> ${remainedDate.month}m-${remainedDate.day}d-${remainedDate.hour}h:${remainedDate.minute}min </b> </p>
//                 </div>
//                 `

//                 campDetials.innerHTML = detials
//                 div.append(newNames,comingBtn, coming,campDetials)
//                 pin.bindPopup(div)
//             }else{
//                 // normal pin
//             }
//         })
//     }else if(type == 'green'){
//         //loop over list; 
//         // make pin content; names, before and after imgs,
//         // make pin function; onlick

//         dataList.forEach(green=>{
//             // general (both; normal and to green)


//             // by; team and names
//             let theteam = accountsList.filter(account=>'@'+ account.userName == green.managedBy )
//             green.names = green.names.map(name=>name.trim())
//             console.log(green.names)
//             let names= green.names.map(ee=>{
//                 console.log(ee, accountsList)
//                 // accountsList.forEach(account=>console.log('@'+account.userName,
//                 // ee.trim(), '@'+ account.userName === ee.trim()))
                
//                 let filtered = accountsList.filter(account=>('@'+ account.userName) == ee)
//                 console.log(filtered)
//                 if(filtered[0]){
//                     console.log(filtered[0])
//                     return `
//                     <a href='http://${window.location.host+'/profile/'+ filtered[0].userName}'>
//                 <span class="account contr">
//                     <h4 class="userName">${ee}</h4>
//                     ${filtered?`<img class="accountImg" style="background-image: url('${filtered[0].img}');"></img>`:null}
//                 </span>
//                 </a>
//                 `
                    
//                 }else{
//                     return `<h4 class="contrName">${ee}</h4>`
//                 }
//         }).join('').toString()


//         let by = `
//         <b>المساهمين ❤</b>

//         <div class=''> ${theteam[0]? `<div class="account contr teamContr">
//             <h3 class="userName"> ${theteam[0].userName} </h3>
//         <img class="accountImg" style="background-image:url('${theteam[0].img}');">
//         </div> <br>`:''}${names}</div>`
//         let logImgs

//         console.log(green.log)
//         if(green.log[0]){
//             logImgs = green.log.map(logImg=>{
//                 return `                    
//                 <span class="loggedCamp">
//                     <p>${logImg.date}</p>
//                     <img src="${logImg.img}" alt="">
//                 </span>`
//             }).join('').toString()
//             console.log(logImgs)
//             // logImgs.replaceAll(',', '')
//         }

//             let pin = L.marker(green.coords, {
//                 icon: greenPin,
//                 popupAnchor: [-10, -30]
//             }).bindPopup(`<div>${by}</div>`).addTo(map)
//             // make the dom elements;
//             let beforeImgsElements = green.beforeImgs.map(img=>{
//                 return `<img style='background-image:url("${img}")'>`
//             }).join('').toString()
//             let afterImgsElements = green.afterImgs.map(img=>{
//                 return `<img style='background-image:url("${img}")'>`
//             }).join('').toString()

//             pin.id = green.id
//             pin.beforeImgs = beforeImgsElements
//             pin.afterImgs = afterImgsElements
//             pin.details = green.details
//             pin.date = green.date
//             logImgs?pin.logImgs = logImgs:null

//             if(theteam[0]){
//                 pin.setIcon(L.icon({
//                     iconUrl: `./imgs/${green.managedBy.slice(1)}greenpin.png`,
//                     shadowSize: [50, 64], // size of the shadow
//                     shadowAnchor: [4, 62], // the same for the shadow
//                     iconSize: [25, 41],
//                     iconAnchor: [12, 41],
//                     popupAnchor: [0, -30] 
//                 }))
//             }


//             pin.addEventListener('click', (ev)=>{
//                 console.log(ev.target)

//                 document.querySelector('#beforeandafter').innerHTML = `
//                 <div id="beforeImgs">
//                     ${ev.target.beforeImgs}
//                 </div>
//                 <div id="afterImgs">
//                     ${ev.target.afterImgs}
//                 </div>
//             `
    
    

//                 // document.querySelector('#beforeImgs').innerHTML = ev.target.beforeImgs
//                 // document.querySelector('#afterImgs').innerHTML = ev.target.afterImgs
        
//                 document.querySelector('#details').textContent = ev.target.details
//                 document.querySelector('#date').textContent = ev.target.date

//                 document.querySelector('#loggedContent').innerHTML = ev.target.logImgs

//                 document.querySelector('#sendLog').removeAttribute("disabled")
//                 prevMarker?map.removeLayer(prevMarker):null
//                 prevMarker = L.circle(ev.target._latlng, {radius: 800 ,color: 'green'}).addTo(map)

//                 currentId = ev.target.id
//             })



//             if(green.redToGreen){
//                 // check the team; 
//                 // change icon 
//             }

//         })
//     }
// }

// ///////get data 
// // containers 
// let currentPin
// let currentId
// let routes
// let greenPins
// let shops 

// window.onload = async ()=>{

//     // may change onload to be here
// await onAuthStateChanged(bygreenAuth, async (user)=>{
//     console.log('authstatefun', dbUser)
//     if(user){
//         console.log('from auth ', user)
//         authUser = user
//         user.getIdTokenResult().then(idTokenResult => {
//             console.log('claims', idTokenResult.claims)
//             type = idTokenResult.claims
//             // if team 
//             if (idTokenResult.claims.team){
//                 document.querySelectorAll('.teamEle').forEach(teamEle=>{
//                     teamEle.style.display = 'inline-block'
//                 })
//                 // document.querySelector('.addYellow').style.display = 'block'
//             }
//         })
//         let dbUserDoc = await getDoc(doc(bygreendb, 'users', user.uid))
//         dbUser = dbUserDoc.data()

//         if(dbUser){
//         dbUser.id = dbUserDoc.id

//             ////registered
//             document.querySelectorAll('.logged').forEach(e=>{e.style.display = 'block'})
//             document.querySelectorAll('.makeprofile').forEach(e=>e.style.display = 'none')
//             document.querySelectorAll('.notlogged').forEach(e=>e.style.display = 'none')

//             ///insert the basic info; 
//             document.querySelector('.minicuserimg').style.backgroundImage = `url('${dbUser.img}')`
//             // document.querySelector(".minicuserusername").textContent = '@'+ dbUser.userName
//             document.querySelector('.cuserimg').style.backgroundImage = `url('${dbUser.img}')`
//             document.querySelector(".cuserusername").textContent = '@'+ dbUser.userName
//             document.querySelector(".cusername").textContent = dbUser.name
//             document.querySelector(".cuserbio").textContent = dbUser.bio
//             document.querySelector("#profileLink").href = window.location.host+'/'+ dbUser.userName

//             document.querySelector(".redPin").querySelector('span').textContent = dbUser.red.length
//             document.querySelector(".greenPin").querySelector('span').textContent += dbUser.green.length
//             // loop over the green pins and check if the pin do contain the
//             //of the current account; if so add one and so ...
//             document.querySelector(".yellowPin").querySelector('span').textContent += dbUser.yellow.length


//         }else{
//             /////half registered; make profile
//             document.querySelectorAll('.makeprofile').forEach(e=>e.style.display = 'block')
//             document.querySelectorAll('.logged').forEach(e=>e.style.display = 'none')
//             document.querySelectorAll('.notlogged').forEach(e=>e.style.display = 'none')
//         }
        
//     }else{
//         /////not registered
//         document.querySelectorAll('.notlogged').forEach(e=>e.style.display = 'block')
//         document.querySelectorAll('.logged').forEach(e=>e.style.display = 'none')
//         document.querySelectorAll('.makeprofile').forEach(e=>e.style.display = 'none')

//         dbUser = 'none'
//     }
//         if(accountsList){
//             // console.log(accountsList, dbUser)
//             ranking('total', 'de')
//         }

//     getDocs(collection(bygreendb, 'users')).then((data)=>{
//             let docs = []
//                 data.docs.forEach(doc=>{
//                     docs.push({...doc.data(), id: doc.id})
//                 })
//                 accountsList = docs
//                 console.log(docs)
//                 document.querySelector('#accountsCounter').textContent = accountsList.length



//         getDocs(collection(bygreendb, 'red')).then((data)=>{
//             let docs = []
//                 data.docs.forEach(doc=>{
//                     docs.push({...doc.data(), id: doc.id})
//                 })
//                 redPins = docs
//                 console.log(docs)
//                 insertPins(redPins, 'red')
//                 console.log(document.querySelector('#yellowCounter').textContent)
//                 redPins.forEach(redPin =>redPin.next?document.querySelector('#yellowCounter').textContent++:document.querySelector('#redCounter').textContent ++)

//                     // check the url; if have next
//     console.log(window.location.href.split('/'))
//     console.log(window.location.hostname)
//     if(window.location.href.split('/').includes("next")){

//         // list method; 
//         let theteam = window.location.href.split('/')[window.location.href.split('/').length-3]
//         let theteamObj= accountsList.filter(account=>account.userName== theteam)
//         console.log( theteamObj)
//         let theCamp = redPins.filter(pin=>pin.id == theteamObj[0].yellow[0])
//         console.log(theCamp)
//         map.flyTo({lat: theCamp[0].coords.lat, lng: theCamp[0].coords.lng}, 16)
//     }

//                 })

//     getDocs(collection(bygreendb, 'green')).then((data)=>{
//         let docs = []
//             data.docs.forEach(doc=>{
//                 docs.push({...doc.data(), id: doc.id})
//             })
//             greenPins = docs
//             console.log(docs)

//             insertPins(greenPins, 'green')
//             document.querySelector('#greenCounter').textContent = greenPins.length

//             let contriCounter = 0
//             greenPins.forEach(greenPin =>contriCounter += greenPin.names.length)
//             document.querySelector('#contriCounter').textContent = contriCounter

//             document.querySelector('#sendingDataMessage').style.display = 'none'
//             })

//         if(dbUser){
//             ranking('total', 'de')
//         }

//         })




// })





//     getDocs(collection(bygreendb, 'routes')).then((data)=>{
//         let docs = []
//             data.docs.forEach(doc=>{
//                 docs.push({...doc.data(), id: doc.id})
//             })
//             routes = docs

//             console.log(routes)
//         setTimeout(() => {
//             document.querySelector('#displaylines').classList.toggle('add')
//             document.querySelector('#displaylines').textContent = "اخفاء المسارات"
//             document.querySelector('#displaylines').style.background = "#ff2a2a"
//             displayLines(routes)
//             document.querySelector("#suggestaddingline").style.display = "block"
                
//         }, 1500);
//         }).catch(err=>console.log(err.message))
//         document.querySelector("#displaylines").removeAttribute("disabled")

//         // get shops; 
//         getDocs(collection(bygreendb, 'shop')).then((data)=>{
//             let docs = []
//                 data.docs.forEach(doc=>{
//                     docs.push({...doc.data(), id: doc.id})
//                 })
//                 shops = docs
//                 console.log(docs)

//                 // insertPins(greenPins, 'green')
//                 // document.querySelector('#greenCounter').textContent = greenPins.length

//                 document.querySelector('#sendingDataMessage').style.display = 'none'
//                 document.querySelector('#displayShops').removeAttribute('disabled')
//     })
// }




/////get the home data; green, red, routes
window.onload= async ()=>{

    /////firestore 

    let mapStatics = {}

    ////routes 
    let routesColl = collection(bygreendb, 'routes')
    await getDocs(routesColl).then((data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        mapStatics.routes = docs
        console.log(docs)
    }).catch(err=>console.log(err.message))
    pathList = mapStatics.routes
    displayLines(mapStatics.routes)

    // //////red 
    let redColl = collection(bygreendb, 'red')
    await getDocs(redColl).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            console.log(docs)
            mapStatics.red = docs
        }).catch(err=>console.log(err.message))
    Object.values(mapStatics.red).forEach(e=>{
        // L.marker(e.coords)
        L.marker(e.coords, {
            icon: conUnfinished, 
            popupAnchor: [-10, -30] 
        }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames + e.bName}`).addTo(map)
    })
    ////green 
    let greenColl = collection(bygreendb, 'green')
    await getDocs(greenColl).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            mapStatics.green = docs
            console.log(docs)
        }).catch(err=>console.log(err.message))
    // insert green
    Object.values(mapStatics.green).forEach(e=>{
        // L.marker(e.coords)
        L.marker(e.coords, {
            icon: conFinished, 
            popupAnchor: [-10, -30] 
        }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames + e.bName}`).addTo(map)
    })

        // let yellowColl = collection()
        // await getDocs(yellowColl).then((data)=>{
        //     let docs = []
        //         data.docs.forEach(doc=>{
        //             docs.push({...doc.data(), id: doc.id})
        //         })
        //         mapStatics.routes = docs
        //         console.log(docs)
        //     }).catch(err=>console.log(err.message))
        
    // insert yellow 
    // Object.values(mapStatics.yellow).forEach(e=>{
    //     // L.marker(e.coords)
    //     m = L.marker(e.coords, {
    //         icon: nextCampPin, 
    //         popupAnchor: [-10, -30] 
    //     }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames}`).addTo(map)
    // })

    document.querySelector("#greenPinCounter").textContent = mapStatics.green.length
    document.querySelector("#redPinCounter").textContent = mapStatics.red.length
    document.querySelector("#routes").textContent = mapStatics.routes.length
    /////direct deploy 
    document.querySelector(".displayLines").classList.add('add')
    document.querySelector(".displayLines").background = "#ff2a2a"


    // // get articles 
    let articles = []
    let articleColl = collection(makeitgreendb, 'articles')
    await getDocs(articleColl).then((data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        articles = docs
        console.log(docs)

            // deploy artciles; 
        // make objects; imgs 

            document.querySelector('.article-samples').innerHTML = ''
        for (let i = 0; i < 3; i++) {
            let articleTemp =  `
            <a href='/blog/${articles[i].title}' class='article'
                <div>
                        <img style='background-image:url("${articles[i].img}")'> 
                        <div class="content">
                            <h2>${articles[i].title}</h2>
                            <p>${articles[i].content}</p>
                        </div>
                </div>
            </a>
            `
            document.querySelector('.article-samples').innerHTML += articleTemp
                }


    }).catch(err=>console.log(err.message))

    console.log(articles)


    // get donors
    let donors = []
    await getDocs(collection(makeitgreendb, 'donors')).then((data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        donors = docs
        console.log(docs)
    ///deploy donors 
        ///make elements
            document.querySelector('.donor-samples').innerHTML = ''

        for (let i = 0; i < 3; i++) {
            let donorsTemp = `
            <div class="donor">
                <img style='background-image:url("${donors[i].logo}")'> 
                <h2 class="donor-name">${donors[i].name}</h2>
            </div>
        `
        
    document.querySelector('.donor-samples').innerHTML += donorsTemp
            }
        
    // let donorsTemp = `
    //     <div class="donor">
    //     <img style='background-image:url("${donors[0].logo}")'> 
    //     <h2 class="donor-name">${donors[0].name}</h2>
    //     </div>

    //     <div class="donor">
    //     <img style='background-image:url("${donors[1].logo}")'> 
    //         <h2 class="donor-name">${donors[1].name}</h2>
    //     </div>
    //     <div class="donor">
    //     <img style='background-image:url("${donors[2].logo}")'> 
    //         <h2 class="donor-name">${donors[2].name}</h2>
    //     </div>
    // `
    //     ////insert elements
    // document.querySelector('.donor-samples').innerHTML = donorsTemp
    }).catch(err=>console.log(err.message))
    console.log(donors)
    console.log(donors[0].logo)



}

