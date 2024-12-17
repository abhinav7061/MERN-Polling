import PollPageTemplate from "../../../components/PollPageTemplate";

const MyVotes = () => {
    return (
        <PollPageTemplate apiRoute='poll/myPolls' />
    );
};

export default MyVotes;
