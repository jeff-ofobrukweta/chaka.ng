<template>
    <div class="watchlist-explore">
        <div class="watchlist-explore__name">
            <img height="34px" src="../../assets/img/icons/GOOGLE.png" alt="Google" />
            <img
                src="../../assets/img/flags/us-flag.svg"
                class="watchlist-explore__symbol"
                alt="US"
                width="24px"
            />
        </div>
        <div class="watchlist-explore__flex">
            <p class="light"><strong>GOOGL</strong></p>
            <p><strong>Google Inc.</strong></p>
        </div>
        <div class="watchlist-explore__flex">
            <p
                class="watchlist-explore__change"
                :class="[instrument.change >= 0 ? 'green' : 'red']"
            >
                <img
                    src="../../assets/img/green-arrow.svg"
                    v-if="instrument.change >= 0"
                    alt="Gain"
                />
                <img src="../../assets/img/red-arrow.svg" v-else alt="Loss" />
                <small
                    >{{ instrument.change >= 0 ? "+" : "" }}{{ instrument.change | units(2) }} ({{
                        instrument.percent | units(2)
                    }}%)</small
                >
            </p>
            <p>
                <strong>{{ instrument.price | currency(instrument.currency) }}</strong>
            </p>
        </div>
        <div class="watchlist-explore__graph">
            SPARKLINES
        </div>
        <div class="watchlist-explore__actions">
            <button>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="24" height="24" rx="6" fill="white" />
                    <g clip-path="url(#clip0)">
                        <path
                            d="M12 7.3125C8.875 7.3125 6.20625 9.25625 5.125 12C6.20625 14.7438 8.875 16.6875 12 16.6875C15.125 16.6875 17.7937 14.7438 18.875 12C17.7937 9.25625 15.125 7.3125 12 7.3125ZM12 15.125C10.275 15.125 8.875 13.725 8.875 12C8.875 10.275 10.275 8.875 12 8.875C13.725 8.875 15.125 10.275 15.125 12C15.125 13.725 13.725 15.125 12 15.125ZM12 10.125C10.9625 10.125 10.125 10.9625 10.125 12C10.125 13.0375 10.9625 13.875 12 13.875C13.0375 13.875 13.875 13.0375 13.875 12C13.875 10.9625 13.0375 10.125 12 10.125Z"
                            fill="#CECECE"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect
                                width="15"
                                height="15"
                                fill="white"
                                transform="translate(4.5 5.25)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <button>+&nbsp;Buy</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "explore-watchlist",
    props: {
        instrument: {
            type: Object,
            required: true
        }
    }
};
</script>
