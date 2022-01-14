export default function generateError(error) {
  return {
    status: error.statusCode,
    message: error.message,
  }
}
