Chart.defaults.global.defaultFontSize = 30;
Chart.defaults.global.defaultFontFamily = 'Tienne';
Chart.defaults.global.defaultFontColor = '#1B2021';
Chart.defaults.scale.ticks.beginAtZero = true;
//GLOBAL VARIABLES
var volumeSettingGlobal = 0.5;
var listOfExercises = JSON.parse(exercises);

// FOR EXERCISE ENTERING PAGE
const uniqName = 'camberk'
// used to pull data from local storage for dataTbl dictionary
function setData() {
    if (localStorage.getItem("dataTBL")) {
        dataTbl = {};
        dataTbl = JSON.parse(localStorage.getItem("dataTBL"));
    }
    else {
        dataTbl = {};
    }
    if (!localStorage.getItem('volumeLevel')) {
        localStorage.setItem('volumeLevel', 0.5);
    } 
    // localStorage.setItem('volumeLevel', 0.5);
    volumeSettingGlobal = localStorage.getItem('volumeLevel');
    var slideAmount = volumeSettingGlobal * 100;
    $('#volumeDisplay').html('Volume: ' + slideAmount);
    $('#myVolumeRange').attr("value", slideAmount);
    
    
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
        drawLeaderBoardChart();
    }
    if (page == "enterWorkouts.html") {
        drawProgressChart();
    }
});

function drawLeaderBoardChart() {
    var xValues = ["You", "Frank", "Sam", "Ava", "Annie"];
    var yourPoints = 0;
    if (localStorage.getItem("dataTBL")) {
        let result = JSON.parse(localStorage.getItem("dataTBL"));
        for (var key in result[uniqName]) {
            result[uniqName][key].forEach(element => {
                if (isDateEqualToCurrentDate(element["date"])) {
                    yourPoints += parseInt(element["points"]);
                }
            });
        }
    }
    setOthersPoints();
    var othersPoints = JSON.parse(localStorage.getItem('othersPoints'));
    var yValues = [yourPoints, parseInt(othersPoints['Frank']), parseInt(othersPoints['Sam']), 
    parseInt(othersPoints['Ava']), parseInt(othersPoints['Annie'])];
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

function drawProgressChart() {
    Chart.defaults.global.defaultFontSize = 15;
    var currentDate = new Date();
    var currentWeekDates = [];
    for (var i = 6; i >= 0; --i) {
        var tempDate = new Date();
        tempDate.setDate(currentDate.getDate() - i);
        currentWeekDates.push(tempDate);
    }
    var cleanDates = 
    [(currentWeekDates[0].getMonth() + 1) + '/' + currentWeekDates[0].getDate(),
    (currentWeekDates[1].getMonth() + 1) + '/' + currentWeekDates[1].getDate(),
    (currentWeekDates[2].getMonth() + 1) + '/' + currentWeekDates[2].getDate(),
    (currentWeekDates[3].getMonth() + 1) + '/' + currentWeekDates[3].getDate(),
    (currentWeekDates[4].getMonth() + 1) + '/' + currentWeekDates[4].getDate(),
    (currentWeekDates[5].getMonth() + 1) + '/' + currentWeekDates[5].getDate(),
    (currentWeekDates[6].getMonth() + 1) + '/' + currentWeekDates[6].getDate()];
    var yValues = [0, 0, 0, 0, 0, 0, 0];
    var counter = 0;
    if (localStorage.getItem("dataTBL")) {
        let result = JSON.parse(localStorage.getItem("dataTBL"));
        currentWeekDates.forEach(date => {
            for (var key in result[uniqName]) {
                result[uniqName][key].forEach(element => {
                    if (areDatesEqual(date, element["date"])) {
                        yValues[counter] = yValues[counter] + parseInt(element["points"]);
                    }
                });
            }
            counter++;
        });
    }
    var ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: "line",
        data: {
            labels: cleanDates,
            datasets: [{
            backgroundColor: "#F21B3F",
            borderColor: "rgba(0,0,0,0.1)",
            data: yValues
            }]
        },
        options:{
            legend: { display: false },
            title: {
                display: true,
                text: "This Week's Progress",
                fontSize: 20,
            }
            
        }
    });
}

function setOthersPoints() {
    var currentDate = new Date();
    console.log(Math.random(0, 10000));
    if (localStorage.getItem('othersPoints')) {
        var oldOthersPoints = JSON.parse(localStorage.getItem('othersPoints'));
        if (!isDateEqualToCurrentDate(oldOthersPoints['date'])) {
            var tempNewOthersPoints = {
                'Frank': Math.floor(Math.random() * 10000),
                'Sam': Math.floor(Math.random() * 2000),
                'Ava': Math.floor(Math.random() * 5000),
                'Annie': Math.floor(Math.random() * 15000),
                'date': currentDate,
            }
            var newOthersPoints = JSON.stringify(tempNewOthersPoints);
            localStorage.setItem('othersPoints', newOthersPoints);
        }
    } else {
        var tempNewOthersPoints = {
            'Frank': Math.floor(Math.random() * 10000),
            'Sam': Math.floor(Math.random() * 2000),
            'Ava': Math.floor(Math.random() * 5000),
            'Annie': Math.floor(Math.random() * 15000),
            'date': currentDate,
        }
        var newOthersPoints = JSON.stringify(tempNewOthersPoints);
        localStorage.setItem('othersPoints', newOthersPoints);
    }
}

function isDateEqualToCurrentDate(dateIn) {
    var currentDate = new Date();
    return areDatesEqual(currentDate, dateIn);
}

function areDatesEqual(date1In, date2In) {
    var date1 = new Date(date1In);
    var date2 = new Date(date2In);
    var date1Day = date1.getDay();
    var date1Month = date1.getMonth();
    var date1Year = date1.getFullYear();
    if (date1Day != date2.getDay()) {
        return false;
    }
    if (date1Month != date2.getMonth()) {
        return false;
    }
    if (date1Year != date2.getFullYear()) {
        return false;
    }
    return true;
}

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
    el: '#exercise-app',
    data: {
        exerciseSelected: 'Select An Exercise',
        listOfExercisesKeys: Object.keys(listOfExercises),
        workoutType: '',
        weight: '',
        reps: '',
        sets: '',
        minutes: '',
        points: '',
        date: d.toDateString(),
        wt: false,
        w: false,
        r: false,
        s: false,
        m: false,
        p: false,
        testdb: '',
        arePointsPerMinute: false,
        weightAdded: false,

    },
    methods: {
        selectExercise: function(exercise) {
            this.exerciseSelected = exercise;
            this.arePointsPerMinute = listOfExercises[this.exerciseSelected]["arePointsPerMinute"];
            this.weightAdded = listOfExercises[this.exerciseSelected]["weightAdded"];
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
            if (event.key == "Enter" && event.currentTarget.id == "numberminutes") {
                this.m = true;
            }
            if (event.key == "Enter") {
                this.p = true;
            }
        },
        writeUserData: function() {
            if (this.weight == '') {
                this.weight = 0;
            }
            var data;
            if (listOfExercises[this.exerciseSelected]["arePointsPerMinute"]) {
                this.points = this.minutes * this.sets * listOfExercises[this.exerciseSelected]["points"];
                data = {
                    'sets': this.sets,
                    'minutes': this.minutes,
                    'points': this.points,
                    'date': Date(),
                }
            } else {
                this.points = (this.sets * this.reps * listOfExercises[this.exerciseSelected]["points"]) + 
                ((this.weight + 1) * (listOfExercises[this.exerciseSelected]["points"] / 10));
                data = {
                    'weight': this.weight,
                    'reps': this.reps,
                    'sets': this.sets,
                    'points': this.points,
                    'date': Date(),
                }
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

            // window.location.reload();
            drawProgressChart();
        },
    
}
});




Vue.component('reward-entry', {
    props: ['img', 'price', 'title', 'desc', 'flipped', 'index', 'disabled'],
    methods: {
        onRewardConfirm: function(e) {
            this.$emit('unlock-event', this.index);
            e.stopPropagation();
        }
    },
    template: `<div class='rewardEntry' :class="{ 'flip' : flipped }">
        <div class='rewardFlip'>
          <div class='rewardFront' @click="flipped = true">
              <img class='rewardImg' :src='img'>
              <div class='d-grid gap-2' style='align-self: stretch;'>
                <button type='button' class='btn btn-reward'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
                    <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057 9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z"/>
                    </svg>
                    <span>{{ price }}</span>
                </button>
              </div>
          </div>
          <div class='rewardBack' @click="flipped = false">
              <div class='rewardTitle'>{{ title }}</div>
              <div class='rewardDesc'>{{ desc }}</div>
              <div class='d-grid gap-2' style='align-self: stretch;'>
                <button v-if='disabled' type='button' class='btn btn-confirm' disabled>Not Enough Points</button>
                <button v-else type='button' class='btn btn-confirm' @click="onRewardConfirm">Redeem?</button>
              </div>
          </div>
        </div>
    </div>`
});

Vue.component('unlocked-entry', {
    props: ['img', 'title', 'desc', 'flipped', 'index', 'code'],
    template: `<div class='rewardEntry' :class="{ 'flip' : flipped }">
        <div class='rewardFlip'>
          <div class='rewardFront' @click="flipped = true">
              <img class='rewardImg' :src='img'>
              <div class='d-grid gap-2' style='align-self: stretch;'>
                <button type='button' class='btn btn-reward'>View Code</button>
              </div>
          </div>
          <div class='rewardBack' @click="flipped = false">
              <div class='rewardTitle'>{{ title }}</div>
              <div class='rewardDesc'>{{ desc }}</div>
              <div class='d-grid gap-2' style='align-self: stretch;'>
                <button type='button' class='btn btn-confirm' disabled>{{ code }}</button>
              </div>
          </div>
        </div>
    </div>`
})

let namePred = (a, b) => {
    if (a["title"] < b["title"]) {
        return -1;
    }
    if (a["title"] > b["title"]) {
        return 1;
    }
    return 0;
}

let pricePred = (a, b) => {
    return a["price"] - b["price"];
}

let rewardView = new Vue({
    el: '#reward-app',
    data: {
        search: '',
        pointCount: 200,
        sorting: 0,
        rewards: [],
        displayRewards: [],
        unlockedRewards: []
    },
    created: function() {
        fetch("./rewards.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            this.rewards = jsondata;
            this.displayRewards = jsondata;
        });
    },
    methods: {
        onRewardConfirm: function(e) {
            this.pointCount -= this.rewards[e]['price'];
            let unlocked = this.rewards.splice(e, 1);
            this.unlockedRewards.push(unlocked[0]);
            this.updateRewardsSorting(this.sorting);
        },

        updateRewardsSorting: function(e) {
            this.sorting = e;
            this.displayRewards = new Array();
            this.rewards.forEach(reward => {
                this.displayRewards.push(reward);
            });
            if (e === 1) {
                this.displayRewards.sort(namePred);
            } else if (e === 2) {
                this.displayRewards.sort(pricePred);
            } else if (e === 3) {
                this.displayRewards.sort(pricePred);
                this.displayRewards.reverse();
            }
        }
    }
});

function updateSlider(slideAmount) {
    volumeSettingGlobal = slideAmount / 100;
    localStorage.setItem('volumeLevel', volumeSettingGlobal);
    $('#volumeDisplay').html('Volume: ' + slideAmount);
}
