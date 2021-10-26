import { Test, TestingModule } from '@nestjs/testing'

import { IUser } from './interfaces/user.interface'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile()

    service = moduleRef.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it.each`
    name      | returnVal
    ${'john'} | ${{ id: '1', username: 'john', password: 'changeme' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: IUser }) => {
      expect(await service.findOneByUserName(name)).toEqual(returnVal)
    },
  )
})
