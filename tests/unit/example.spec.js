import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from "vuex";
import Router from 'vue-router'
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register'
import routes from '@/router/routes'


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router)

const router = new Router({ routes })

describe('Login Page', () => {
    let mutations
    let store
    let wrapper
    const $route = {
        path: '/login'
    }
    beforeEach(() => {
        mutations = {
            RESET_ALL: jest.fn()
        };
        store = new Vuex.Store({
            state: {},
            mutations
        });

        wrapper = mount(Login, {
            stubs: ['form-input', 'error-block', 'action-button'],
            localVue,
            router,
            store,
        });
    });

    it('is a vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('calls RESET_REQ mutation on mounted', () => {
        expect(mutations.RESET_ALL).toHaveBeenCalled();
    });

    it('should have 2 input fields', () => {
        expect(wrapper.findAll('form-input-stub').length).toEqual(2)
    })

    it('should have one email input field', () => {
        expect(wrapper.findAll('form-input-stub[type="email"]').length).toEqual(1)
    })

    it('should have one password input field', () => {
        expect(wrapper.findAll('form-input-stub[type="password"]').length).toEqual(1)
    })

    it('should have one button', () => {
        expect(wrapper.findAll('action-button-stub').length).toEqual(1)
    })

    it('should have a link to the register page', async () => {
        wrapper.find({ ref: 'register-link' }).trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$route.fullPath).toBe('/register')
    })

    it('should have a link to the forgot password page', async () => {
        wrapper.find({ ref: 'forgot-link' }).trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$route.fullPath).toBe('/forgot-password')
    })
});
