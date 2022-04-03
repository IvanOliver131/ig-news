import Prismic from '@prismicio/client'

export function getPrismicClient(req?: any) {
  const prismic = Prismic.client(
    process.env.PRISMIC_API_ACCESS,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  )

  return prismic
}