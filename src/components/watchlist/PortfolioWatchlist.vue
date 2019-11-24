<template>
    <div class="watchlist-portfolio__card" :class="color">
        <div class="watchlist-portfolio__left">
            <p class="watchlist-portfolio__name capitalize">{{ instrument.name }}</p>
            <p class="watchlist-portfolio__change">
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
            <p>
                <strong
                    class="cursor-context"
                    :title="instrument.price | currency(instrument.currency, true)"
                    >{{ instrument.price | currency(instrument.currency) }}</strong
                >
            </p>
        </div>
        <div class="watchlist-portfolio__right">
            <div>
                <img src="../../assets/img/watch-open.svg" alt="Watch" />
            </div>
            <div>
                <a class="watchlist-portfolio__buy">+ Buy</a>
            </div>
        </div>
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
    computed: {
        color() {
            if (this.instrument.change > 3) return "dark-green";
            if (this.instrument.change > 2) return "green";
            if (this.instrument.change >= 0) return "light-green";
            if (this.instrument.change >= -1) return "light-red";
            if (this.instrument.change >= -2) return "red";
            return "dark-red";
        }
    }
};
</script>
