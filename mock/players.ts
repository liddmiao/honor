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
  // 使用set避免重复数据
  let wantplay: Set<Hero> = new Set()
  while(wantplay.size < 3) {
    wantplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wantplay)
}

/**
 * 获取用户列表
 * @param req 
 * @param res 
 * @returns 用户列表
 */
export const getPlayers = (req: Request, res: Response) =>{

  // 根据发送过来的过滤条件对playerlist进行过滤
  const {accountname, page = 1, limit = 10} = req.query

  // 搜索用户
  let mockList = playerList.filter(item => !(accountname && item.accountname.indexOf(<string>accountname) == -1))
  // 实现分页
  // <number> 和page as number 类型断言，告诉编译器我确定这个变量的类型
  let pageList = mockList.filter((item, index) => index < <number>limit * (page as number) && index >=<number>limit * (<number>page - 1))

  res.json({
    code: 200,
    data: {
      total: pageList.length,
      players: pageList
    }
  })
}

/**
 * 根据id获取用户信息
 * @param req 
 * @param res 
 * @returns 对应用户信息
 */
export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params

  // 遍历playerList，返回对应的用户信息
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 200,
        data: {
          player
        }
      })
    }
  }

  // 没找到响应数据
  res.json({
    code: 7001,
    message: '没有相应的玩家信息'
  })
}

/**
 * 创建新用户
 * @param req 
 * @param res 
 * @returns 用户信息
 */
export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body

  res.json({
    code: 200,
    data: {
      player: player
    }
  })
}

/**
 * 更新用户
 * @param req 
 * @param res 
 * @returns 更新用户信息
 */
export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params
  const { player } = req.body

  for (const p in playerList) {
    if (p.indexOf.toString() === id) {
      return res.json({
        code: 200,
        data: {
          player
        }
      })
    }
  }

  res.json({
    code: 70001,
    message: '没有找到玩家信息'
  })
}

/**
 * 删除玩家信息
 * @param req 
 * @param res 
 * @returns 删除成功信息
 */
export const deletePlayer = (req: Request, res: Response) => {
  const { id } = req.params

  for (const player in playerList) {
    if (player.indexOf.toString() === id) {
      return res.json({
        code: 200,
        data: {
          success: 1
        }
      })
    }
  }
  res.json({
    code: 7001,
    message: '删除玩家信息失败',
    data: {
      success: 0
    }
  })
}