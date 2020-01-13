<template>
	<main class="main" role="main">
         <div class="app-body">
            <h2 class="app-body__title">About Chaka</h2>
		<section class="section hero hero--dark hero--dark-alt">
			<div class="container">
				<div class="hero__body hero__body--centered"> 
					<p>We reduce barriers</p>
				</div>
			</div>
		</section>

		<section class="section section--centered">
			<div class="container">
				<h6 class="section__caption">How It Started</h6>
				<!-- <h2 class="section__title">Our History</h2> -->
				<div class="section__body section__body--sm">
					<!-- <h5 class="section__body-primary">Just over a 2 years ago we started an online stock trading platform for people in Nigeria to be able to trade in stocks directly with their favourite companies abroad.</h5> -->
					<p>We started Chaka to remove global investment barriers between Africa and the rest of the world making it easier to access opportunities at home and abroad. We believe that Africans should have ample opportunities to travel, trade and invest around the world. We also believe it should be easier for the world to trade and invest in Africa.</p>
					<p>We’ve got a talented and passionate team of engineers, stockbrokers &amp; financial professionals working to make this a reality.</p>
				</div>
			</div>
		</section> 

		<section class="section section--centered">
			<div class="container">
				<h6 class="section__caption">JOIN CHAKA</h6>
				<h2 class="section__title">Careers</h2>
				<div class="section__body">
					<p>
						Interested in joining our mission? Email your GitHub, LinkedIn profile or resume to
						<a
							class="link__underline"
							href="mailto:careers@chaka.ng"
						>careers@chaka.ng.</a>
					</p> 
				</div>
			</div>
		</section>

		<email-subscribe />
         </div>
	</main>
</template>

<script>

export default {
	name: 'About',
	components: {
		EmailSubscribe: () => import('../components/EmailSubscription')
	},
	mounted() {
		document.title = 'Chaka - About Us';
		document.getElementsByTagName('meta')['keywords'].content =
			'nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse';
		document.getElementsByTagName('meta')['description'].content =
			'We started Chaka to remove global investment barriers for Nigerians and make it easy to access opportunities at home and abroad';
		// document.getElementsByTagName('meta')['og:title'].content = 'Chaka - About Us';
		// document.getElementsByTagName('meta')['og:description'].content =
		// 	'We started Chaka to remove global investment barriers for Nigerians and make it easy to access opportunities at home and abroad';
	}
};
</script>