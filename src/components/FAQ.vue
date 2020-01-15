<template>
    <section class="section">
        <div v-if="entries.length > 0">
            <div class="section__list">
                <div class="section__list--item" v-for="(entry, i) in entries" :key="i">
                    <details class="details" ref="details">
                        <summary class="details__summary">{{ entry.gsx$question.$t }}</summary>
                        <div class="details__div" v-if="entry.gsx$answer.$t">
                            {{ entry.gsx$answer.$t }}
                        </div>
                        <div class="details__div" v-else>N/A</div>
                    </details>
                </div>
            </div>
        </div>

        <div v-else-if="showError">
            <img :src="require('../assets/img/caution.svg')" width="24" alt="Reload" /><br/>
            <a class="underline pointer" @click="getSheetJson">Reload</a>
        </div>

        <img :src="require('../assets/img/loader.gif')" width="24" alt="Loader" v-else />
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "FAQ",
    props: {
        topic: String
    },
    data() {
        return {
            entries: [],
            showError: false
        };
    },
    created() {
        this.getSheetJson();
    },
    methods: {
        getSheetJson() {
            this.showError = false;
            axios
                .get(
                    "https://spreadsheets.google.com/feeds/list/1Lr5utKlIAPT6840FwIjMvSwgQ1zZbCYGlM_g7BDoJ0Y/1/public/values?alt=json"
                )
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.posts = response.data.feed.entry;
                    if (this.topic) {
                        this.entries = this.posts.filter(el => el.gsx$topic.$t === this.topic);
                    } else {
                        this.entries = this.posts;
                    }
                })
                .catch(e => {
                    this.showError = e;
                });
            /* const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        'https://spreadsheets.google.com/feeds/list/1Lr5utKlIAPT6840FwIjMvSwgQ1zZbCYGlM_g7BDoJ0Y/1/public/values?alt=json'
      );
      xhr.onload = () => {
        let arr = JSON.parse(xhr.responseText);
        arr = arr.feed.entry;
        if (this.topic) {
          this.entries = arr.filter(el => el.gsx$topic.$t === this.topic);
        } else {
          this.entries = arr;
        }
      };
      xhr.send(); */
        }
    }
};
</script>

<style lang="scss" scoped>
.section {
    margin-bottom: 4em;
	&__list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&--item{
			margin-bottom: 1.825rem;
			flex: 0 0 100%;
			@include tablet{
				flex: 0 0 48%;
			margin-bottom: 3rem;
			}
		}
	}
}
.details {
    &__summary {
		font-weight: bold;
		transition: 500ms ease-in;
		cursor: pointer;
        & ~ * {
            animation: sweep 0.25s ease-in-out;
        }
        &:focus {
            outline: 1px solid transparent;
        }
        &::-webkit-details-marker {
            display: none;
        }
        display: block;
        &:before {
            border-radius: 5px;
            content: "+";
            font-size: 1.5em;
            margin: -10px 10px 0 0;
            padding: 0;
            text-align: center;
            width: 20px;
        }
    }
    &__div {
        padding-left: 2rem;
        font-size: 16px;
        opacity: 0.85;
    }
}
[open] {
    .details__summary {
		color: #2da5ec;
        & ~ * {
            animation: sweep 0.25s ease-in-out;
        }
        &:focus {
            outline: 1px solid transparent;
        }
        &::-webkit-details-marker {
            display: none;
        }
        &:before {
            border-radius: 5px;
            content: "-";
			color: #2da5ec;
            font-size: 1.5em;
            margin: -10px 10px 0 0;
            padding: 0;
            text-align: center;
            width: 20px;
        }
    }
}

@keyframes sweep {
    0% {
        opacity: 0;
        margin-left: -10px;
    }
    100% {
        opacity: 1;
        margin-left: 0px;
    }
}

.div {
    &__btn {
        display: flex;
        justify-content: space-between;
    }
}
</style>
