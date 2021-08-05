import NewMeetupForm from "../components/meetups/NewMeetupForm"
import { useHistory } from "react-router";

const NewMeetup = () => {
    const history = useHistory();

    const addMeetupHandler = (meetupData) => {
        fetch(
            'https://react-meetups-41814-default-rtdb.firebaseio.com//meetups.json',
            {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            history.replace('/');
        });
    }

    return (
        <section>
            <h1>Add New Meetup</h1>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </section>
    )
}

export default NewMeetup
