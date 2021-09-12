const { pipelinePrimaryTopicReference, existsTypeAnnotation, assertNewExpression } = require("@babel/types")

const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
    {id: 3, name: 'Maroko', songs: [4]},
  ],
  playSong(song) {
    let duration=convertDuriation(song)
   return "Playing "+song.title+" from "+song.album+" by "+song.artist+" | "+duration+"."
  },
}
//---------------------helpful functions start--------------------------
function convertDuriation(song){
  let seconds=song.duration
  let minutes=Math.floor(seconds/60)
   if(seconds-(minutes*60)<10) return "0"+minutes+":"+"0"+(seconds-(minutes*60))
   else  return "0"+minutes+":"+(seconds-(minutes*60))
 }
 function reverseConvertDuration(duration){
  let format=duration.split(":");
  let minutes=parseInt(format.slice(0,1));
  let seconds=parseInt(format.slice(1));
  duration=(minutes*60)+seconds;
  return duration;
 }
 //checks if the selected ID exists in the array and return its place in the array
 function exist(id,array){
for (let i=0; i<array.length;i++){
   if(array[i].id==id) return i;
}
return -1
 }

 function randomID(array){
   let newId=array[0].id
   console.log(newId)
   for(let i=0;i<array.length;i++){
    console.log(exist(newId,array))
     if(exist(newId,array)!==-1){
       newId++
       console.log(newId)
     }
   }
   return newId
 }
 function songFromArray(id){
   return player.songs[exist(id,player.songs)].duration
   }
//---------------------helpful functions ends--------------------------

function playSong(id) {
    if(exist(id,player.songs)!==-1){
       console.log(player.playSong(player.songs[exist(id,player.songs)]))
      }
      else throw "ID not exist"
}
  


function removeSong(id) {
if(exist(id,player.songs)!==-1){
  for(let i=0;i<player.playlists.length;i++){
    for(let j=0;j<player.playlists[i].songs.length;j++){
      if(player.playlists[i].songs[j]==id){
        player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id),1)
      } 
    }
  }
   player.songs.splice(exist(id,player.songs),1)
     
  }
  else throw "no song match the ID"
}


function addSong(title, album, artist, duration, id) {
  if(id==undefined){
    id=randomID(player.songs)
  }
   if((exist(id,player.songs))===-1){
    let format=duration.split(":")
    let minutes=parseInt(format.slice(0,1))
    let seconds=parseInt(format.slice(1))
    duration=(minutes*60)+seconds
    let song={
      "id":id,
      "title":title,
      "album":album,
      "artist":artist,
      "duration": duration
    }
    player.songs.push(song) 
    return player.songs[player.songs.length-1].id
  }
    else throw "ID is already taken"
  }

  
function removePlaylist(id) {
  if(exist(id,player.playlists)!==-1){
  for(let i=0;i<player.playlists.length;i++){
       if(player.playlists[i].id===id){
         player.playlists.splice(exist(id,player.playlists),1);
  }
}
}
else throw "playlist ID dosen't exist";
}


function createPlaylist(name, id) {
  if(id==undefined) {
    id=randomID(player.playlists)
  }
    if(exist(id,player.playlists)===-1){
     let playlist={
       "id":id,
       "name":name,
       "songs":[]
     }
     player.playlists.push(playlist);
     return player.playlists[player.playlists.length-1].id;
  }
  else throw "ID of playlist exists";
}

function playPlaylist(id) {
  if(exist(id,player.playlists)!==-1){
    let songArr=exist(id,player.playlists)
    for(let i=0;i<player.playlists[songArr].songs.length;i++){
    playSong(player.playlists[songArr].songs[i])
     }
  }else throw "ID dosent exist"
}

function editPlaylist(playlistId, songId) {
  if(exist(playlistId,player.playlists)!==-1){
    if(exist(songId,player.songs)!==-1){
      console.log(exist(songId,player.songs))
      let playlistPlaceInArry=(exist(playlistId,player.playlists))
      console.log(player.playlists[playlistPlaceInArry].songs)
      let flag=false;
      let songsArr=player.playlists[playlistPlaceInArry].songs
      
      for(let i=0;i<songsArr.length;i++){
        console.log(songsArr[i])
          if(songsArr[i]===songId){
            flag=true;
               player.playlists[playlistPlaceInArry].songs.splice(i,1);
          }
      }
      if (flag===false)player.playlists[playlistPlaceInArry].songs.push(player.songs[exist(songId,player.songs)].id)  
      else {
       if(player.playlists[playlistPlaceInArry].songs.length===0)removePlaylist(player.playlists[playlistPlaceInArry].id)
      }
    }
    else throw "song ID not exist";
  }
  else throw "playlist ID not exist"
}
 

function playlistDuration(id) {
 if(exist(id,player.playlists)!==-1){
   let placeInArry=exist(id,player.playlists)
   let sumDuration=0;
   for(let i=0;i<player.playlists[placeInArry].songs.length;i++){
     sumDuration+=songFromArray(player.playlists[placeInArry].songs[i])
   }
   return sumDuration;
 }
 else throw "playlist ID not exist";
}


function searchByQuery(query) {
  //a variable for ignoring the case sensitive
  const queryRegex=RegExp(`${query}`,'i')
  console.log(queryRegex)
let results={
  "songs":[],
  "playlists":[]
};
for(i=0;i,i<player.songs.length;i++){
  for(let key in player.songs[i]){
    if(queryRegex.test(player.songs[i][key])){
      results.songs.push(player.songs[i]);
      break;
    }
  }
}
for(i=0;i<player.playlists.length;i++){
  for(let key in player.playlists[i]){
    if(queryRegex.test(player.playlists[i][key])){
      results.playlists.push(player.playlists[i]);
      break;
    }
  }
}
//function to arrange the objects in the results.song at alphabetic order
results.songs.sort(function(a,b){
  let x= a.title.toLowerCase();
  let y= b.title.toLowerCase();
  if(x<y)return -1;
  if(x>y)return 1;
  return 0;
});
return results;
}
function searchByDuration(duration) {
  let seconds=reverseConvertDuration(duration);
let closestSong,closestPlaylist;
closestSong=player.songs[0];
let closestSongDuration=player.songs[0].duration;

for(let i=0;i<player.songs.length;i++){
if(Math.abs(closestSongDuration-seconds)>Math.abs(player.songs[i].duration-seconds)){
closestSong=player.songs[i];
closestSongDuration=closestSong.duration;
}
}
closestPlaylist=player.playlists[0];
let closestPlaylistDuration=playlistDuration(player.playlists[0].id);
for(let i=0;i<player.playlists.length;i++){
 if(Math.abs(closestPlaylistDuration-seconds)<Math.abs((playlistDuration(player.playlists[i].id))-seconds)){
    closestPlaylist=player.playlists[i];
    closestPlaylistDuration=playlistDuration(player.playlists[i].id);
 }
}
if((Math.abs(closestSongDuration-seconds))<Math.abs((closestPlaylistDuration-seconds)))return closestSong;
return closestPlaylist;
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
