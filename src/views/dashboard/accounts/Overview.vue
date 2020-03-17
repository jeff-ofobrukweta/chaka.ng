<template>
    <div>
        <section class="accounts__title">
            <h3>Overview</h3>
        </section>
        <section class="accounts-overview">
            <!-- TO-DO :: Put back when Profile image is ready -->
            <!-- <div class="accounts-overview__text">
                <img src="../../../assets/img/dp.png" alt="Avatar" class="avatar avatar-lg" />
            </div> -->
            <div class="accounts-overview__text">
                <p>Name</p>
                <h4>{{ username }}</h4>
            </div>
            <div class="accounts-overview__text">
                <p>Chaka ID</p>
                <h4>{{ getLoggedUser.chakaID }}</h4>
            </div>
            <div class="accounts-overview__text">
                <p>Total Value</p>
                <h4 class="cursor-context">
                    {{ getAccountSummary.netWorth | kobo | currency("NGN", true) }}
                </h4>
            </div>
            <div class="accounts-overview__text">
                <template v-if="getLoggedUser.UserKYC">
                    <template v-if="getLoggedUser.UserKYC.cscsNumber">
                        <p>CSCS No.</p>
                        <h4>{{ getLoggedUser.UserKYC.cscsNumber }}</h4>
                    </template>
                </template>
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
                    <span class="accounts-overview__approved">{{ localStatus }}</span>
                    <img
                        v-if="getLoggedUser.localKycStatus === 'COMPLETE'"
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/checked.svg')"
                        alt="Checked"
                    />
                    <img
                        v-else-if="getLoggedUser.localKycStatus === 'PENDING'"
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/pending.svg')"
                        width="12px"
                        alt="Pending"
                    />
                    <img
                        v-else
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/kyc-incomplete.svg')"
                        width="12px"
                        alt="Incomplete"
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
                    <span class="accounts-overview__approved">{{ globalStatus }}</span>
                    <img
                        v-if="getLoggedUser.globalKycStatus === 'COMPLETE'"
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/checked.svg')"
                        alt="Checked"
                    />
                    <img
                        v-else-if="getLoggedUser.globalKycStatus === 'PENDING'"
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/pending.svg')"
                        width="12px"
                        alt="Pending"
                    />
                    <img
                        v-else
                        class="accounts-overview__approved--img"
                        :src="require('../../../assets/img/kyc-incomplete.svg')"
                        width="12px"
                        alt="Incomplete"
                    />
                </div>
            </Card>
            <!-- TO-DO:: Put back when Ownership is ready -->
            <!-- <Card
                title="Ownerships"
                :action="{ text: 'See All', link: 'accounts-stamps' }"
                class="accounts-overview__card"
            >
            </Card> -->
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
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'accounts-overview',
    components: {
        Card: () => import('../../../layouts/AccountsCard')
    },
    computed: {
        ...mapGetters(['getLoggedUser', 'getAccountSummary']),
        username() {
            if (this.getLoggedUser.UserKYC) {
                if (this.getLoggedUser.UserKYC.firstname) {
                    return this.getLoggedUser.UserKYC
                        ? `${this.getLoggedUser.UserKYC.firstname} ${this.getLoggedUser.UserKYC.lastname}`
                        : '-';
                }
            }
            return '-';
        },
        localStatus() {
            if (this.getLoggedUser.localKycStatus === 'COMPLETE') return 'Approved';
            if (this.getLoggedUser.localKycStatus === 'PENDING') return 'Pending';
            return 'Incomplete';
        },
        globalStatus() {
            if (this.getLoggedUser.globalKycStatus === 'COMPLETE') return 'Approved';
            if (this.getLoggedUser.globalKycStatus === 'PENDING') return 'Pending';
            return 'Incomplete';
        }
    },
    methods: {
        ...mapActions(['GET_ACCOUNT_SUMMARY', 'GET_LOGGED_USER'])
    },
    async mounted() {
        await Promise.all([this.GET_LOGGED_USER(), this.GET_ACCOUNT_SUMMARY()]);
    }
};
</script>
