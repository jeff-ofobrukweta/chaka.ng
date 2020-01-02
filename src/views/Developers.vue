<template>
	<main class="main" role="main">
		<section class="section hero">
			<div class="container">
				<div class="row">
					<div class="col-md-5 hero__body">
						<div>
							<h2 class="hero__title">Integrate Chaka into your application, service or workflow</h2>
							<p
								class="hero__text"
							>To use Chaka’s API and integrate with a wide selection of capital market tools, reach out to us</p>
						 
						</div>
					</div>
					<div class="col-md-7">
						<div class="hero__img">
							<picture>
								<source media="(max-width: 640px)" srcset="../assets/img/code-mobile.png" />
								<img src="../assets/img/code.png" alt />
							</picture>
						</div>
					</div>
				</div>
			</div>
		</section> 

		<section class="section section--pad">
			<div class="container">
				<div class="row">
					<div class="col-md-4">
						<aside class="section__side">
							<div class="section__media">
								<img src="../assets/img/ad.png" alt />
							</div>
							<div class="section__logo-banner">
								<img src="../assets/img/logo-large.svg" alt />
								<a href="mailto:support@chaka.ng">support@chaka.ng</a>
							</div>
						</aside>
					</div>
					<div class="col-md-8">
						<form class action>
							<div class="form__header form__header--left">
								<h3 class="form__title">Send us a message</h3>
							</div>
							<div class="form-row">
								<div class="form-group col-md-6">
									<label for="name">Full Name</label>
									<input type="text" class="form-control" id="name" placeholder />
								</div>
								<div class="form-group col-md-6">
									<label for="email">Your email</label>
									<input type="email" class="form-control" id="email" placeholder />
								</div>
							</div>
							<div class="form-group">
								<label for="subject">Subject</label>
								<input type="text" class="form-control" id="subject" placeholder />
							</div>
							<div class="form-group">
								<label for="message"></label>
								<textarea
									class="form-control"
									name="message"
									id="message"
									cols="30"
									rows="10"
									placeholder="Message"
								></textarea>
							</div>
							<button class="btn btn__grey btn--wide">SEND A MESSAGE</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Developers',
	mounted() {
		document.title = 'Chaka - Developers';
		document.getElementsByTagName('meta')['keywords'].content =
			'nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse';
		document.getElementsByTagName('meta')['description'].content =
			'Integrate Chaka into your application, service or workflow';
		// document.getElementsByTagName('meta')['og:title'].content = 'Chaka - Developers';
		// document.getElementsByTagName('meta')['og:description'].content =
		// 	'Integrate Chaka into your application, service or workflow';
	}
};
</script>
