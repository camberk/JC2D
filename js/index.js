Chart.defaults.global.defaultFontSize = 30;
Chart.defaults.global.defaultFontFamily = 'Tienne';

$(document).ready(function () {
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
    
});

// var mainView = new Vue({
//     el: '#app',
//     data: {
//         leaderboardChart: new Chart(this.ctx, {
//             type: "bar",
//             data: {
//                 labels: this.xValues,
//                 datasets: [{
//                 backgroundColor: this.barColors,
//                 data: this.yValues
//             }]
//             },
//             options: {
//                 legend: {display: false},
//                 title: {
//                     display: true,
//                     text: "Today's Leaderboard"
//                 }
//             }
//         }),
//         xValues: ["You", "Frank", "Sam", "Ava", "Annie"],
//         yValues: [55, 49, 44, 24, 15],
//         barColors: ["red", "green","blue","orange","brown"],
//         ctx:  this.$refs.leaderboardChart.getContext('2d'),
//     },
//     methods: {

        
//     }
// })
