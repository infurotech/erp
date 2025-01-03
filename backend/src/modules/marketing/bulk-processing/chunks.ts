/**
 * Generator function to split an array into chunks.
 * @param {Array} array - The list of emails.
 * @param {number} batchSize - The size of each batch.
 */
export async function* createBatches(array : any[], batchSize) {
    for (let i = 0; i < array.length; i += batchSize) {
      yield array.slice(i, i + batchSize);
    }
}
  