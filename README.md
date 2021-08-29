# Personal Dev Dashboard

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)

The [blog post](https://ramonak.io/posts/personal-dashboard) with an overview of the development process.

## Technologies used

### Front-end

- [Next.js](https://nextjs.org/) - [React framework](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://material-ui.com/) - React UI framework
- [Recharts](https://recharts.org/en-US/) - charting library
- [react-spring](https://react-spring.io/) - animation library

### Back-end

- [MongoDB Atlas](https://www.mongodb.com/) - cloud-hosted Mongo Database
- [GitHub API](https://docs.github.com/en/rest)
- [dev.to API](https://docs.forem.com/api/)
- [Twitter API](https://developer.twitter.com/en/docs)
- [npm API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md)

---

## Local development

1. Create `.env.local` file with the following environmental variables:

```
DEVTO_API_KEY=
GITHUB_PERSONAL_TOKEN=
TWITTER_BEARER_TOKEN=
TWITTER_USERNAME=
MONGODB_URI=
MONGODB_DB=
APP_API_KEY=
```

How to obtain API keys and tokens described in the [blog post](https://ramonak.io/posts/personal-dashboard).

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
