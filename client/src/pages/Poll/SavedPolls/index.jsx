import PollPageTemplate from "../../../components/PollPageTemplate";

const SavedPolls = () => {
    return (
        <PollPageTemplate apiRoute='save-poll/saved-polls' type="saved polls" />
    );
};

export default SavedPolls;
