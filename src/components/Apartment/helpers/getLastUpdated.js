import distanceInWords from 'date-fns/distance_in_words';
import ruLocale from 'date-fns/locale/ru';

export default item => distanceInWords(new Date, item.lastTimeUp, { addSuffix: true, locale: ruLocale })
