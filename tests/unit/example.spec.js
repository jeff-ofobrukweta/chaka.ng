import { shallowMount,mount } from '@vue/test-utils';
import NewsCard from '@/components/cards/NewsCard.vue';



/*
Inputs

Data: the component’s data
Props: the component’s props
User Interaction: user clicks a button
Lifecycle Methods: mounted(), created(), etc.
Store: state management data
Route Params: data in the route
*/



// test the news card and check for images link is valid
describe('NewsCard-vue', () => {
    it('snapshot renders props.news when passed', () => {
        const news = {
            imageUrl:"https://chaka.ng/dashboard/singlestock/BABA",
            name:"news",
            title:"title"
        }
        const wrapper = mount(NewsCard,{
            propsData: { news}
          })
          expect(wrapper).toMatchSnapshot()
    });
});

describe('Validate the news object.vue', () => {
    it('renders props.msg when passed', () => {
        const news = {
            imageUrl:"https://chaka.ng/dashboard/singlestock/BABA",
            name:"news",
            title:"title"
        }
      const wrapper = shallowMount(NewsCard, {
        propsData: { news }
      })
      console.log('boom',wrapper.text())
      expect(wrapper.text()).toMatch(news)
    })
  })


