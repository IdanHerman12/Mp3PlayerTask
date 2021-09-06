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
  // delete player.playlists.
  for(let i=0;i<player.playlists.length;i++){
    for(let j=0;j<player.playlists[i].songs.length;j++){
      if(player.playlists[i].songs[j]==id){
        player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id),1)
        // delete player.playlists[i].songs[j]
      } 
    }
  }
  for (let i=0; i<player.songs.length;i++){
    if(player.songs[i]["id"]==id){  player.songs.splice(exist(id),1)
    }
     
  }
}
else throw "no song match the ID"
}
 console.log(player.playlists[0].songs)
   removeSong(7)
 console.log(player.playlists[0].songs)
 console.log(player.songs)
function addSong(title, album, artist, duration, id) {
  // your code here
}

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
