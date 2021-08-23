/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";





const AllMeetups = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);
    


    useEffect(() => {
        async function getMeetups() {
            try {
                const res = await axios.get('/api/v1/meetups');

                setLoadedMeetups(res.data.data);
                setIsLoading(false);
            } catch (err) {
                alert(err.response.data.error);
            }
        }

        getMeetups();
    }, [])

    const reRender = () => {
        setLoadedMeetups({loadedMeetups: loadedMeetups});
    }

    




    if (isLoading) {
        return <section>
            <p>Loading...</p>
        </section>
    }


    return (
        <section>
            <h1>All Meetups</h1>
            <MeetupList meetups={loadedMeetups} reRender={reRender}/>
        </section>
    )
}

export default AllMeetups
