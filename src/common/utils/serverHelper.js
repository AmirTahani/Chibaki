import { END } from 'redux-saga';
import { loader as loadProfession } from '../redux/modules/professions';
import { load as loadServiceRedux } from '../redux/modules/serviceContainer';
import { load as loadProfessional } from '../redux/modules/professional';
import { loadProvinces } from '../redux/modules/provinces';
import { load as loadProjectsForProf } from '../redux/modules/projectsForProfession';


export async function handleRequestsByRoute(store, route) {
    const path = route.path;
    const query = route.query;

    const subRoute = path.split('/').reverse();
    if (path === '/') {
        await new Promise((resolve, reject) => {
            store.dispatch(loadProfession(resolve, reject));
        });
        store.dispatch(END);
    } else if (decodeURI(subRoute[0]) === 'خدمات') {
        await new Promise((resolve, reject) => {
            store.dispatch(loadProfession(resolve, reject));
        });
        store.dispatch(END);
    } else if (decodeURI(subRoute[1]) === 'خدمات') {
        const routeTitle = subRoute[0].split('_').join(' ');
        const data = await new Promise((resolve, reject) => {
            store.dispatch(loadServiceRedux(resolve, reject, query, routeTitle));
        });
        store.dispatch(END);
    } else if (subRoute[1] === 'professional') {
        const data = await new Promise((resolve, reject) => {
            store.dispatch(loadProfessional(query.id, resolve, reject));
        });
        store.dispatch(END);
    } else {
        store.dispatch(END);
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
        professions.forEach((profession) => {
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
