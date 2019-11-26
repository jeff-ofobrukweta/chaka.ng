<template>
    <div class="watchlist-mobile">
        <div class="watchlist-mobile__top">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="15"
                    rx="3.5"
                    fill="white"
                    stroke="#2DA5EC"
                />
                <g clip-path="url(#clip0)">
                    <path
                        d="M7.99999 4.875C5.91666 4.875 4.13749 6.17083 3.41666 8C4.13749 9.82917 5.91666 11.125 7.99999 11.125C10.0833 11.125 11.8625 9.82917 12.5833 8C11.8625 6.17083 10.0833 4.875 7.99999 4.875ZM7.99999 10.0833C6.84999 10.0833 5.91666 9.15 5.91666 8C5.91666 6.85 6.84999 5.91667 7.99999 5.91667C9.14999 5.91667 10.0833 6.85 10.0833 8C10.0833 9.15 9.14999 10.0833 7.99999 10.0833ZM7.99999 6.75C7.30832 6.75 6.74999 7.30833 6.74999 8C6.74999 8.69167 7.30832 9.25 7.99999 9.25C8.69166 9.25 9.24999 8.69167 9.24999 8C9.24999 7.30833 8.69166 6.75 7.99999 6.75Z"
                        fill="#2DA5EC"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="10" height="10" fill="white" transform="translate(3 3.5)" />
                    </clipPath>
                </defs>
            </svg>

            <div>
                <a class="watchlist-mobile__buy" @click="showBuy = true">+ Buy</a>
            </div>
        </div>
        <div class="watchlist-mobile__bottom">
            <div class="watchlist-mobile__left">
                <img
                    class="watchlist-mobile__logo"
                    src="../../assets/img/icons/GOOGLE.png"
                    alt="Google"
                />
                <div>
                    <p class="watchlist-mobile__name capitalize">
                        {{ instrument.name | truncate(50) }}
                    </p>
                    <p class="watchlist-mobile__shares">2 Shares</p>
                </div>
            </div>
            <div class="watchlist-mobile__right">
                <p
                    class="watchlist-mobile__change"
                    :class="[instrument.change >= 0 ? 'green' : 'red']"
                >
                    <img
                        v-if="instrument.change >= 0"
                        src="../../assets/img/watchlist-up.svg"
                        alt="Growth"
                    />
                    <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                    <span>{{ instrument.change >= 0 ? "+" : "" }}</span>
                    <small
                        >{{ instrument.change | units(2) }} ({{
                            instrument.percent | units(2)
                        }}%)</small
                    >
                </p>
                <p class="watchlist-mobile__price">
                    <img src="../../assets/img/flags/us-flag.svg" alt="US" /><span>|</span>
                    <strong
                        class="cursor-context"
                        :title="instrument.price | currency(instrument.currency, true)"
                        >{{ instrument.price | currency(instrument.currency) }}</strong
                    >
                </p>
            </div>
        </div>
        <buy-modal
            @close="showBuy = false"
            :currency="instrument.currency"
            :symbol="instrument.symbol"
            :instrument="instrument"
            v-if="showBuy"
        />
    </div>
</template>

<script>
export default {
    name: "watchlist-card",
    props: {
        instrument: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showBuy: false
        };
    }
};
</script>
