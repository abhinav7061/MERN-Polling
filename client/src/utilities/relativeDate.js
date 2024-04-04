export default function formatRelativeDate(date) {
    const now = new Date();
    const diffTime = (now - date) / (1000 * 60 * 60); // Difference in hours
    const diffHours = Math.round(diffTime);
    const diffDays = Math.round(diffHours / 24);

    if (diffHours < 24) {
        return 'today';
    } else if (diffHours < 48) {
        return 'yesterday';
    } else if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else if (diffDays < 365) {
        return `${Math.round(diffDays / 30)} month${Math.round(diffDays / 30) === 1 ? '' : 's'} ago`;
    } else {
        return `${Math.round(diffDays / 365)} year${Math.round(diffDays / 365) === 1 ? '' : 's'} ago`;
    }
}