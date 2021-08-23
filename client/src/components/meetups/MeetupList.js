import MeetupItem from './MeetupItem'
import classes from './MeetupList.module.css'

const MeetupList = (props) => {
    return <ul className={classes.list}>
        {props.meetups.map(meetup => 
        <MeetupItem
        meetup={meetup}
        key={meetup._id} 
        id={meetup._id} 
        image={meetup.image} 
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
        favorited={meetup.favorited}
        />)}
    </ul>
}

export default MeetupList
