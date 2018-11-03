import { END } from 'redux-saga';
import { loader as loadProfession } from '../redux/modules/professions';
import { load as loadServiceRedux } from '../redux/modules/serviceContainer';
import { load as loadProfessional } from '../redux/modules/professional';
import { exist } from '../utils/helpers';
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

export function getMetaTags(state, route, query) {
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
    if (decodeURI(subRoute[1]) === 'professional') {
        if (
            exist(state, 'professional.professional.user.firstname') ||
            exist(state, 'professional.professional.user.lastname')
        ) {
            metaTags.title = `
            ${metaTags.title} 
            - 
            ${exist(state, 'professional.professional.user.firstname')}
            ${exist(state, 'professional.professional.user.lastname')}`;
        }
        const professions = exist(state, 'professional.professional.user.professions');
        const userProfession = professions.find(profession => profession.profession._id === query.profId);
        metaTags.description = exist(userProfession, 'intro.description') ?
            exist(userProfession, 'intro.description') :
            'salam';
    }
    return metaTags;
}

export function flattenProfessionsByCategories(categories) {
    return categories.reduce((acc, current) => {
        acc.push(...current.professions);
        return acc;
    }, []);
}
