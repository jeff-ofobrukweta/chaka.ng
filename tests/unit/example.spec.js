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
    it('renders props.news when passed', () => {
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


