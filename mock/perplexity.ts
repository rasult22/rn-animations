import { faker } from "@faker-js/faker";


faker.seed(12);

const data = [...Array(20).keys()].map(() => {
  return {
    key: faker.string.uuid(),
    title: faker.music.artist(),
    image: 'https://i.pinimg.com/736x/64/f1/08/64f108fd2e71561fbb555acc00137baa.jpg',
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