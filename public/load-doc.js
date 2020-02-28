function Doc(el) {
  var element
  if (typeof el === 'string') {
    element = window.document.querySelector(el)
  } else if (el instanceof HTMLElement) {
    element = el
  } else {
    throw new Error('no mount element')
  }

  const axiosGithub = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Accept': 'application/json'
    }
  })

  axiosGithub.post('/markdown',
    {
      text: window.__doc__
    },
  ).then(({ data }) => {
    element.innerHTML = data
  })
}
