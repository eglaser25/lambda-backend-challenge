import fetch from 'node-fetch'
import { handler } from '../handlers/breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler', () => {
  const mockPayload = {
    message: {
      shepherd: ['german', 'australian'],
      shihtzu: [],
    },
    status: 'success',
  }
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({
      statusCode: 200,
      body: ['german shepherd', 'australian shepherd', 'shihtzu'],
    })
  })
})
