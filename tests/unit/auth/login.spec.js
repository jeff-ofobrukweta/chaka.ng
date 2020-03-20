import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Router from 'vue-router';
import axios from 'axios';

import sinon from 'sinon';
import { shallow } from 'enzyme';
import PubSub from 'pubsub-js';
import routes from '@/router/routes';
import Login from '@/views/auth/Login';
import { auth, API } from '../services';
import { login } from '../services/auth';


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);

const router = new Router({ routes });

describe('Components on Login Page', () => {
    let mutations;
    let store;
    let wrapper;
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
            store
        });
    });

    it('is a vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('calls RESET_REQ mutation on mounted', () => {
        expect(mutations.RESET_ALL).toHaveBeenCalled();
    });

    it('should have 2 input fields', () => {
        expect(wrapper.findAll('form-input-stub').length).toEqual(2);
    });

    it('should have one email input field', () => {
        expect(wrapper.findAll('form-input-stub[type="email"]').length).toEqual(1);
    });

    it('should have one password input field', () => {
        expect(wrapper.findAll('form-input-stub[type="password"]').length).toEqual(1);
    });

    it('should have one button', () => {
        expect(wrapper.findAll('action-button-stub').length).toEqual(1);
    });

    it('should have a link to the register page', async () => {
        wrapper.find({ ref: 'register-link' }).trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$route.name).toBe('register');
    });

    it('should have a link to the forgot password page', async () => {
        wrapper.find({ ref: 'forgot-link' }).trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$route.name).toBe('forgot-password');
    });

    // it('should make an API to the login endpoint', async () => {
    //     jest.mock('axios')
    //     const data = {
    //         data: {
    //             hits: [
    //                 {
    //                     objectID: '1',
    //                     title: 'a',
    //                 },
    //                 {
    //                     objectID: '2',
    //                     title: 'b',
    //                 },
    //             ],
    //         },
    //     };
    //     axios.mockResolvedValue()
    //     axios.post.mockImplementationOnce(() => Promise.resolve(data))
    //     await expect(auth({ email: 'dev@chaka.ng', password: 'Pa55w0rd' })).resolves.toEqual(data);
    //     expect(axios.post).toHaveBeenCalledWith(
    //         `${API}/auth/login`,
    //     );
    // })
});

describe('API calls on Login Page', () => {
    let mutations;
    let store;
    let wrapper;
    beforeEach(() => {
        mutations = {
            RESET_ALL: sinon.spy()
        };
        store = new Vuex.Store({
            state: {},
            mutations
        });
        wrapper = shallowMount(Login, {
            stubs: ['form-input', 'error-block', 'action-button'],
            localVue,
            router,
            store
        });
    });
    afterEach(() => {
        sinon.restore();
    });
    it('should test all subscribers', () => {
        const message = 'sample message';
        const stub = sinon.stub().throws();
        const spy1 = sinon.spy();
        const spy2 = sinon.spy();

        PubSub.subscribe(message, stub);
        PubSub.subscribe(message, spy1);
        PubSub.subscribe(message, spy2);

        PubSub.publishSync(message, undefined);
        expect(spy1.called);
        expect(spy2.called);
        expect(stub.calledBefore(spy1));
    });
    it('should make an API call when login button clicked', async () => {
        const credentials = {
            email: 'dev@chaka.ng',
            password: 'Pa55w0rd'
        };

        const url = '/users';

        const post = sinon.stub(axios, 'post');
        post.yields();

        const callback = sinon.spy();
        wrapper.find('action-button-stub').trigger('click');
        await wrapper.vm.$nextTick();
        login(credentials, callback);
        post.restore();
        sinon.assert.calledWith(post, url, credentials);
    });
    it('should should contain the right credentials when login button clicked', async () => {
        const credentials = {
            email: 'dev@chaka.ng',
            password: 'Pa55w0rd'
        };

        const url = '/users';

        const post = sinon.stub(axios, 'post');
        post.yields();

        const callback = sinon.spy();
        wrapper.find('action-button-stub').trigger('click');
        await wrapper.vm.$nextTick();
        login(credentials, callback);
        post.restore();
        sinon.assert.calledWith(post, url, credentials);
    });
});
