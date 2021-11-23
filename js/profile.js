//use history for loading previous UID, etc. 
//https://developer.mozilla.org/en-US/docs/Web/API/History/

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