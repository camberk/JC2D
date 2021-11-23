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