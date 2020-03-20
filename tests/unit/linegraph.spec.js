import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Linechart from '@/components/Linegraph/linegraph.vue';
import Line from '@/components/Linegraph/linegraph_config.js';
import { priceArray, currency, date } from '../constants_props';


describe('Line Chart Component', () => {
    let wrapper;
    let store;
    let actions;
    let mutations;
    let state;
    let getters;
    let methods;
    const localVue = createLocalVue();
    localVue.use(Vuex);

    beforeEach(() => {
        actions = {
            someAction: jest.fn()
        };
        methods = {
            fillData: jest.fn()
        };
        getters = {
            clicks: () => 2,
            inputValue: () => 'input'
        };
        mutations = {
            someMutation: jest.fn()
        };
        state = {
            key: {},
            price: [
                19.33,
                39.33,
                23.34,
                12.44
            ],
            date: ['2019-11-18', '2019-12-19', '2019-11-19']
        };
        store = new Vuex.Store({
            actions,
            mutations,
            getters,
            state
        });
        wrapper = mount(Linechart, {
            stubs: ['line-chart'],
            localVue,
            store,
            methods
        });
    });
    afterEach(() => {
        wrapper.destroy();
    });
    it('find the line config inside the line base component', () => {
        expect(wrapper.find(Line).exists()).toBe(true);
    });

    it('check the name of the component', () => {
    // check the name of the component
        expect(wrapper.name()).toMatch('linechartgraph');
    });
    it('correctly checks data to assert the type is object', () => {
        expect(wrapper.vm.$data.options).toBeInstanceOf(Object);
    });
    test('is a Vue instance in the Line Graph component', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });
    it('has main-container class chart__aspect-ratio', () => {
        expect(wrapper.contains('.chart__aspect-ratio')).toBe(true);
    });

    it('snapshot renders props.priceArray when passed into parent Line component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('snapshot renders props.price when passed', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('snapshot renders props.date when passed', () => {
        expect(wrapper).toMatchSnapshot();
    });


    it('test to check if props Type is an Array', () => {
        expect(typeof priceArray.price).toEqual(typeof []);
    });
});
