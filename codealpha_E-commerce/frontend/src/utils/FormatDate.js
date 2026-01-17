function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString();
}

export default formatDate;
