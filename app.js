const api_key = 'qC6LCYd68vZ5tO7lk6gVIIGVGFz7kkV6'
const form = document.querySelector('form')
const imgEl = document.querySelector('.images')
const removeBtn = document.querySelector('.removeBtn')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  let search = document.querySelector('#search').value
  getImage(search)
  form.reset()
})

removeBtn.addEventListener('click', function (e) {
  imgEl.innerHTML = ''
})

async function getImage(searchTerm) {
  try {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        q: searchTerm,
        api_key,
        offset: 1,
      },
    })

    console.log(res)

    const image = await res.data.data[Math.floor(Math.random() * 49)].images
      .fixed_height_downsampled.url
    if (image === undefined) {
      getRandom()
    } else {
      renderImage(image)
    }
  } catch (e) {
    console.log(e)
  }
}

async function getRandom() {
  try {
    const res = await axios.get(
      'https://api.giphy.com/v1/gifs/random?api_key=qC6LCYd68vZ5tO7lk6gVIIGVGFz7kkV6&tag=&rating=g'
    )

    const image = await res.data.data.images.fixed_height.url
    renderImage(image)
  } catch (e) {
    console.log(e)
  }
}

function renderImage(image) {
  const img = document.createElement('img')
  img.classList.add(
    'p-2',
    'rounded',
    'border',
    'border-warning',
    'm-3',
    'img-thumbnail'
  )
  img.setAttribute('src', image)
  imgEl.append(img)
}
getRandom()
