import { shallowMount,mount } from '@vue/test-utils';
import NewsCard from '@/components/cards/NewsCard.vue';

describe('NewsCard-vue', () => {
    it('renders props.news when passed', () => {
        const news = { message: 'foo' }
        const wrapper = shallowMount(NewsCard,{
            propsData: { news }
          })
        expect(wrapper.find('h5'),text())
    });
});


