import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetUpList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title> React Meetups </title>
        <meta
          name="description"
          content="Browse a list of highly active React meetups!"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://test-user:PAANDeZuFMB3kRZY@cluster0.erxnr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    // always return object
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    //fetch data from API

    return {
        props: DUMMY_MEETUPS
    }
}; */
export default HomePage;
