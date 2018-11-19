import { END } from 'redux-saga';
import {
    loader as loadProfession,
    loadProfessions,
    loadSingleProfessionDescription
} from '../redux/modules/professions';
import { load as loadServiceRedux } from '../redux/modules/serviceContainer';
import { load as loadProfessional } from '../redux/modules/professional';
import { exist } from '../utils/helpers';


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
            store.dispatch(loadProfessional(query.id, query.profId, resolve, reject));
        });
        store.dispatch(END);
    } else {
        store.dispatch(END);
    }
}

export function getMetaTags(store, route, query) {
    const state = store.getState();
    const subRoute = route.split('/').reverse();
    const metaTags = {
        keywords: 'چی با کی, چی باکی, فریلنسر، استخدام، برون سپاری، کار در منزل، استخدام فریلنسر، کاریابی، کار پاره وقت، استخدام پاره وقت، کار پروژه ای، خدمات منزل، خدمات آموزشی، خدمات هنری، خدمات ورزشی، خدمات کامپیوتری، زبان های خارجه، chibaki, چی‌باکی, چیباکی',
        description: 'از مدرس زبان و برنامه نویس تا مربی بدن سازی و نقاش ساختمان, ما مناسبترین فرد را کاملاً رایگان برای ارائه‌ی خدمت به شما معرفی می کنیم',
        title: ' chibaki | چی باکی | درخواست آنلاین تمامی خدمات'
    };
    if (decodeURI(subRoute[0]) === 'تماس_با_ما') {
        metaTags.title = ' chibaki | تماس با ما | چی باکی، درخواست آنلاین تمامی خدمات';
    }

    if (decodeURI(subRoute[0]) === 'درباره_ما') {
        metaTags.title = ' chibaki | درباره ما | چی باکی، درخواست آنلاین تمامی خدمات';
    }
    if (decodeURI(subRoute[0]) === 'خدمات') {
        metaTags.title = ' chibaki | خدمات | چی باکی، درخواست آنلاین تمامی خدمات';
    }
    if (decodeURI(subRoute[1]) === 'خدمات') {
        const categories = state.professions.categories;
        const professions = flattenProfessionsByCategories(categories);
        professions.forEach((profession) => {
            const professionUrlTitle = profession.title.split(' ').join('_');
            if (decodeURI(subRoute[0]) === professionUrlTitle) {
                metaTags.description = profession.description;
                metaTags.title = addSiteNameToTitle(`${profession.title}، درخواست رایگان و مقایسه قیمت`);
                if (query && query.province) {
                    metaTags.title = addSiteNameToTitle(`${profession.title} در ${query.province}، درخواست رایگان`);
                }
            }
        });
    }
    if (decodeURI(subRoute[1]) === 'professional') {
        if (exist(state, 'professional.professional.user')) {
            let userProfession;
            if (query && query.profId) {
                userProfession = state.professional.professional.user.professions.find((profession) => {
                    return profession.profession._id === query.profId;
                });
            } else {
                userProfession = state.professional.professional.user.professions[0];
            }
            const firstname = exist(state, 'professional.professional.user.firstname');
            const lastname = exist(state, 'professional.professional.user.lastname');
            metaTags.title = addSiteNameToTitle(`${firstname} ${lastname} متخصص ${userProfession.profession.title}`);
        }
        metaTags.description = exist(state, 'professional.metaDescription');
    }
    return metaTags;
}

export function flattenProfessionsByCategories(categories) {
    return categories.reduce((acc, current) => {
        acc.push(...current.professions);
        return acc;
    }, []);
}

export function addSiteNameToTitle(pageTitle) {
    return `${pageTitle} | چی باکی`;
}
