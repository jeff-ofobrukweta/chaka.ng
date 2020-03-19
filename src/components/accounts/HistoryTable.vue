<template>
    <section class="table-accounts__box">
        <table class="table-accounts">
            <thead v-if="type === 'CREDIT'" class="table-accounts__thead">
                <th>Status</th>
                <th>Amount</th>
                <!-- <th>Fees</th> -->
                <th>Payment Method</th>
                <th>Date</th>
                <th>Time</th>
            </thead>
            <thead v-else class="table-accounts__thead">
                <th>Status</th>
                <th>Amount</th>
                <!-- <th>Fees</th> -->
                <th>Date</th>
                <th>Time</th>
            </thead>
            <tbody class="table-accounts__tbody">
                <template v-if="type !== 'ORDER'">
                    <tr v-for="(item, index) in history" :key="index">
                        <td>
                            <span>{{ item.status | capitalize }}</span>
                        </td>
                        <td class="cursor-context" :title="item.txAmount || item.amountCash | kobo | currency(item.currency, true)">
                            {{ item.txAmount || item.amountCash | kobo | currency(item.currency, true) }}
                        </td>
                        <!-- <td>{{ item.actionType }}</td> -->
                        <template v-if="type === 'TRANSFER'">
                            <td v-if="item.currency === 'NGN'">NGN - USD</td>
                            <td v-else>USD - NGN</td>
                        </template>
                        <template v-if="type === 'CREDIT'">
                            <td>{{ item.source | capitalize }}</td>
                        </template>
                        <td>{{ item.createdAt | date }}</td>
                        <td>{{ item.createdAt | time(true) }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(item, index) in history" :key="index">
                        <!-- <td>ORDER</td> -->
                        <td>
                            <span>{{ item.status | capitalize }}</span>
                        </td>
                        <td class="cursor-context" :title="item.txAmount || item.amountCash | kobo | currency(item.currency, true)">
                            {{ item.txAmount || item.amountCash | kobo | currency(item.currency, true) }}
                        </td>
                        <td>{{ item.createdAt | date }}</td>
                        <td>{{ item.createdAt | time(true) }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </section>
</template>

<script>
export default {
    name: 'table-accounts',
    props: {
        history: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }
};
</script>
