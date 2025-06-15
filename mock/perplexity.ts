import { faker } from "@faker-js/faker";


faker.seed(12);

const data = [...Array(20).keys()].map(() => {
  return {
    key: faker.string.uuid(),
    title: faker.music.artist(),
    image: faker.image.urlPicsumPhotos({
      width: 2400,
      height: 2400
    }),
    bg: faker.color.rgb(),
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    author: {
      name: faker.person.fullName(),
      avatar: faker.image.avatarGitHub()
    }
  }
})

export type PerplexityItem = (typeof data)[0];
export default data;