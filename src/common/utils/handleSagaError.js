
// @TODO alert the error here
export function* handleSagaError(error) {
    const msg = yield error.json();
    if (msg && msg.message) {
        console.log(msg.message);
    }
}
