Chart.defaults.global.defaultFontSize = 30;
Chart.defaults.global.defaultFontFamily = 'Tienne';
Chart.defaults.global.defaultFontColor = '#1B2021';

$(document).ready(function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "index.html") {
        var xValues =  ["You", "Frank", "Sam", "Ava", "Annie"];
        var yValues = [55, 49, 44, 24, 15];
        var barColors = ["red", "green","blue","orange","brown"];
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
                legend: {display: false},
                title: {
                    display: true,
                    text: "Today's Leaderboard",
                    fontSize: 50,
                }
                
            }
      });
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



var profileView = new Vue({
    el: "#profile",
    data: {
        //store data for current profile
        profileName: "John Smith",
        profileNumber: 23414,
        profileAge: 32,
        profileAchievements: [
            {
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
            }],
        profilePhotoUrl: "https://i.stack.imgur.com/l60Hf.png",
        profileHeaderPhoto: "https://i.imgur.com/OOSF8qV.png"
    }
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

Vue.component('reward-entry', {
    props: ['img', 'price', 'desc', 'flipped', 'index'],
    methods: {
        onRewardConfirm: function(e) {
            console.log("Clicked");
            e.stopPropagation();
        }
    },
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
                <button type='button' class='btn btn-confirm' @click="onRewardConfirm">Test</button>
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
