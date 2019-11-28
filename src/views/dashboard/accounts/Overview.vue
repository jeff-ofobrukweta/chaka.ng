<template>
    <div>
        <section class="accounts__title">
            <h3>Overview</h3>
        </section>
        <section class="accounts-overview">
            <div class="accounts-overview__text">
                <img src="../../../assets/img/dp.png" alt="Avatar" class="avatar avatar-lg" />
            </div>
            <div class="accounts-overview__text">
                <p>Name</p>
                <h4>{{ username }}</h4>
            </div>
            <div class="accounts-overview__text">
                <p>User ID</p>
                <h4>{{ getLoggedUser.chakaID }}</h4>
            </div>
            <div class="accounts-overview__text">
                <p>Portfolio Value</p>
                <h4
                    class="cursor-context"
                    :title="getAccountSummary.netWorth | currency('NGN', true)"
                >
                    {{ getAccountSummary.netWorth | currency("NGN") }}
                </h4>
            </div>
            <div class="accounts-overview__text">
                <p>CSCS No.</p>
                <h4>{{ getLoggedUser.UserKYC.cscsNumber || "-" }}</h4>
            </div>
        </section>

        <section class="accounts-overview__cards">
            <Card title="Trading Status" class="accounts-overview__card">
                <div class="accounts-overview__flex">
                    <img
                        class="accounts-overview__symbol"
                        src="../../../assets/img/accounts-naira.svg"
                        alt="Naira"
                        width="16px"
                    />
                    <span class="accounts-overview__currency">Local</span>
                    <span class="accounts-overview__approved">{{
                        getLoggedUser.localKycStatus ? "Approved" : "Pending"
                    }}</span>
                    <img
                        v-if="getLoggedUser.localKycStatus"
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/checked.svg')"
                        alt="Checked"
                    />
                    <img
                        v-else
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/pending.svg')"
                        width="12px"
                        alt="Pending"
                    />
                </div>
                <div class="accounts-overview__flex">
                    <img
                        class="accounts-overview__symbol"
                        src="../../../assets/img/accounts-dollar.svg"
                        alt="Dollar"
                        width="16px"
                    />
                    <span class="accounts-overview__currency">Global</span>
                    <span class="accounts-overview__approved">{{
                        getLoggedUser.globalKycStatus ? "Approved" : "Pending"
                    }}</span>
                    <img
                        v-if="getLoggedUser.globalKycStatus"
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/checked.svg')"
                        alt="Checked"
                    />
                    <img
                        v-else
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/pending.svg')"
                        width="12px"
                        alt="Pending"
                    />
                </div>
            </Card>
            <Card
                title="Stamps Earned"
                :action="{ text: 'See All', link: 'accounts-stamps' }"
                class="accounts-overview__card"
            >
            </Card>
            <Card
                title="More Information"
                :action="{ text: 'Edit Profile', link: 'accounts-settings' }"
                class="accounts-overview__card"
            >
                <div class="accounts-overview__flex">
                    <span class="accounts-overview__currency">Email</span>
                    <span class="accounts-overview__approved">{{ getLoggedUser.email }}</span>
                </div>
                <div class="accounts-overview__flex">
                    <span class="accounts-overview__currency">Phone No</span>
                    <span class="accounts-overview__approved">{{
                        getLoggedUser.UserKYC.phone || "-"
                    }}</span>
                </div>
            </Card>
        </section>
    </div>
</template>

<script>
import Card from "../../../layouts/AccountsCard";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "accounts-overview",
    components: {
        Card
    },
    computed: {
        ...mapGetters(["getLoggedUser", "getAccountSummary"]),
        username() {
            return this.getLoggedUser.UserKYC.firstname
                ? `${this.getLoggedUser.UserKYC.firstname} ${this.getLoggedUser.UserKYC.lastname}`
                : "-";
        }
    },
    methods: {
        ...mapActions(["GET_ACCOUNT_SUMMARY"])
    },
    async mounted() {
        await this.GET_ACCOUNT_SUMMARY();
    }
};
</script>
