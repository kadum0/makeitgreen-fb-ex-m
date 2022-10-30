


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

const makeitgreen = initializeApp(makeitgreenConfig, 'makeitgreen')

const makeitgreenAuth = getAuth(makeitgreen)

const makeitgreendb = getFirestore(makeitgreen)


//// get data 
window.onload = async ()=>{

    // let d = await fetch("/donors")
    // let donors = await await d.json()

    let donorsColl = collection(makeitgreendb, 'donors')
    let donors
    await getDocs(donorsColl).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            donors = docs
            console.log(donors)

            ////deploy; 
            // ([...donorName]).forEach(e=>console.log(e.donorName))
            // Object.values(donors).forEach(e=>console.log(e.donorName))
            
            document.querySelector('#donors').innerHTML = ''

            Object.values(donors).forEach(donor=>{
                console.log(donor)
                ////make
                let div = `
                <a href="${donor.website}" target="_blank">
                    <div class="donor">
                        <h3 class="name">${donor.donorName}</h3>
                        <img src="${donor.logo}" alt="">
                    </div>
                </a>
        `
        document.querySelector('#donors').innerHTML += div
                
        
        })



        ////content 


        ////insert 
    })

}


// 



