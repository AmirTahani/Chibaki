import { loader } from '../redux/modules/professions';

export function handleRequestsByRoute(store, route) {
    if (route === '/') {
        store.dispatch(loader());
        const state = store.getState();
        const metaTags = getMetaTags(state, route);
        return {
            finalState: state,
            metaTags
        };
    }
}


export function getMetaTags(state, route) {
    const subRoute = route.split('/').reverse();
    const metaTags = {
        keywords: 'چی با کی, چی باکی, فریلنسر، استخدام، برون سپاری، کار در منزل، استخدام فریلنسر، کاریابی، کار پاره وقت، استخدام پاره وقت، کار پروژه ای، خدمات منزل، خدمات آموزشی، خدمات هنری، خدمات ورزشی، خدمات کامپیوتری، زبان های خارجه، chibaki, چی‌باکی, چیباکی',
        description: 'از مدرس زبان و برنامه نویس تا مربی بدن سازی و نقاش ساختمان, ما مناسبترین فرد را کاملاً رایگان برای ارائه‌ی خدمت به شما معرفی می کنیم',
        title: 'Chibaki - چی باکی'
    };
    if (subRoute[1] === 'خدمات') {
        const categories = state.professions.categories;
        const professions = categories.reduce((acc, current) => {
            acc.push(...current.professions);
            return acc;
        }, []);
        professions.map(profession => {
            const professionUrlTitle = profession.title.split(' ').join('_');
            if (subRoute[0] === professionUrlTitle) {
                metaTags.description = profession.description;
                metaTags.title = profession.title;
            }
        });
    }
    return metaTags;
}