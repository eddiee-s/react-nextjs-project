// our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {  // API FOLDER --> new-meetup FILE
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  };

  return (
  <Fragment>
      <Head>
        <title> Add a new Meetup </title>
        <meta
          name="description"
          content="Add your own meetups, create amazing networking opportunities."
        />
      </Head>
  <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>
  );
};

export default NewMeetupPage;
