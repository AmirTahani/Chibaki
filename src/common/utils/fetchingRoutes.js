import { message } from "antd/lib/index";

export function* handleSagaError(error) {
    yield message.config({
        top: 70,
        duration: 2,
        maxCount: 1,
    });
    if (error && error.data && error.data.message) {
        message.error(error.data.message, 3);
    }
}
