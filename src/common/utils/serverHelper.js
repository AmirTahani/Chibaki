import { loader } from '../redux/modules/professions';
import { load as loadProficinets } from '../redux/modules/proficients';

export function handleRequestsByRoute(store, route) {
    const subRoute = route.split('/').reverse();
    const state = store.getState();
    if (route === '/') {
        store.dispatch(loader());
        const metaTags = getMetaTags(state, route);
        return {
            finalState: state,
            metaTags
        };
    }
    if (subRoute[1] === 'خدمات') {
        const routeTitle = subRoute[0].split('_').join(' ');
        const professions = flattenProfessionsByCategories(state.professions.categories);
        let professionId = '';
        professions.map(profession => {
            if (routeTitle === profession.title) {
                professionId = profession._id;
            }
        });
        store.dispatch(loadProficinets(professionId));
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
        const professions = flattenProfessionsByCategories(categories);
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

export function flattenProfessionsByCategories(categories) {
    return categories.reduce((acc, current) => {
        acc.push(...current.professions);
        return acc;
    }, []);
}