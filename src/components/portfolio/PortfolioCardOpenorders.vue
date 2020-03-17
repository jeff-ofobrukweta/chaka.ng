<template>
    <div
        v-if="getPortfoliopositionsCarddetails.positions"
        class="portfolio-card"
        @click="toDetailsPage('open-orders')"
    >
        <div class="portfolio-card__img">
            <!-- <img :src="require(`../../assets/img/portfolio3.svg`)" alt="Portfolio Icon" /> -->
        </div>
        <h2 class="cursor-context">
            {{ getPortfoliopositionsCarddetails.positions.open.orders.length }}
        </h2>
        <p class="portfolio-card__title">Total Open Orders</p>
        <section class="table-section">
            <table
                v-if="getPortfoliopositionsCarddetails.positions.open.orders.length > 0"
                class="portfolio-card__table"
            >
                <tr
                    v-for="(stock,
                    index) in getPortfoliopositionsCarddetails.positions.open.orders.slice(0, 3)"
                    :key="index"
                    class="portfolio-card__tr"
                >
                    <td
                        class="portfolio-card__tr--left capitalize cursor-context"
                        :title="stock.name"
                    >
                        {{ stock.symbol | truncate(6) }}
                    </td>
                    <td
                        class="portfolio-card__tr--right cursor-context"
                        :title="stock.quantity | units(4, true)"
                    >
                        {{ stock.quantity | units(2) }}
                    </td>
                    &nbsp;
                    <td
                        class="portfolio-card__tr--right cursor-context"
                        :title="stock.netCost | kobo | currency(stock.currency, true)"
                    >
                        {{ stock.netCost | kobo | currency(stock.currency) }}
                    </td>
                </tr>
            </table>
        </section>
        <div class="btn-viewmore">
            <section
                :title="'click to view details'"
                @click="toDetailsPage('open-orders')"
                @mouseover="hover = true"
                @mouseleave="hover = false"
            >
                <template v-if="hover">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 31.49 31.49"
                        style="enable-background:new 0 0 31.49 31.49;"
                        xml:space="preserve"
                        width="40px"
                        height="40px"
                    >
                        <g>
                            <path
                                d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"
                                data-original="#1E201D"
                                class="active-path"
                                data-old_color="#1E201D"
                                fill="#FFFFFF"
                            />
                        </g>
                    </svg>
                </template>
                <template v-else>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 31.49 31.49"
                        style="enable-background:new 0 0 31.49 31.49;"
                        xml:space="preserve"
                        width="40px"
                        height="40px"
                    >
                        <g>
                            <path
                                d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"
                                data-original="#1E201D"
                                class="active-path"
                                data-old_color="#1E201D"
                                fill="#575756"
                            />
                        </g>
                    </svg>
                </template>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'portfolio-card',
    data() {
        return {
            hover: false
        };
    },
    computed: {
        ...mapGetters(['getPortfoliopositionsCarddetails'])
    },
    methods: {
        toDetailsPage(type) {
            this.$router.push({ name: 'portfolio-details', params: { type } });
        }
    }
};
</script>
