<template>
    <section class="table-accounts__box">
        <table class="table-accounts">
            <tbody class="table-accounts__tbody">
                <template v-if="type !== 'ORDER'">
                    <tr v-for="(item, index) in history" :key="index">
                        <td>{{ item.actionType }}</td>
                        <template v-if="type === 'TRANSFER'">
                            <td v-if="item.currency === 'NGN'">NGN - USD</td>
                            <td v-else>USD - NGN</td>
                        </template>
                        <td
                            class="cursor-context"
                            :title="
                                item.txAmount ||
                                    item.amountCash | kobo | currency(item.currency, true)
                            "
                        >
                            Amount:
                            {{ item.txAmount || item.amountCash | kobo | currency(item.currency) }}
                        </td>
                        <td>
                            Status:
                            <span
                                :class="{
                                    orange: item.status === 'PENDING' || item.status === 'QUEUED',
                                    green: item.status === 'SUCCESS' || item.status === 'FILLED',
                                    red: item.status === 'CANCELLED' || item.status === 'REJECTED'
                                }"
                                >{{ item.status }}</span
                            >
                        </td>
                        <td>{{ item.createdAt | date }}</td>
                        <td>{{ item.time }}</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(item, index) in history" :key="index">
                        <td>ORDER</td>
                        <td
                            class="cursor-context"
                            :title="
                                item.txAmount ||
                                    item.amountCash | kobo | currency(item.currency, true)
                            "
                        >
                            Amount:
                            {{ item.txAmount || item.amountCash | kobo | currency(item.currency) }}
                        </td>
                        <td>
                            Status:
                            <span
                                :class="{
                                    orange: item.status === 'PENDING' || item.status === 'QUEUED',
                                    green: item.status === 'SUCCESS' || item.status === 'FILLED',
                                    red: item.status === 'CANCELLED' || item.status === 'REJECTED'
                                }"
                                >{{ item.status }}</span
                            >
                        </td>
                        <td>{{ item.createdAt | date }}</td>
                        <td>{{ item.time }}</td>
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
