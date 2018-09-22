import { take } from 'redux-saga/effects';
import { loader, loadCategories, LOAD_CATEGORIES_SUCCESS } from '../redux/modules/professions';
import { load as loadProficients } from '../redux/modules/proficients';

export async function handleRequestsByRoute(store, route) {
    console.log('its x');
    const subRoute = route.split('/').reverse();
    if (route === '/') {
        store.dispatch(loader());
    }
    if (decodeURI(subRoute[0]) === 'خدمات') {
        store.dispatch(loader());
    }
    if (decodeURI(subRoute[1]) === 'خدمات') {
        const routeTitle = subRoute[0].split('_').join(' ');
        const categories = await new Promise((resolve, reject) => {
            store.dispatch(loadCategories(resolve, reject));
        });

        const professions = flattenProfessionsByCategories(categories);
        let professionId = '';
        professions.map(profession => {
            if (decodeURI(routeTitle) === profession.title) {
                professionId = profession._id;
            }
        });
        console.log(professionId, 'professionId');
        store.dispatch(loadProficients(professionId));
    }
}

export function getMetaTags(state, route) {
    const subRoute = route.split('/').reverse();
    const metaTags = {
        keywords: 'چی با کی, چی باکی, فریلنسر، استخدام، برون سپاری، کار در منزل، استخدام فریلنسر، کاریابی، کار پاره وقت، استخدام پاره وقت، کار پروژه ای، خدمات منزل، خدمات آموزشی، خدمات هنری، خدمات ورزشی، خدمات کامپیوتری، زبان های خارجه، chibaki, چی‌باکی, چیباکی',
        description: 'از مدرس زبان و برنامه نویس تا مربی بدن سازی و نقاش ساختمان, ما مناسبترین فرد را کاملاً رایگان برای ارائه‌ی خدمت به شما معرفی می کنیم',
        title: 'Chibaki - چی باکی'
    };
    if (decodeURI(subRoute[1]) === 'خدمات') {
        const categories = state.professions.categories;
        const professions = flattenProfessionsByCategories(categories);
        professions.map(profession => {
            const professionUrlTitle = profession.title.split(' ').join('_');
            if (decodeURI(subRoute[0]) === professionUrlTitle) {
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