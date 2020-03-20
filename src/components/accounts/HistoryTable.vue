<template>
    <section class="table-accounts__box">
        <table class="table-accounts">
            <thead class="table-accounts__thead">
                <th>Status</th>
                <th>Amount</th>
                <th v-if="type === 'CREDIT'">Payment Method</th>
                <th v-else-if="type === 'ORDER'">Fees</th>
                <th v-else-if="type === 'ALL'">Type</th>
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
                        <template v-if="type === 'ALL'">
                            <td>{{ actionType(item.actionType) }}</td>
                        </template>
                        <template v-else-if="type === 'CREDIT'">
                            <td>{{ item.source | capitalize }}</td>
                        </template>
                        <td>{{ item.createdAt | date }}</td>
                        <td>{{ item.createdAt | time(true) }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(item, index) in history" :key="index">
                        <td>
                            <span>{{ item.status | capitalize }}</span>
                        </td>
                        <td class="cursor-context" :title="item.txAmount || item.amountCash | kobo | currency(item.currency, true)">
                            {{ item.txAmount || item.amountCash | kobo | currency(item.currency, true) }}
                        </td>
                        <td>{{ item.orderDetails.chargeCash | kobo | currency(item.currency, true) }}</td>
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
    name: "table-accounts",
    props: {
        history: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        actionType(value) {
            if (value === "CREDIT") return "Deposit";
            if (value === "DEBIT") return "Withdrawal";
            return "Order";
        }
    }
};
</script>
