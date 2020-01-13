import Input from "../components/form/Input";
import ActionButton from "../components/form/ActionButton";
import Modal from "../components/modals/BaseModal";
import ErrorBlock from "../components/ErrorBlock";
import KYCButton from "../components/form/KYCButton";
import ModalKYC from "../components/kyc/ModalKYC";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
    install(Vue) {
        Vue.component("form-input", Input);
        // Vue.component('c-button', Button);
        Vue.component("action-button", ActionButton);
        Vue.component("modal", Modal);
        Vue.component("error-block", ErrorBlock);
        Vue.component("kyc-button", KYCButton);
        Vue.component("modal-kyc", ModalKYC);
    }
};

export default GlobalComponents;
