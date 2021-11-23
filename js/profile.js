//use history for loading previous UID, etc. 
//https://developer.mozilla.org/en-US/docs/Web/API/History/

var profileView = new Vue({
    el: "#profile",
    data: {
        //store data for current profile
        profile: {
            profileName: "John Smith",
            profileNumber: 123,
            profileAge: 32,
            profileAchievements: [
                {
                    achievementName: "Test Achievement 1",
                    achievementPictureUrl: "https://i.imgur.com/wDC5ejT.jpg"
                },
                {
                    achievementName: "Test Achievement 2",
                    achievementPictureUrl: "https://i.imgur.com/EU5bT1k.jpg"
                }],
            profilePhotoUrl: "https://i.stack.imgur.com/l60Hf.png"
        }

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