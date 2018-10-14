import { message } from 'antd';

export function* handleSagaError(error) {
    message.config({
        top: 70,
        duration: 2,
        maxCount: 1,
    });
    if (error && error.data && error.data.message) {
        message.error(error.data.message, 3)
    }
}
