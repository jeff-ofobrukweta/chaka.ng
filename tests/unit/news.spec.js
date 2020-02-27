import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NewsCard from '@/components/cards/NewsCard.vue';
import { newsUrl } from '../unit/constants';
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
  let store;
  let actions;
  let mutations;
  let state;
  const localVue = createLocalVue();
  localVue.use(Vuex);

  beforeEach(() => {
    const news = {
      imageUrl: newsUrl,
      name: "news",
      title: "Boomarang Platoon Fowl"
    }
    const collection = true;
    const dummy = true;
    actions = {
      someAction: jest.fn()
    };
    mutations = {
      someMutation: jest.fn()
    };
    state = {
      key: {}
    };
    store = new Vuex.Store({
      actions,
      mutations,
      state,
    });
    wrapper = mount(NewsCard, {
      propsData: { news, collection, dummy },
      mocks: {},
      stubs: {},
      methods: {},
      store,
      localVue,
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  test('is a Vue instance in the news component', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it('has main-container class', () => {
    expect(wrapper.contains('.card-news')).toBe(true);
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
      imageUrl: newsUrl,
      name: "news",
      title: "Boomarang Platoon Fowl"
    }
    expect((filters.truncate(news.name, 5).length)).toBeLessThanOrEqual(5)
  });



  // it('should redirect anonymous users to /href <anchor tag>/ when clicking on login button', () => {
  //   const anchor = wrapper.find('a')
  //   window.location.assign = jest.fn() // Create a spy
  //   anchor.trigger('click')
  //   expect(window.location.assign).toHaveBeenCalledWith('/auth/');
  // })
})


