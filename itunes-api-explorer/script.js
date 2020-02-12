// console.log(sampleData)

/* globals sampleData */

class Song {
  constructor (songData) {
    this.artist = songData.artistName
    this.title = songData.trackName
    this.artworkUrl = songData.artworkUrl100
    this.previewUrl = songData.previewUrl
  }

  getArtworkUrl (size) {
    const urlArray = this.artworkUrl.split('/')
    urlArray.pop()
    urlArray.push(`${size}x${size}bb.jpg`)
    return urlArray.join('/')
  }

  generateHTML () {
    return `
      <a class="track" href="#">
        <img src="${this.getArtworkUrl(200)}">
        <div class="artist">${this.artist}</div>
        <div class="songname">${this.title}</div>
      </a>
    `
  }
}

const resultEl = document.querySelector('#results')
for (const result of sampleData.results) {
  const song = new Song(result)
  resultEl.insertAdjacentHTML('beforeend', song.generateHTML())
}
