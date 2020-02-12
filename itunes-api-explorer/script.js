import sampleData from './sample-data.js'

const audioPlayer = document.querySelector('audio')

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

  play () {
    audioPlayer.src = this.previewUrl
    audioPlayer.oncanplay = function () {
      audioPlayer.play()
    }
  }

  generateNode () {
    const container = document.createElement('a')
    container.classList.add('track')
    container.href = '#'

    const img = document.createElement('img')
    img.src = this.getArtworkUrl(200)

    const artist = document.createElement('div')
    artist.classList.add('artist')
    artist.textContent = this.artist

    const songname = document.createElement('div')
    songname.classList.add('songname')
    songname.textContent = this.title

    container.appendChild(img)
    container.appendChild(artist)
    container.appendChild(songname)

    container.addEventListener('click', (event) => {
      event.preventDefault()
      this.play()
    })

    return container
  }
}

function setupPage () {
  const resultEl = document.querySelector('#results')
  for (const result of sampleData.results) {
    const song = new Song(result)
    resultEl.appendChild(song.generateNode())
  }
}

setupPage()
