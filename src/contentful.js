
import * as contentful from 'contentful';

const client = contentful.createClient({
  space: '893uputjzopm',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'XpsFW5q_aNW4I183bbajhHRKWnp-O7JS7qmZ7y0cxNo'
});

export default client;