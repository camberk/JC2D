Vue.component('reward-entry', {

});

let rewardView = new Vue({
  el: '#reward-app',
  data: {
    search: '',
    rewards: [],
  },
  methods: {
    onSubmit: function(e) {
      if (e.keycode == "Enter") {

      }
    }
  }
})