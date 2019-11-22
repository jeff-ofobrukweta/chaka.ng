import Input from '../components/form/Input';
import Button from '../components/form/Button';
import NewsCard from '../components/cards/NewsCard';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component('form-input', Input);
    Vue.component('form-button', Button);
    Vue.component('news-card', NewsCard);
  },
};

export default GlobalComponents;
