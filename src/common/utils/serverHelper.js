import queryString from 'query-string';
import {
    loader as loadProfession,
} from '../redux/modules/professions';
import { sitePath } from '../config';
import { load as loadServiceRedux } from '../redux/modules/serviceContainer';
import { load as loadProfessional } from '../redux/modules/professional';
import { exist } from '../utils/helpers';
import { end } from '../redux/modules/end';


export async function handleRequestsByRoute(store, route) {
    const path = route.path;
    const query = route.query;

    const subRoute = path.split('/').reverse().filter(item => item !== '');
    if (path === '/') {
        await new Promise((resolve, reject) => {
            store.dispatch(loadProfession(resolve, reject));
        });
        store.dispatch(end());
    } else if (decodeURI(subRoute[0]) === 'خدمات') {
        await new Promise((resolve, reject) => {
            store.dispatch(loadProfession(resolve, reject));
        });
        store.dispatch(end());
    } else if (decodeURI(subRoute[1]) === 'خدمات') {
        const profession = getTitleAndIdByUrl(subRoute[0]);
        const data = await new Promise((resolve, reject) => {
            store.dispatch(loadServiceRedux(resolve, reject, query, profession));
        });
        store.dispatch(end());
    } else if (subRoute[1] === 'professional') {
        const data = await new Promise((resolve, reject) => {
            store.dispatch(loadProfessional(query.id, query.profId, resolve, reject));
        });
        store.dispatch(end());
    } else {
        store.dispatch(end());
    }
}

export function getMetaTags(store, route, query) {
    const state = store.getState();
    const subRoute = route.split('/').reverse();
    const metaTags = {
        keywords: 'چی با کی, چی باکی, فریلنسر، استخدام، برون سپاری، کار در منزل، استخدام فریلنسر، کاریابی، کار پاره وقت، استخدام پاره وقت، کار پروژه ای، خدمات منزل، خدمات آموزشی، خدمات هنری، خدمات ورزشی، خدمات کامپیوتری، زبان های خارجه، Chibaki, چی‌باکی, چیباکی',
        description: 'از مدرس زبان و برنامه نویس تا مربی بدن سازی و نقاش ساختمان, ما مناسبترین فرد را کاملاً رایگان برای ارائه‌ی خدمت به شما معرفی می کنیم',
        title: ' Chibaki | چی باکی | درخواست آنلاین تمامی خدمات'
    };
    if (decodeURI(subRoute[0]) === 'تماس_با_ما') {
        metaTags.title = ' Chibaki | تماس با ما | چی باکی، درخواست آنلاین تمامی خدمات';
    }

    if (decodeURI(subRoute[0]) === 'درباره_ما') {
        metaTags.title = ' Chibaki | درباره ما | چی باکی، درخواست آنلاین تمامی خدمات';
    }
    if (decodeURI(subRoute[0]) === 'خدمات') {
        metaTags.title = ' Chibaki | خدمات | چی باکی، درخواست آنلاین تمامی خدمات';
    }
    if (decodeURI(subRoute[1]) === 'خدمات') {
        const professions = state.professions.professionsFlatChildren;
        professions.forEach((profession) => {
            const professionUrlTitle = getTitleAndIdByUrl(decodeURI(subRoute[0])).title;
            if (professionUrlTitle === profession.title) {
                metaTags.description = profession.description;
                metaTags.title = addSiteNameToTitle(`${profession.title}، درخواست رایگان و مقایسه قیمت`);
                if (query && query.province && query.province !== 'all') {
                    metaTags.title = addSiteNameToTitle(`${profession.title} ${query.province}، درخواست رایگان`);
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
            }
            if (!userProfession) {
                userProfession = state.professional.professional.user.professions[0];
            }

            const firstname = exist(state, 'professional.professional.user.firstname');
            const lastname = exist(state, 'professional.professional.user.lastname');
            if (exist(userProfession, 'intro.description')) {
                metaTags.description = userProfession.intro.description;
            } else {
                metaTags.description = addSiteNameToTitle(`من ${firstname} ${lastname} هستم و با تخصص 
            ${userProfession.profession.title} در چی باکی مشغول به فعالیت هستم.`);
            }
            metaTags.title = addSiteNameToTitle(`${firstname} ${lastname} متخصص ${userProfession.profession.title}`);
        }
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

export function getRedirectUrl(store, route) {
    const state = store.getState();
    const professions = state.professions.professions;

    const path = route.path;
    const query = route.query;
    const subRoute = path.split('/').reverse().filter(Boolean);
    if (decodeURI(subRoute[1]) === 'خدمات') {
        const serviceRoute = subRoute[0];
        const { title, _id } = getTitleAndIdByUrl(serviceRoute);
        const foundById = professions.find(profession => profession._id === _id);
        const foundByTitle = professions.find(profession => profession.title === title);


        if (foundById && foundById._id && foundByTitle && foundByTitle._id) {
            if (foundByTitle.title !== foundById.title) {
                return { status: 301, redirectUrl: generateServiceRoute(foundById, query) };
            }
            return { status: 200 };
        }

        if (foundById && foundById._id && !foundByTitle) {
            return { status: 301, redirectUrl: generateServiceRoute(foundById, query) };
        }

        if (foundByTitle && foundByTitle._id && !foundById) {
            return { status: 301, redirectUrl: generateServiceRoute(foundByTitle, query) };
        }
    }
    return { status: 200 };
}

export function generateServiceRoute(profession, query) {
    if (Object.keys(query).length) {
        return `${sitePath}خدمات/${profession.title.split(' ').join('-')}-${profession._id}?${queryString.stringify(query)}`;
    }
    return `${sitePath}خدمات/${profession.title.split(' ').join('-')}-${profession._id}`;
}

export function getTitleAndIdByUrl(route) {
    let isOldUrl = false;
    const splitedByDash = route.split('-');
    let routeTitleArray = splitedByDash;
    const splitedByUnderscore = route.split('_');
    if (splitedByUnderscore.length >= splitedByDash.length) {
        routeTitleArray = splitedByUnderscore;
        isOldUrl = true;
    }
    if (isOldUrl) {
        return {
            title: decodeURI(routeTitleArray.join(' '))
        };
    }
    return {
        _id: routeTitleArray.pop(),
        title: decodeURI(routeTitleArray.join(' '))
    };
}
