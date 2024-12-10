import PollPageTemplate from "../../../components/PollPageTemplate";

const MyVotes = () => {
    return (
        <PollPageTemplate apiRoute='vote/myVotes' type="votes" />
    );
};

export default MyVotes;
