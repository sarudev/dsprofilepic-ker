import * as express from 'express'
import { Client, type UserResolvable } from 'discord.js'
import * as cors from 'cors'

const client = new Client({
  intents: []
})

const app = express()

app.use(cors())

app.get('/ds/profpic/:userid', async (req, res) => {
  const userid = req.params.userid
  const isSnowflake = !(userid.split('').some(i => isNaN(Number(i))) as boolean)
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
  let userData: UserResolvable
  try {
    client.users.cache.clear()
    userData = await client.users.fetch(userid)
  } catch (e: unknown) {
    res.send({ error: 'user not found' })
    res.status(404)
    return
  }
  // res.send(userData.displayAvatarURL({ size: 1024 }))
  res.send(userData.avatarURL({ size: 1024 }))
})

app.listen(3000, () => { console.log('Server running on port 3000') })

client.on('ready', () => {
  console.log('client ready')
})

void client.login('MTA5MjEwMTY0NzcwNDAxODk3NA.GLw97E.4V0zU6wKOeePhsi7sn3DKAYneqSFFkznSK08s8')
// MTA5MjEwMTY0NzcwNDAxODk3NA.GLw97E.4V0zU6wKOeePhsi7sn3DKAYneqSFFkznSK08s8
