


// firebase 
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

// to only replace the server side functions; 


//express tools and configuring
let express = require("express")
let app = express()
let cors = require("cors")
//express configuration 
app.use(express.json())
app.use(cors())
require("dotenv").config()


////////// pages to send
app.use("/",express.static("./public"))
app.use("/admin",express.static("./admin"))
// app.use("/",express.static("./imgs"))


require("dotenv").config()




import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, useDeviceLanguage} from "firebase/auth"
import { getFirestore, onSnapshot,
	collection, doc, getDocs, getDoc,
	addDoc, deleteDoc, setDoc,
	query, where, orderBy, serverTimestamp,
	updateDoc, arrayUnion, arrayRemove, DocumentReference} from "firebase/firestore";

// firebase storage; 
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, list} from 'firebase/storage'


let bygreenServiceAccount = {
    "type": "service_account",
    "project_id": "bygreen-453c9",
    "private_key_id": "20ec235e14274b3b9bb80229eb9dfb339d59b259",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrLSR3szcBogA5\nU2dQRcFUu20J9kh63d6UQp+r8yZFyyhOirNXTITnC1PaoSdc6WCYqZr/tpCDdXk1\nDEckfU10Evi5HNq2Gi/zmxIEn26TFoptD/MSthFRQ8xXCzq9/JBcQ8ULJXvV/bqL\njFFTkXCElCF34MkVkPEmE4e7cC6qm1Bj55YOPr+EBzagSgC0xCItW6Xu8QXP31oR\no0u2ydQKJxtUbcgP37e0tnk9YaV2o6VvnHDplTkTHLvVua3TKBgU2hDn3Frjtte8\nwJFjsKwW2TPN/KF168UGNSBptpIyaSFKJGEP89MxJXcY3RmrkbMpke4cVeo4e9ck\nsIjNAzI9AgMBAAECggEAE5PYqWYSYvnry6Kp3Mj1mSLMkEieNos8ozlReMGY/X+E\nTyNW6qOiSaiGgSlQTrSUazFuvFNdiON9Jt+OHXLFUoK+9rEBpLUvCc4RC/1OEL2R\nvHKICvpO1bwK2WO75rHFsv+/QAyb8rgPx1kXjhbCxy8H+uV3KiPHKOMv8XSdqb5k\nlbosK7pIIeFG+DdvPgTyUBjpnlOz7gqDY2V0Rub/J3uNXVqI02vC2wF2CLJNrAy+\nyBnpQDHx6gsplbUNoEBwXbAo/5gfIon9Hs7Ejd+igGWZuVFp0YMMj1v9O4xeTk3G\n0e3+Tu9bNA0CpYQvRtfQBEuIdjNWgN3Ujx9b+RSSwwKBgQDo5UbYJ5+D1JCQ9LeI\nJY1lzB678YPrHDflYFyijChMndMDTMMhx3lCZcRfS22ZlK3f9EJIxPpW2gib3jk4\n6NjLMukedpZUzEHjQotA9o48dfMHp/SgTu1x9QwFOPZI3/JzEyP1j69VReHTJT/F\nYyRq9DITAmczmoUmMtcgVKIiTwKBgQC8KGoznY0wCI6K+qz5yDFp4TjByF/Tp0rZ\nox/oSaZ/Fx/t2mqNwwssNcfVqo9vCUYfwXJB5C8opgbVq2tfVjMRc1moAznOVHxK\n6RwLiICaN53QPk9Y4QRMh5q3POxrCwuNhcin2nHyJcvsrmhYvTIdh5S7+qvmyLZ8\nCsRq1DM7swKBgQDCht9JpK7kGiQ2L3Es0tDr+jahnPUm6Ab4HCjDzHXMqPabhv5l\ntItgHkiLoCEHatxgd1D2HzFKYgtWxaLeGf8amoeE3mBqq8FM5UQTGt1rOsmn123I\niKRjzt4fbpin/gYwgAhFD6LPgvNAvZgqcsj0XMuGfTdeLu6QHV76rjZOmQKBgFWP\nJyPLa81AxtipvohioR2dXXq4y+Jpux6WD8dH3l8CO/GjlTpbS7RRzEn7ofeCxxFf\nnL4brdoVDRySM2QJxXUU99rvhJSvVEmYELmp25jE2407GEe5IoROUWsrV/Ig9qLn\nB+RT7+aFi2JXuHlJpwVIhrin9w0djeV/2+scDSQDAoGANy/ph7TP8N5pBhuLC22W\nTpoQdmwxWAtA4hwhRWr7b81qNrDUXrjebYxNBMwwPHy1i9vAzv51I2uqKYIDgvpi\nCzjJP+xzN9AwA/hKx+qiSSXXc00k++ultaQ3+h3WBwxgUC+m2CnxxK0WUfcKnSfY\nNrCo7wqVuwOy4LHolRSystM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-rpw8c@bygreen-453c9.iam.gserviceaccount.com",
    "client_id": "114355446505904073758",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rpw8c%40bygreen-453c9.iam.gserviceaccount.com"
}

const admin = require("firebase-admin");
admin.initializeApp({credential: admin.credential.cert(bygreenServiceAccount)})
console.log(admin)



const bygreenConfig = {
    apiKey: "AIzaSyDqK1z4fd7lO9g2ISbf-NNROMd7xpxcahc",
    authDomain: "bygreen-453c9.firebaseapp.com",
    projectId: "bygreen-453c9",
    storageBucket: "bygreen-453c9.appspot.com",
    messagingSenderId: "19954598250",
    appId: "1:19954598250:web:ba57c792bdf65dbc18a513",
    measurementId: "G-265TN8HGKX"};

const bygreen = initializeApp(bygreenConfig, 'bygreen');
const bygreenDb = getFirestore(bygreen)
const bygreenAuth = getAuth(bygreen)
const bygreenStorage = getStorage(bygreen)

////////////////////publicline


signInWithEmailAndPassword(bygreenAuth ,process.env.EM, process.env.PW).then((cred)=>{
    // console.log('registered', cred)

onAuthStateChanged(bygreenAuth, async (user)=>{
    if(user){
        // console.log(user, user.uid)
        // user.getIdTokenResult().then(idTokenResult => {console.log('claims are .',idTokenResult.claims)})
    }})
})

///////////on db route change; 
///check if the upvote and downvote equal to 10; then if up; null, if down delete

onSnapshot(collection(bygreenDb, 'routes'), (data)=>{
    let docs = []
    data.docs.forEach(doc=>{
        docs.push({...doc.data(), id: doc.id})
    })
    // console.log(docs)


        ////
    docs.forEach(e=>{
        // not to allow multiple voting for the route; e.upvotes, e.downvotes
        e.upvotes.forEach(ee=>{
            if(e.downvotes.includes(ee)){
                // not good user; delete 
                let userNameIndex = e.downvotes.indexOf(e.downvotes.filter(ev=>ev==ee));
                e.downvotes.splice(userNameIndex, 1); 
            }
        })

        //////calculate the route 
        // console.log(e)
        if(e.downvotes.length+e.upvotes.length == 20){

            console.log('time to calc')
            if (e.downvotes.length > e.upvotes.length){
                // delete the route 
                deleteDoc(doc(bygreenDb, 'routes', e.id)).then(()=>console.log('deleted'))
            }
        }
    })

    console.log('fired')
})

app.use('/profile/:username',express.static('profile'))



/////////////bygreen


//// make server account; claim token; 

// signInWithEmailAndPassword(bygreenAuth ,process.env.EM, process.env.PW).then((cred)=>{
//     // console.log('registered', cred)

// onAuthStateChanged(bygreenAuth, async (user)=>{
//     if(user){
//         // console.log(user, user.uid)
//         // user.getIdTokenResult().then(idTokenResult => {console.log('claims are .',idTokenResult.claims)})
//     }})
// })

////onSnapshot; real time db (listener)
onSnapshot(collection(bygreenDb, 'users'), (data)=>{
    let docs = []
        data.docs.forEach(doc=>{
            docs.push({...doc.data(), id: doc.id})
        })
        console.log(docs)
        // make account on the rest projects db; by the same id; 
    })




//profile; 
app.use('/profile/:username',express.static('profile'))
app.post('/profile', async(req, res)=>{
    console.log(req.body)
})


// method 2; onload send url; 

app.use('/:team/next',express.static('public'))

app.post('/nextCamp', async (req, res)=>{
    // get into the yellow list of the team

    console.log(req.body.theteam)
    res.send({ok:'ok'})

    const q = query(collection(bygreenDb, 'users'), where('userName', '==', req.body.theteam))
    let theteam 
    await getDocs(q).then((data)=>{
        console.log("got the team")
        // let docs = []
            data.docs.forEach(doc=>{
                // theteam.push({...doc.data(), id: doc.id})
                console.log(doc.data())
                theteam = {...doc.data(), id:doc.id}
            })

    getDoc(doc(bygreenDb, 'red', theteam.yellow[0])).then(data=>{
        console.log(data.data())
        // res.render('nextCamp.ejs',{theCamp: data.data()})
        res.send(data.data().coords)
    })
    })
})





// admin

// make team by admin
app.post('/maketeam', (req,res)=>{
    console.log('to make team', req.body)

    // add claims 
    admin.auth().setCustomUserClaims(req.body.id, {team: true}).then(()=>{
        console.log("added claim")
        // change type prop
        updateDoc(doc(bygreenDb, 'users', req.body.id), {type: 'team'}).then(()=>{console.log('updated type')})
    })
})

app.listen(3000, ()=>{console.log('listening on 3000')})


