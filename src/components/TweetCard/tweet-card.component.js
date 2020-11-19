import {Typography} from "@material-ui/core"

const TweetCard = (props) => {
    const {text} = props;

    return(<Typography>{text}</Typography>)
}

export default TweetCard;