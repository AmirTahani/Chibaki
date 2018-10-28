export const apiPath = 'https://api-staging.chibaki.ir';
export const sitePath = 'https://stating.chibaki.ir';

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
