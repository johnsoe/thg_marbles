export function getAllWagersOnEvent(allWagers, eventId) {
  if (allWagers) {
    return allWagers.filter(item => item.eventId === eventId);
  }
}
