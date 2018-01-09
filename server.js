const fs = require('fs')

const server = require('express')()

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8'),
})

const createApp = require('./app')

const context = {
  title: 'UU is good',
  meta: `<meta charset="UTF-8">`,
}

server.get('*', (req, res) => {
  const context = {
      title: 'UU is good',
      meta: `<meta charset="UTF-8">`,
      url: req.url,
    },
    app = createApp(context)

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)
