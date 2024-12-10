import PollPageTemplate from "../../../components/PollPageTemplate";

const MyVotes = () => {
    return (
        <PollPageTemplate apiRoute='vote/myVotes' />
    );
};

export default MyVotes;
