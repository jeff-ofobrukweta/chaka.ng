<template>
    <div class="accounts-card">
        <div class="accounts-card__action">
            <div class="accounts-card__logo">
                <div>
                    <img v-if="card.cardType.startsWith('master')" :src="require('../../assets/img/mastercard.svg')" alt="Master card" />
                    <img v-else-if="card.cardType.startsWith('visa')" :src="require('../../assets/img/visa.png')" alt="Visa" />
                    <img v-else-if="card.cardType.startsWith('verve')" :src="require('../../assets/img/verve.png')" alt="Visa" />
                    <img v-else :src="require('../../assets/img/credit-card.svg')" alt="Verve" />
                </div>
                <img v-if="loading" :src="require('../../assets/img/loader.gif')" class="loading" alt="Loading" width="14px" height="14px" />
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" v-else @click="deleteCard(card.id)">
                    <line x1="36.8593" y1="37.5664" x2="12.1106" y2="12.8177" stroke="white" />
                    <line x1="37.5664" y1="12.8179" x2="12.8177" y2="37.5666" stroke="white" />
                </svg>
            </div>
        </div>
        <div class="accounts-card__number">
            <p>{{ card.bank || "Bank" }}</p>
            <p>**** **** **** {{ card.lastFourDigits }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "bank-card",
    props: ["card"],
    data() {
        return {
            loading: false
        };
    },
    methods: {
        ...mapActions(["DELETE_USER_CARDS"]),
        async deleteCard() {
            this.loading = true;
            await this.DELETE_USER_CARDS(this.card.id);
            // setTimeout(() => {
            this.loading = false;
            // }, 3000);
        }
    }
};
</script>
