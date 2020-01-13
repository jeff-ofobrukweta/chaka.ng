
<template>
	<section class="section" :class="{'section--centered': isCentered}">
		<div class="container">
			<h6 class="section__caption">Questions frequently asked by our visitors</h6>
			 
		</div>

		<div v-if="entries.length > 0">
			<ul class="section__list" :class="extraClass">
				<li class="section__list-item" v-for="(entry, i) in entries" :key="i">
					<details class="details" ref="details">
						<summary class="auth-form__title">{{entry.gsx$question.$t}}</summary>
						<div class="details__div" v-if="entry.gsx$answer.$t">{{entry.gsx$answer.$t}}</div>
						<div class="details__div" v-else>N/A</div>
					</details>
				</li>
			</ul>
		</div>

		<img id="status" src="../assets/img/loader.gif" width="24" alt="Loader" v-else />
        <h6 id="status-text" class="section__caption"></h6>
	</section>
</template>

<script> 
 
import  axios from 'axios';

export default {
  name: 'FAQ',
  props: {
    topic: String
  },
  data() {
    return {
      extraClass: '',
      isCentered: false,
      entries: [],
      paginate: ['entries']
    };
  },
  mounted() {
    this.isCentered = !this.$route.path.includes('accounts/faq');
    if (this.$route.path.includes('accounts/faq')) {
      this.extraClass = 'section__list--left';
    } else if (this.$route.path.includes('dashboard')) {
      this.extraClass = 'section__list--wide';
    }
  },
  created() {
    this.getSheetJson();
  },
  methods: {
    getSheetJson() {
        axios.get('https://spreadsheets.google.com/feeds/list/1Lr5utKlIAPT6840FwIjMvSwgQ1zZbCYGlM_g7BDoJ0Y/1/public/values?alt=json')
             .then(response => {
      // JSON responses are automatically parsed.
         debugger
      this.posts = response.data.feed.entry
      if (this.topic) {
          this.entries = this.posts.filter(el => el.gsx$topic.$t === this.topic);
        } else {
          this.entries = this.posts;
        }
    })
    .catch(e => {
        debugger
        document.getElementById("status-text").innerText = e;
        document.getElementById("status").src('../assets/img/caution.svg');
     // this.errors.push(e)
    })
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
}
.details {
	&__summary {
		& ~ * {
			animation: sweep 0.5s ease-in-out;
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
			content: '+';
			color: #2da5ec;
			float: left;
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
		& ~ * {
			animation: sweep 0.5s ease-in-out;
		}
		&:focus {
			outline: 1px solid transparent;
		}
		&::-webkit-details-marker {
			display: none;
		}
		&:before {
			border-radius: 5px;
			content: '-';
			color: #2da5ec;
			float: left;
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
