 function GetData() {
    let songName = document.getElementById('songName').value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res=>res.json())
    .then(GetData=>{
        let allSong=''
        console.log(GetData)
        for(let i=0;i<=9;i++){
            allSong += `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${GetData.data[i].title}</h3>
                    <p class="author lead">Album by <span>${GetData.data[i].album.title}</span></p>
                    <audio controls>
                    <source src="${GetData.data[i].preview}" type="audio/mpeg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${GetData.data[i].artist.name}','${GetData.data[i].title}','${GetData.data[i].album.cover_medium}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
           `
        }
       let output =document.getElementById('output');
       output.innerHTML=allSong
    })
}


// single lyrics

function getLyrics(artistName,title,albumCover){
    let output =document.getElementById('lyrics');

    fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
    .then(res=>{
        if (res.ok) {
            return res.json();
        }else{
            output.innerText='Could not find lyrics'
        }
    })
    .then(data=>{
       let lyrics= `
            <h2 class="text-success mb-4">${title}</h2>
            <p>Singer<strong>-${artistName}</strong></p>
            <img style="margin-bottom:25px;" src="${albumCover}" widht="100" height="100"/>
            <pre class="lyric text-white">${data.lyrics}</pre>`;
        output.innerHTML=lyrics;
    })
}
