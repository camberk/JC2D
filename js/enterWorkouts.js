var enterView = new Vue({
    el: '#app',
    data: {
        workoutType: '',
        weight: '',
        reps: '',
        sets: '',
        date: '',
        wt: false,
        w: false,
        r: false,
        s: false,
        d: false,
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
            if (event.key == "Enter" && event.currentTarget.id == "date") {
                this.d = true;
            }
            console.log(x);
        }
    }
})