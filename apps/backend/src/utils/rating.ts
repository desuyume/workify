export const calculateAvgRating = (feedbacks: { rating: number }[]): number => {
    if (!feedbacks.length) return 0
    return feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
}