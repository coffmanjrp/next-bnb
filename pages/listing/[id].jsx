import Head from 'next/head';
import Link from 'next/link';
import { connectToDatabase } from '../../utils/mongodb';

const Listing = ({ property }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Next BnB</title>
      </Head>

      {property && (
        <div className="container mx-auto">
          <div className="flex">
            <div className="row w-full text-center my-4">
              <h1 className="text-4xl font-bold">Next BnB</h1>
              <Link href="/">
                <a>Back</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="flex-auto w1/4 rounded overflow-hidden shadow-lg m-2">
              <img
                src={property.images.picture_url}
                alt={property.name}
                className="w-full"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {property.name} (Up to {property.guests} guests)
                </div>
                <p>{property.address.street}</p>
                <p className="text-gray-700 text-base">{property.summary}</p>
              </div>
              <div className="px-6 py-4">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 m-1 text-sm font-semibold"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="text-center py-2 my-2 font-bold">
                <span className="text-green-500">
                  ${property.price.$numberDecimal}
                </span>
                /night (+
                <span className="text-green-500">
                  ${property.cleaning_fee.$numberDecimal} Cleaning Fee
                </span>
                )
              </div>
              <div className="text-center py-2 my-2">
                <Link href="#">
                  <a className="bg-green-500 hover:bg-green-700 text-white font-bold rounded inline-block py-2 px-4">
                    Book
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const data = await db.collection('listingsAndReviews').findOne(
    {
      _id: params.id,
    },
    {
      projection: {
        name: 1,
        images: 1,
        address: 1,
        summary: 1,
        price: 1,
        cleaning_fee: 1,
        amenities: 1,
      },
    }
  );

  return {
    props: { property: JSON.parse(JSON.stringify(data)) },
    revalidate: 1,
  };
}

export default Listing;
