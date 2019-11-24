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
                <h4>Jane Doe</h4>
            </div>
            <div class="accounts-overview__text">
                <p>User ID</p>
                <h4>137489739</h4>
            </div>
            <div class="accounts-overview__text">
                <p>Portfolio Value</p>
                <h4 class="cursor-context" :title="2454622.33 | currency('NGN', true)">
                    {{ 2454622.33 | currency("NGN") }}
                </h4>
            </div>
            <div class="accounts-overview__text">
                <p>CSCS No.</p>
                <h4>72957295</h4>
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
                    <span class="accounts-overview__approved">Approved</span>
                    <img
                        class="accounts-overview__approved--img"
                        src="../../../assets/img/checked.svg"
                        alt="Checked"
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
                    <span class="accounts-overview__approved">Approved</span>
                    <img
                        class="accounts-overview__approved--img"
                        src="../../../assets/img/checked.svg"
                        alt="Checked"
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
                    <span class="accounts-overview__approved">jane@doe.com</span>
                </div>
                <div class="accounts-overview__flex">
                    <span class="accounts-overview__currency">Phone No</span>
                    <span class="accounts-overview__approved">0901284928</span>
                </div>
            </Card>
        </section>
    </div>
</template>

<script>
import Card from "../../../layouts/AccountsCard";

export default {
    name: "accounts-overview",
    components: {
        Card
    }
};
</script>
