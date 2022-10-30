


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


import {articleContenttoex} from '../blog/blog.js'

window.onload= ()=>{

    console.log(articleContenttoex)

}

setTimeout(()=>{

    console.log(articleContenttoex)

    document.querySelector('#title').textContent = articleContenttoex.title
    document.querySelector("#articleImg").setAttribute('src', articleContenttoex.img)
    document.querySelector('#content').textContent = articleContenttoex.content

}, 5000)

