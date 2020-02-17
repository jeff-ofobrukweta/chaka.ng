import { shallowMount, mount } from '@vue/test-utils';
import NewsCard from '@/components/cards/NewsCard.vue';
import filters from '../../src/filters';



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
  let wrapper;

  beforeEach(() => {
    const news = {
      imageUrl: "https://chaka.ng/dashboard/singlestock/BABA",
      name: "news",
      title: "Boomarang Platoon Fowl"
    }
    const collection = true ;
    const dummy =  true 
    wrapper = mount(NewsCard, {
      propsData: { news,collection,dummy }
    });
  });


  it('snapshot renders props.news when passed', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('snapshot renders props.collection when passed', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('snapshot renders props.dummy when passed', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('renders deep rendering to check for the number of img Tag', () => {
    expect(wrapper.findAll('img').length == 1)
  });

  it('test truncate filter from the vue-filters', () => {
    const news = {
      imageUrl: "https://chaka.ng/dashboard/singlestock/BABA",
      name: "news",
      title: "Boomarang Platoon Fowl"
    }
    expect((filters.truncate(news.name, 5).length)).toBeLessThanOrEqual(5)
  });
})


