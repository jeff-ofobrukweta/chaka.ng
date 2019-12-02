<template>
    <modal no-header @close="closeModal">
        <div class="form-half form-half__margin">
            <div class="form__image stock-vdr__center">
                <svg
                    class="stock-vdr__svg"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 507.2 507.2"
                    style="enable-background:new 0 0 507.2 507.2;"
                    xml:space="preserve"
                >
                    <circle style="fill:#32BA7C;" cx="253.6" cy="253.6" r="253.6" />
                    <path
                        style="fill:#0AA06E;"
                        d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"
                    />
                    <g>
                        <path
                            style="fill:#FFFFFF;"
                            d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
		c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
                        />
                        <path
                            style="fill:#FFFFFF;"
                            d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
		c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
                        />
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                </svg>
            </div>
            <h3 class="stock-vdr__center">Your Transaction was successful</h3>
            <div class="stock-vdr__modal">
                <div class="stock-vdr__flex">
                    <div class="form-group stock-vdr__box stock-vdr__center">
                        <label>{{ source === "Exchange" ? "Estimated " : " " }}Amount</label>
                        <h4 class="gift__success stock-vdr__center">
                            {{ getWalletTx.txAmount | kobo | currency(getWalletTx.currency) }}
                        </h4>
                    </div>
                    <div class="form-group stock-vdr__box stock-vdr__center">
                        <label>Action</label>
                        <h4 class="gift__success stock-vdr__center">
                            {{ source }}
                        </h4>
                    </div>
                </div>
                <div class="stock-vdr__flex">
                    <div class="form-group stock-vdr__box stock-vdr__center">
                        <label>Status</label>
                        <h4 class="gift__success stock-vdr__center">{{ getWalletTx.status }}</h4>
                    </div>
                    <div class="form-group stock-vdr__box stock-vdr__center">
                        <label>Reference No.</label>
                        <h4 class="gift__success stock-vdr__center">{{ getWalletTx.reference }}</h4>
                    </div>
                </div>
                <div class="stock-vdr__flex">
                    <div class="form-group stock-vdr__box stock-vdr__center">
                        <label>Date Opened</label>
                        <h4 class="gift__success stock-vdr__center">
                            {{ getWalletTx.createdAt || "-" | date }}
                        </h4>
                    </div>
                    <div class="form-group stock-vdr__box stock-vdr__center"></div>
                </div>
            </div>
            <div class="text-center">
                <button type="button" class="btn btn__primary--outline" @click="closeModal()">
                    Close
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    name: "wallet-success",
    computed: {
        ...mapGetters(["getWalletTx"]),
        source() {
            if (this.getWalletTx.source === "WALLET") return "Exchange";
            else if (this.getWalletTx.actionType === "CREDIT") return "Deposit";
            return "Withdrawal";
        }
    },
    methods: {
        ...mapMutations(["SET_WALLET_TX"]),
        closeModal() {
            this.$emit("close");
        }
    },
    beforeDestroy() {
        this.SET_WALLET_TX({});
    }
};
</script>
