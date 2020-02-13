import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from "vuex";
import Router from 'vue-router'
import Login from '@/views/auth/Login';


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router)

const router = new Router()

describe('Login Page', () => {
    let mutations
    let store
    let wrapper
    beforeEach(() => {
        mutations = {
            RESET_ALL: jest.fn()
        };
        store = new Vuex.Store({
            state: {},
            mutations
        });

        wrapper = shallowMount(Login, {
            stubs: ['form-input', 'error-block', 'action-button', 'router-link', 'router-view'],
            localVue,
            router,
            store,
        });
    });
    it('calls RESET_REQ mutation on mounted', () => {
        expect(mutations.RESET_ALL).toHaveBeenCalled();
    });

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('is a vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should have 2 input fields', () => {
        expect(wrapper.findAll('form-input-stub').length).toEqual(2)
    })

    it('should have one button', () => {
        expect(wrapper.findAll('action-button-stub').length).toEqual(1)
    })

    it('should have a link to the register page', () => {
        expect(wrapper.find('router-link-stub').text()).toBe('Register now')
    })
});
