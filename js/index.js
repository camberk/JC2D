Chart.defaults.global.defaultFontSize = 30;
Chart.defaults.global.defaultFontFamily = 'Tienne';
Chart.defaults.global.defaultFontColor = '#1B2021';

//GLOBAL VARIABLES
var volumeSetting = 0.5;
var listOfExercises = JSON.parse(exercises);

// FOR EXERCISE ENTERING PAGE
const uniqName = 'camberk'
// used to pull data from local storage for dataTbl dictionary
function setData() {
    if (localStorage.length != 0) {
        dataTbl = {};
        dataTbl = JSON.parse(localStorage.getItem("dataTBL"));
    }
    else {
        dataTbl = {};
    }
}
function clearData() {
    localStorage.clear();
    dataTbl = {};
}

let dataTbl = {};
setData();
// end of storage code

const d = new Date();



$(document).ready(function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "index.html") {
        var xValues = ["You", "Frank", "Sam", "Ava", "Annie"];
        var yValues = [55, 49, 44, 24, 15];
        var barColors = ["red", "green", "blue", "orange", "brown"];
        var ctx = document.getElementById('leaderboardChart').getContext('2d');
        var leaderboardChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Today's Leaderboard",
                    fontSize: 50,
                }

            }
        });
    }
    if (page == "enterWorkouts.html") {
        

    }
});

function toHomepage() {
    location.replace("index.html");
}

function toEnterWorkoutsPage() {
    location.replace("enterWorkouts.html");
}

function toRewardsPage() {
    location.replace("rewards.html");
}

function toProfilePage() {
    location.replace("profile.html");
}

function toSettingsPage() {
    location.replace("settings.html");
}

function sortDate(a, b) {
    console.log(a);
    var dateA = Date.parse(a.date);
    var dateB = Date.parse(b.date);
    console.log(dateA + " " + dateB)
    console.log(dateA < dateB);
    return dateB - dateA;
}

function updateSlider(slideAmount) {
    volumeSetting = slideAmount / 100;
    $('#volumeDisplay').html('Volume: ' + slideAmount);
}

  var profileView = new Vue({
    el: "#profile",
    data: {
        //store data for current profile
        profileName: "John Smith",
        profileNumber: 23414,
        profileAge: 32,
        profileAchievements: [{
                achievementName: "From Athens to Marathon",
                achievementPictureUrl: "https://www.pinclipart.com/picdir/big/2-24050_11-marathon-clipart-png-transparent-png.png",
                achievementDescription: "Run a total 26.2 miles in a week"
            },
            {
                achievementName: "Varisty  Athlete",
                achievementPictureUrl: "https://pngimage.net/wp-content/uploads/2018/05/champ-png-6.png",
                achievementDescription: "Complete 30 days of workouts"
            },
            {
                achievementName: "Tear It Up!",
                achievementPictureUrl: "https://www.clipartmax.com/png/full/80-802036_skateboard-clipart-transparent-skateboarder-pdf.png",
                achievementDescription: "Skate, ski, or ride for the first time"
            },
            {
                achievementName: "Junior Varisty",
                achievementPictureUrl: "https://www.pinclipart.com/picdir/big/459-4590529_muscle-flex-outline-comments-flexing-arm-no-background.png",
                achievementDescription: "Complete a week of workouts"
            },
            {
                achievementName: "Blast Off",
                achievementPictureUrl: "https://i.imgur.com/XNmBnWU.png",
                achievementDescription: "Complete your first workout"
            }
        ],
        workoutBefore: true,
        workoutData: [{
                date: "01 Jan 1970",
                reps: 10,
                sets: 3,
                name: "Deadlift",
                points: 30
            },
            {
                date: "20 Nov 2021",
                reps: 20,
                sets: 4,
                name: "Ab Crunch",
                points: 40
            },
            {
                date: "25 Nov 2021",
                reps: 15,
                sets: 5,
                name: "Russian Twist",
                points: 15
            },
            {
                date: "21 Nov 2021",
                reps: 20,
                sets: 1,
                name: "Up Downs",
                points: 10
            },
            {
                date: "5 Nov 2021",
                reps: 5,
                sets: 5,
                name: "Bicep Curl",
                points: 20
            },
            {
                date: "Oct 5 2021",
                reps: 4,
                sets: 6,
                name: "Tricep Extension",
                points: 20
            },
            {
                date: "Oct 3 2021",
                reps: 1,
                sets: 10,
                name: "Butterfly Curl",
                points: 5
            }
        ],
        filteredWorkoutData: [],
        selectedFilter: " last week",
        profilePhotoUrl: "https://i.stack.imgur.com/l60Hf.png",
        profileHeaderPhoto: "https://i.imgur.com/OOSF8qV.png"
    },
    methods: {
        filterWeek: function() {
            var currentDate = new Date();
            this.filteredWorkoutData = [];
            for (i = 0; i < this.workoutData.length; i++) {
                console.log(this.workoutData[i]);
                var ms = Date.parse(this.workoutData[i].date);
                var converted = new Date(ms);
                //get ms time difference => 1000ms/s * 60s/min * 60min/hour * 24hour/day
                var diff = (currentDate - ms) / (1000 * 60 * 60 * 24);
                console.log(diff);
                if (diff <= 7) {
                    console.log("Adding data");
                    this.filteredWorkoutData.push(this.workoutData[i]);
                }
            }
            this.filteredWorkoutData.sort(sortDate);
            this.selectedFilter = " the last week";
        },
        filterMonth: function() {
            var currentDate = new Date();
            this.filteredWorkoutData = [];
            for (i = 0; i < this.workoutData.length; i++) {
                console.log(this.workoutData[i]);
                var ms = Date.parse(this.workoutData[i].date);
                var converted = new Date(ms);
                //get ms time difference => 1000ms/s * 60s/min * 60min/hour * 24hour/day
                var diff = (currentDate - ms) / (1000 * 60 * 60 * 24);
                console.log(diff);
                if (diff <= 30) {
                    console.log("Adding data");
                    this.filteredWorkoutData.push(this.workoutData[i]);
                }
            }
            this.filteredWorkoutData.sort(sortDate);
            this.selectedFilter = " the last month";
        },
        filterAll: function() {
            this.filteredWorkoutData = this.workoutData;
            this.filteredWorkoutData.sort(sortDate);
            this.selectedFilter = " all time";
        }
    },
    created: function() {
        var currentDate = new Date();
        this.filteredWorkoutData = [];
        for (i = 0; i < this.workoutData.length; i++) {
            console.log(this.workoutData[i]);
            var ms = Date.parse(this.workoutData[i].date);
            var converted = new Date(ms);
            //get ms time difference => 1000ms/s * 60s/min * 60min/hour * 24hour/day
            var diff = (currentDate - ms) / (1000 * 60 * 60 * 24);
            console.log(diff);
            if (diff <= 7) {
                console.log("Adding data");
                this.filteredWorkoutData.push(this.workoutData[i]);
            }
        }
        this.filteredWorkoutData.sort(sortDate);
        this.selectedFilter = " last week";
    },
    //created() {
    //on page loading, fetch profile name, profile photo
    /*axious.get('/user?ID=123').then(
        function(response){
            this.profileName = response.name;
            this.profilePhotoUrl = response.profilePhotoUrl;
        }
    ).catch(function(error){
        console.log(error);
    });*/
    //}, 

});

var enterExercise = new Vue({
    el: '#app',
    data: {
        exerciseSelected: 'Select An Exercise',
        listOfExercisesKeys: Object.keys(listOfExercises),
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
        selectExercise: function(exercise) {
            this.exerciseSelected = exercise;
        },
        enterData: function(event) {
            if (event.key == "Enter" && this.exerciseSelected != 'Select An Exercise') {
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
            var data = {
                'weight': this.weight,
                'reps': this.reps,
                'sets': this.sets,
                'date': Date(),
            }
            this.workoutType = this.exerciseSelected;
            if (!(dataTbl[uniqName])) {
                let temp = {};
                temp[this.workoutType] = [data]
                dataTbl[uniqName]= temp;
                
            }
            else {
                if (!(dataTbl[uniqName][this.workoutType])) {
                    dataTbl[uniqName][this.workoutType] = [data];
                }
                else {
                    dataTbl[uniqName][this.workoutType].push(data);
                }
            }
            let tempds = JSON.stringify(dataTbl);
            localStorage.setItem("dataTBL", tempds);
            let result = JSON.parse(localStorage.getItem("dataTBL"));
            console.log(result);
        },
    
}
});




Vue.component('reward-entry', {
    props: ['img', 'price', 'desc', 'flipped', 'index'],
    template: `<div class='rewardEntry' :class="{ 'flip' : flipped }">
        <div class='rewardFlip'>
          <div class='rewardFront' @click="flipped = true">
              <img class='rewardImg' src='img/placeholder.jpeg'>
              <div class='d-grid gap-2' style='align-self: stretch;'>
                <button type='button' class='btn btn-reward'>Test</button>
              </div>
          </div>
          <div class='rewardBack' @click="flipped = false">
              <div class='rewardDesc'>Raccoon prize</div>
              <div class='d-grid gap-2' style='align-self: stretch;'>
                <button type='button' class='btn btn-confirm' @click="">Test</button>
              </div>
          </div>
        </div>
    </div>`
});

let rewardView = new Vue({
    el: '#reward-app',
    data: {
        search: '',
        rewards: [false, false, false, false, false, false, false, false, false, false, false, false],
    },
    methods: {
        onSubmit: function(e) {
            if (e.keycode == "Enter") {

            }
        },

        onRewardClick: function(e) {

        },

        onRewardConfirm: function(e) {

        },
    }
})