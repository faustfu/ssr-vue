const fs = require('fs')

const server = require('express')()

const { createBundleRenderer } = require('vue-server-renderer')

const serverBundle = require('./vue-ssr-server-bundle.json')
const clientManifest = require('/path/to/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync('./index.template.html', 'utf-8'),
  clientManifest,
})

const createApp = require('./app')

server.get('*', (req, res) => {
  const context = {
      title: 'UU is good',
      meta: `<meta charset="UTF-8">`,
      url: req.url,
    },
    app = createApp(context)

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})
server.listen(8080)
