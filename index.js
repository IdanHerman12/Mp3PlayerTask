const { pipelinePrimaryTopicReference, existsTypeAnnotation } = require("@babel/types")

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
 //checks if the selected ID exists in the array and return its place in the array
 function exist(id,array){
for (let i=0; i<array.length;i++){
   if(array[i].id==id) return i;
}
return -1
 }
 function randomID(array){
   let id=Math.floor(Math.random()*array.length)+2;
   return id
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
    id=Math.floor(Math.random()*player.songs.length)+1
    while((exist(id,player.songs))!==-1)
    id=Math.floor(Math.random()*player.songs.length)+1
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
    while((exist(id,player.playlists))!==-1){
       id=randomID(player.playlists)
      }
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

//if a song exists in the playlist remove it,if it was the only song delete the playlist,if it dosent exist add it to the end of the playlist
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
 editPlaylist(3,4)
 console.log(player.playlists)


function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
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
