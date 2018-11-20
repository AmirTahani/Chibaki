import { message } from 'antd';

export function* handleSagaError(error) {
    yield message.config({
        top: 70,
        duration: 2,
        maxCount: 1,
    });
    if (error && error.data && error.data.message) {
        if (/login$/i.test(error.config.url) && error.status === 422) {
            /**
             * Don't show error here because user is going to signup now
             */
            return;
        }
        message.error(error.data.message, 3);
    }
}
