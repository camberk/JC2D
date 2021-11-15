var mainView = new Vue({
    el: '#app',
    data: {
        test: "Hello World",
    },
    methods: {
        onPressed: function() {
            if (this.test == "Hello World") {
                this.test = "Pressed";
            }
            else {
                this.test = "Hello World";
            }
        }
    }
})