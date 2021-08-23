import NewMeetupForm from "../components/meetups/NewMeetupForm"
import { useHistory } from "react-router";
import axios from "axios";

const NewMeetup = () => {
    const history = useHistory();

    const addMeetupHandler = async (meetupData) => {
        console.log(meetupData);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.post('/api/v1/meetups/new-meetup', meetupData, config);

            history.replace('/');
        } catch (err) {
            console.log(meetupData);
            alert(err);
        }
    };


    return (
        <section>
            <h1>Add New Meetup</h1>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </section>
    )
}

export default NewMeetup
