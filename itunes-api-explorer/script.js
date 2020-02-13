/* globals fetch */

import Keyboarder from './keyboarder.js'

const audioPlayer = document.querySelector('audio')
const bodyStyles = window.getComputedStyle(document.body)

function getColor (colorName) {
  return bodyStyles.getPropertyValue(`--${colorName}-color`)
}

function isPlaying (player) {
  return player.currentTime > 0 && !player.paused && !player.ended
}

class Song {
  constructor (songData, options) {
    this.artist = songData.artistName
    this.title = songData.trackName
    this.artworkUrl = songData.artworkUrl100
    this.previewUrl = songData.previewUrl

    if (options.onplay) {
      this.onplay = options.onplay
    } else {
      this.onplay = function () {}
    }
  }

  getArtworkUrl (size) {
    const urlArray = this.artworkUrl.split('/')
    urlArray.pop()
    urlArray.push(`${size}x${size}bb.jpg`)
    return urlArray.join('/')
  }

  play () {
    if (audioPlayer.src !== this.previewUrl) {
      audioPlayer.src = this.previewUrl
      // audioPlayer.controls = true

      audioPlayer.oncanplay = () => {
        this.onplay(this)
        audioPlayer.play()
      }
    } else if (isPlaying(audioPlayer)) {
      audioPlayer.pause()
    } else {
      this.onplay(this)
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

class SongCollection {
  constructor (collectionData, options) {
    this.options = options
    this.readSongsFromData(collectionData)
  }

  render () {
    const resultEl = document.querySelector('#results')
    resultEl.innerHTML = ''

    if (this.songs.length === 0) {
      const searchEl = document.querySelector('#search')
      resultEl.innerHTML = `<div class="no-results">There are no results for "${searchEl.value}".</div>`
    }

    for (const song of this.songs) {
      resultEl.appendChild(song.generateNode())
    }
  }

  readSongsFromData (collectionData) {
    // this.songs = []
    // for (const songData of collectionData) {
    //   this.songs.push(new Song(songData))
    // }

    this.songs = collectionData.map(songData => new Song(songData, this.options))
  }

  refresh (collectionData) {
    this.readSongsFromData(collectionData)
    this.render()
  }
}

class Visualizer {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.backgroundColor = getColor('stroke')
    this.vizColor = getColor('highlight')
    this.radius = 20
    this.ticks = 0
  }

  show () {
    this.canvas.style.display = 'block'
  }

  hide () {
    this.canvas.style.display = 'none'
  }

  visualize (song) {
    this.context.fillStyle = getColor('secondary')
    this.context.font = '2rem IBM Plex Mono'
    this.context.fillText(song.title, 0, 50)

    const draw = () => {
      this.ticks += 1

      if (Keyboarder.isDown(Keyboarder.KEYS.SHIFT)) {
        this.backgroundColor = getColor('secondary')
        this.vizColor = getColor('headline')
        if (this.ticks % 5 === 0) {
          this.radius = Math.random() * 10 + 10
        }
      } else {
        this.backgroundColor = getColor('stroke')
        this.vizColor = getColor('highlight')
      }

      this.clear()

      const currentTime = audioPlayer.currentTime
      const duration = audioPlayer.duration
      if (isNaN(duration)) {
        return
      }

      const currentPercentage = currentTime / duration
      const canvasWidth = this.canvas.width
      const center = currentPercentage * canvasWidth

      this.context.beginPath()
      this.context.fillStyle = this.vizColor
      this.context.arc(center, this.canvas.height / 2, this.radius, 0, Math.PI * 2)
      this.context.fill()
      this.context.closePath()

      requestAnimationFrame(draw)
    }

    draw()
  }

  clear () {
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function setupPage () {
  const searchEl = document.querySelector('#search')
  const formEl = document.querySelector('#search-form')
  const viz = new Visualizer(document.querySelector('#visualizer'))
  document.querySelector('#visualizer').width = window.innerWidth
  formEl.addEventListener('submit', function (event) {
    event.preventDefault()
    if (!searchEl.value) { return }

    fetch(`https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(searchEl.value)}&entity=song`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        const collection = new SongCollection(data.results, {
          onplay: (song) => {
            viz.show()
            viz.clear()
            viz.visualize(song)
          }
        })
        collection.render()
      })
  })

  window.addEventListener('resize', () => {
    document.querySelector('#visualizer').width = window.innerWidth
  })
}

setupPage()
