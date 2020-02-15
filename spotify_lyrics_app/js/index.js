


window.onload = function(){ 
(function() {
    function login(callback) {
        var CLIENT_ID = '55f49c7de80a43e982ab768a3d2a4fee';
        var REDIRECT_URI = 'https://panoskall.com/webapp';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
       
        var url = getLoginURL([
            'user-read-email, streaming, user-read-private, user-read-currently-playing, user-read-playback-state, user-modify-playback-state, user-read-recently-played'
        ]);
        
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
    
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            console.log(hash.type);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);
        
        var w = window.location.replace(url,
                            'Spotify',
                            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                           );
        
    }

 var loginButton = document.getElementById('login');
       loginButton.addEventListener('click', function() {
       
      login()
});
// document.getElementById('login').onclick = 


})();
};








