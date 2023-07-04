import * as express from 'express'
import { Client } from 'discord.js'
import * as cors from 'cors'
import 'dotenv/config'

const client = new Client({
  intents: []
})

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())

app.get('/ds/profpic/:userid', (req, res) => {
  const userid = req.params.userid
  const isSnowflake = !(userid.split('').some(i => isNaN(Number(i))))
  if (!isSnowflake) {
    res.send({ error: 'invalid id' })
    res.status(404)
    return
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!client.isReady) {
    res.send({ error: 'client not ready' })
    res.status(404)
    return
  }
  client.users.cache.clear()
  client.users.fetch(userid).then(data => {
    res.send({ ...data, avatarURL: data.avatarURL({ size: 4096 }) })
    res.status(200)
  })
    .catch(() => {
      res.send({ error: 'user not found' })
      res.status(404)
    })
})

app.listen(port, () => { console.log(`Server running on port ${port}`) })

client.on('ready', async () => {
  console.log('client ready')
})

void client.login(process.env.TOKEN)
