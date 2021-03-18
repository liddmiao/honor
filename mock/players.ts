import { Response, Request} from 'express'
import { Hero, Player } from '../src/api/types'
import { heros } from './heros'
import faker from 'faker'

// faker是一个虚假数据生成工具，相当于一个随机库
faker.locale = 'zh_CN'

const playerCount = 100
const playerList: Player[] = []


//循环创建100个玩家的信息
for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    nickname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    rank: faker.random.number(200),
    wanttoplay: genWantPlay(),
    winningstreak: faker.random.number(10)
  })
}

/**
 * 
 * @returns wanttoplay list
 */
function genWantPlay() {
  let wantplay: Set<Hero> = new Set()
  while(wantplay.size < 3) {
    wantplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wantplay)
}

export const getPlayers = (req: Request, res: Response) =>{

  // 根据发送过来的过滤条件对playerlist进行过滤
  const {accountname, page = 1, limit = 10} = req.query
  // 搜索用户
  let mockList = playerList.filter(item => !(accountname && item.accountname.indexOf(accountname.toString()) == -1))
  // 实现分页
  let pageList = mockList.filter((item, index) => index < Number(limit) * Number(page) && index >= Number(limit) * (Number(page) - 1))
  
  res.json({
    code: 200,
    data: pageList
  })
}