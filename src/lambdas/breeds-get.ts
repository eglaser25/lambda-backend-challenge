import fetch from 'node-fetch'
import { Response } from './types'

interface BreedResponse extends Response {
  body: string[]
}

interface ErrorResponse extends Response {
  message: string
}

interface BreedPayload {
  message: {
    [key: string]: string[]
  }
  status: string
}

function nestedToFlat(nested: { [key: string]: string[] }): string[] {
  const results = []
  const mainBreeds = Object.keys(nested)
  for (let i = 0; i < mainBreeds.length; i += 1) {
    const currentBreed: string = mainBreeds[i]
    if (nested[currentBreed].length === 0) {
      results.push(currentBreed)
    } else {
      for (let k = 0; k < nested[currentBreed].length; k += 1) {
        results.push(`${nested[currentBreed][k]} ${currentBreed}`)
      }
    }
  }
  return results
}

export async function handler(): Promise<BreedResponse | ErrorResponse> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const payload: BreedPayload = await res.json()
    const flatResults = nestedToFlat(payload.message)
    return {
      statusCode: 200,
      body: flatResults,
    }
  } catch (err: unknown) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }
}


/*
for (const entry in data) {
    let subBreed = data[entry]
    if (subBreed.length === 0) {
      results.push(subBreed)
    } else {
      for (let i = 0; i < subBreed.length; i++) {
        results.push(subBreed[i] + entry)
      }
    }
  }
*/
