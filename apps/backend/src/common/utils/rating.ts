export const calculateAvgRating = (feedbacks: { rating: number }[]): number => {
  if (!feedbacks.length) return 0

  const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0)
  return parseFloat((sum / feedbacks.length).toFixed(2))
}
