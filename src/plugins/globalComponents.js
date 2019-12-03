import Input from "../components/form/Input";
import Button from "../components/form/Button";
import ActionButton from "../components/form/ActionButton";
import NewsCard from "../components/cards/NewsCard";
import Modal from "../components/modals/BaseModal";
import FundModal from "../components/modals/Fund";
import ExchangeModal from "../components/modals/Exchange";
import WithdrawModal from "../components/modals/Withdraw";
import BuyModal from "../components/modals/Buy";
import SellModal from "../components/modals/Sell";
import SaleSuccess from "../components/modals/SaleSuccess";
import WalletSuccess from "../components/modals/WalletSuccess";
import ErrorBlock from "../components/ErrorBlock";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
    install(Vue) {
        Vue.component("form-input", Input);
        Vue.component("c-button", Button);
        Vue.component("action-button", ActionButton);
        Vue.component("news-card", NewsCard);
        Vue.component("modal", Modal);
        Vue.component("buy-modal", BuyModal);
        Vue.component("sell-modal", SellModal);
        Vue.component("sale-success", SaleSuccess);
        Vue.component("wallet-success", WalletSuccess);
        Vue.component("withdraw-modal", WithdrawModal);
        Vue.component("exchange-modal", ExchangeModal);
        Vue.component("fund-modal", FundModal);
        Vue.component("error-block", ErrorBlock);
    }
};

export default GlobalComponents;
