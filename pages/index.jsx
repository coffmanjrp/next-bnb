import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';

export default function Home({ properties }) {
  return (
    <div>
      <Head>
        <title>Next BnB</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="container mx-auto">
        <div className="flex">
          <div className="row w-full text-center my-4">
            <h1 className="text-4xl font-bold mb4">Next BnB</h1>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-around">
          {properties &&
            properties.map((property) => (
              <div
                key={property.id}
                className="sm:flex-auto md:w-1/5 rounded overflow-hidden shadow-lg m-2"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-x1 mb-2">
                    {property.name} (Up to {property.guests} guests)
                  </div>
                  <p>{property.address.street}</p>
                  <p className="text-gray-700 text-base">{property.summary}</p>
                </div>

                <div className="text-center py-2 my-2 font-bold">
                  <span className="text-green-500">${property.price}</span>
                  /night (+
                  <span className="text-green-500">
                    ${property.cleaning_fee} Cleaning Fee
                  </span>
                  )
                </div>
                <div className="text-center py-2 my-2">
                  <a
                    href="/listing/{property._id}"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded inline-block py-2 px-4"
                  >
                    Details
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db
    .collection('listingsAndReviews')
    .find()
    .sort({ _id: 1 })
    .limit(40)
    .toArray();

  const properties = data.map((property) => {
    return {
      id: property._id,
      name: property.name,
      image: property.images.picture_url,
      address: property.address,
      summary: property.summary,
      guests: property.accommodates,
      price: JSON.parse(JSON.stringify(property.price)).$numberDecimal,
      cleaning_fee:
        property.cleaning_fee !== undefined &&
        JSON.parse(JSON.stringify(property.cleaning_fee)).$numberDecimal,
    };
  });

  return {
    props: { properties },
  };
}
