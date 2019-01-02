export const apiPath = process.env.API_PATH || 'https://api.chibaki.co/';
export const sitePath = process.env.SITE_PATH || 'https://chibaki.co/';
export const profilePath = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/pages`
    : `${sitePath}pages`;

export const defualtQuestions = [
    {
        _id: 'time',
        title: 'بهترین زمانی که به این خدمت نیازمندید چه موقع میباشد؟',
        options: [
            { title: 'هر چه زودتر' },
            { title: 'فرقی نمیکند' },
            { title: 'در یک تاریخ خاص', hasDatePicker: true }
        ],
        type: 'singleWithDatePicker',
        hasDatePicker: true,
        skipable: false
    },
    {
        _id: 'description',
        title: 'توضیحات بیشتری که تمایل دارید متخصص مربوطه مطلع شود را ذکر نمایید.',
        options: [],
        type: 'text',
        skipable: true
    },
    {
        _id: 'location',
        title: 'شهر و منطقه خود را انتخاب کنید',
        options: [],
        type: 'location',
        skipable: false
    }
];
export const renderType = 'server';
