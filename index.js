const { pipelinePrimaryTopicReference } = require("@babel/types")

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
  ],
  playSong(song) {
    let duration=convertDuriation(song)
   return "Playing "+song.title+" from "+song.album+" by "+song.artist+" | "+duration+"."
  },
}

function convertDuriation(song){
  let seconds=song.duration
  let minutes=Math.floor(seconds/60)
   if(seconds-(minutes*60)<10) return "0"+minutes+":"+"0"+(seconds-(minutes*60))
   else  return "0"+minutes+":"+(seconds-(minutes*60))
 }
 //checks if the selected title exists in the songs array and return its place in the array
 function exist(id){
for (let i=0; i<player.songs.length;i++){
  console.log(player.songs[i].id==id)
   if(player.songs[i].id==id) return i;
}
return -1
 }
function playSong(id) {
    if(exist(id)!==-1)
        console.log(player.playSong(player.songs[exist(id)]))
    else  throw "ID not exist"
}
  
playSong(7)

function removeSong(id) {
    console.log(exist(id))
if(exist(id)!==-1){
  for(let i=0;i<player.playlists.length;i++){
    for(let j=0;j<player.playlists[i].songs.length;j++){
      if(player.playlists[i].songs[j]==id){
        player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id),1)
      } 
    }
  }
   player.songs.splice(exist(id),1)
     
  }
  else throw "no song match the ID"
}


function addSong(title, album, artist, duration, id) {
  if(id==undefined){
    id=Math.floor(Math.random()*player.songs.length)+1
    while((exist(id))!==-1)
    id=Math.floor(Math.random()*player.songs.length)+1
  }
   if((exist(id))===-1){
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
  console.log(addSong("bring","bla","kiss","04:27",9))
function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

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
