# Next bnb

An Airbnb demo site using Mondodb sample_airbnb collection.

[DEMO](https://next-bnb-zeta.vercel.app/)

![Next bnb](https://res.cloudinary.com/coffmanjrp-dev/image/upload/v1643084120/coffmanjrp.io/next_bnb_497e36a458.png)

## How to start

1. Clone this repository.

```
git clone git@github.com:coffmanjrp/next-bnb.git
```

Or download the zip file.

2. Run following command to install the dependencies.

```
npm install
# or
yarn
```

3. Set your Pixabay API key to the environment variable.

example:

```
# .env.local file

MONGODB_URI=YOUR_MONGODB_URI
MONGODB_DB=YOUR_MONGODB_DATABASE_NAME
```

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.

4. And you can start localhost by

```
npm run dev
# or
yarn dev
```

Enjoy!

## Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwindcss](https://tailwindcss.com/)
