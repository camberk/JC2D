// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_yI7DO1tu4-HAsNfPC-NC5yrv5bU5DcE",
  authDomain: "jc2d-c4ce4.firebaseapp.com",
  databaseURL: "https://jc2d-c4ce4-default-rtdb.firebaseio.com",
  projectId: "jc2d-c4ce4",
  storageBucket: "jc2d-c4ce4.appspot.com",
  messagingSenderId: "969572763824",
  appId: "1:969572763824:web:d67c3541186d49e263d375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const uniqName = 'camberk'
const d = new Date();

var enterView = new Vue({
    el: '#app',
    data: {
        workoutType: '',
        weight: '',
        reps: '',
        sets: '',
        date: d.toDateString(),
        wt: false,
        w: false,
        r: false,
        s: false,
        testdb: '',
    },
    methods: {
        enterData: function(event) {
            if (event.key == "Enter" && event.currentTarget.id == "workouttype") {
                this.wt = true;
            }
            if (event.key == "Enter" && event.currentTarget.id == "weight") {
                this.w = true;
            }
            if (event.key == "Enter" && event.currentTarget.id == "numberreps") {
                this.r = true;
            }
            if (event.key == "Enter" && event.currentTarget.id == "numbersets") {
                this.s = true;
            }
        },
        writeUserData: function() {
            const db = getDatabase();
            var data = {
                'weight': this.weight,
                'reps': this.reps,
                'sets': this.sets,
                'date': Date(),
            }
            let userRef = ref(db, [uniqName] + "_" + this.workoutType);
            push(userRef, [data]);              

        },
        
    }
})