var enterView = new Vue({
    el: '#app',
    data: {
        enteredText: '',
    },
    methods: {
        keyPressed: function(event) {
            if (event.key == "Enter") {
                console.log("enter pressed");
            }
        }
    }
})