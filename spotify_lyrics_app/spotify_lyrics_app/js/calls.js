window.onload = function(){ 
(function() {

  var hash = {};
  window.location.hash.replace(/^#\/?/, '').split('&').forEach(function(kv) {
    var spl = kv.indexOf('=');
    if (spl != -1) {
      hash[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl+1));
    }
  });
  console.log('initial hash', hash);
  if (hash.access_token) {
    // window.opener.postMessage(JSON.stringify({
    //   type:'access_token',
    //   access_token: hash.access_token,
    //   expires_in: hash.expires_in || 0
    // }), 'https://panoskall.com');
//   window.close();
   }

var accessToken = hash.access_token;

 


 var Musixkey ='3a88a964fed3d38be8813c99682752cd';
    function trackinfo(){
   var Musixkey ='3a88a964fed3d38be8813c99682752cd',
    q_track= document.getElementById('songname').innerHTML,
    q_artist= document.getElementById('artist').innerHTML,
    loadercont = document.getElementById('loadercont'),
    lyrics  = document.getElementById('lyrics');
    setTimeout(function(){
        loadercont.style.display = 'flex';
         lyrics.style.display = 'none';
     $(".loadercont").fadeIn();
 	
 	$(".btncontaner").hide();
      setTimeout(function(){
				$(".loadercont").fadeOut(300);
			
			
			},5000);
    });
    $.ajax({
    type: "GET",
    data: {
        apikey: Musixkey,
        q_track: q_track,
        q_artist: q_artist,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        var trackid = data.message.body.track_list[0];
        console.log(data);
        document.getElementById('track_id').innerHTML = trackid.track.track_id;
        getLyrics();
    },
     complete: function(data){
    
		$(".loadercont").fadeOut(300);
        $(".btncontaner").hide();
   },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
}
var lyrics = document.getElementById('lyrics');
 function getLyrics(){
  var track_id = document.getElementById('track_id').innerHTML;
    $.ajax({
    type: "GET",
    data: {
        apikey: Musixkey,
        track_id : track_id,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log('lysrics',data);
        lyrics.style.display = "block";
        if (data.message.header.status_code === 404){
             document.getElementById('lyrics').innerHTML = 'Δεν υπάρχουν διαθέσιμοι στίχοι για αυτό το τραγούδι';
        }
        var iflyrics = data.message.body.lyrics.lyrics_body;
        if  ((iflyrics === "") ||
    (iflyrics === null) || (iflyrics === undefined)){
            
            document.getElementById('lyrics').innerHTML = 'Δεν υπάρχουν διαθέσιμοι στίχοι για αυτό το τραγούδι';
        }else{
              document.getElementById('lyrics').innerHTML = data.message.body.lyrics.lyrics_body;
        }
       
   
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 }
   


 function getUserData(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            },
            success: function(data){
                var profilephoto = data.images[0];
                console.log(data);
                 console.log(accessToken);
                 var profile = document.getElementById("profile"),
                    ispremium = data.product,
                 overlay2 = document.getElementById("ispremium");
                 playing = document.getElementById("playing");
                 profile.style.display= 'flex';
                playing.style.display= 'block';
                if  (data.images[0] === null || data.images[0] === undefined ){
                    document.getElementById('photo').src = '/images/profile.png';
                } else{
                      document.getElementById('photo').src = profilephoto.url;
                }
                    document.getElementById('name').innerHTML = data.display_name;
                    document.getElementById('email').innerHTML = data.email;
                 if (ispremium != "premium"){
                     overlay2.style.display= 'inline-flex';
                 } else{
                     overlay2.style.display= 'none';
                 }
            },
            error: function(data) {
        function session_exprired() {
        if (window.confirm('Please log-in'))
        {
            window.location.replace("https://panoskall.com");
        }else{
        alert("Πρέπει να κάνετε επανασύνδεση για χρησιμοποιήσετε την εφαρμογή");
        }
            }
            session_exprired();
    }
        });
    }
    

   
    
function getNowPlaying(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            } ,
            success: function(data){
                console.log('now playin data', data);
                if(data === undefined ){
                   document.getElementById('sngphoto').src = '/images/default-album-art.png' ;
                }else{
                     var albumphoto = document.getElementById('sngphoto'),
                    noplaying = document.getElementById('noplaying'),
                    albumimg = data.item.album.images[0],
                    artistname = data.item.artists[0];
                     document.getElementById('sngphoto').src = data.item.album.images[0].url;
                document.getElementById('songname').innerHTML = data.item.name;
                document.getElementById('album').innerHTML = data.item.album.name;
                document.getElementById('artist').innerHTML = artistname.name;
                  albumphoto.style.display = 'initial';   
                }
            }
        });
    }
    function getPlayer(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me/player',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            } ,
            success: function(data){
                console.log('player', data);
            document.getElementById('topinfo').innerHTML = data.device.name;
            }
        });
    }
    
    

   function PauseSong(accessToken) {
        return $.ajax({
            type: 'PUT' ,
            url: 'https://api.spotify.com/v1/me/player/pause',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            },
            success: function(data){
                console.log('pause', data);
            }
            
        });
    }
    
    function PlaySong(accessToken) {
        return $.ajax({
            type: 'PUT',
            url: 'https://api.spotify.com/v1/me/player/play',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            }
            
        });
    }
    function nextSong(accessToken) {
        return $.ajax({
            type: 'POST',
            url: 'https://api.spotify.com/v1/me/player/next',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            },
            success: function (data){
                 $(".btncontaner").show();
                lyrics.style.display = 'none';
            }
            
        });
    }
    
     
    function previousSong(accessToken) {
        return $.ajax({
            type: 'POST',
            url: 'https://api.spotify.com/v1/me/player/previous',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            },
            success: function(data){
               $(".btncontaner").show();
                lyrics.style.display = 'none'; 
 
            }
        });
    }
    function session_exprired() {
        if (window.confirm('Tο χρονικο οριο της συνδεσης εληξε'))
        {
            window.location.replace("https://panoskall.com");
        }else{
        alert("Πρέπει να κάνετε επανασύνδεση για χρησιμοποιήσετε την εφαρμογή");
        }
            }
    function playingrefresh(){
        
         getNowPlaying(accessToken);
         getPlayer(accessToken);
        }
        
        
        
    var oldsong = document.getElementById('songname').innerHTML; 
 console.log('old song',oldsong);
function checkIfSongChanged(){
var songChange = 1;   
 console.log('previus song', songChange);
    if(songChange =! oldsong){
        console.log('song changed');
        // alert("song changed")
    var  oldsong = 1;
    }
    
    
    
}





document.getElementById('showlyrics').onclick = trackinfo;
document.getElementById('getlyrics').onclick = trackinfo;






// document.getElementById('getlyrics').onclick = trackinfo;

 var pauseButton = document.getElementById('toggle'),
  playButton = document.getElementById('play'),
  previous_song = document.getElementById('previous_song'),
  next_song = document.getElementById('next_song');
      previous_song.addEventListener('click', function() {
      previousSong(accessToken);
   
});

  next_song.addEventListener('click', function() {
     nextSong(accessToken)

});

  $(document).ready(function() {
        $('#toggle').bind("click", function() {
          if ($(this).attr("class") == "pause"){
              PauseSong(accessToken)
             $(this).attr("class", "play");
              $('#sngphoto').css("opacity", "0.5");
             $('.overlay').css("opacity", "1");
          }
          else{
              PlaySong(accessToken)
             $(this).attr("class", "pause");
            
             $('#sngphoto').css("opacity", "1");
              $('.overlay').css("opacity", "0");
          }
        });
      });

setInterval( session_exprired, 3600000);
setInterval( playingrefresh, 2500);
setInterval( checkIfSongChanged, 2500);
getUserData(accessToken)
getNowPlaying(accessToken)
getPlayer(accessToken);






})();






}




