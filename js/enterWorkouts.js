const uniqName = 'camberk'
const d = new Date();

let dataTbl = {};

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
            var data = {
                'weight': this.weight,
                'reps': this.reps,
                'sets': this.sets,
                'date': Date(),
            }
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
            console.log(dataTbl);
        },
        
    }
})