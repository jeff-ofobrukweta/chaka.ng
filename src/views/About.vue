<template>
    <main class="main" role="main">
        <div class="container">
            <h2 class="hero__title about-title">About Us</h2>
        </div>

        <section class="about-started">
            <div class="container">
                <div class="about-started__title">
                    <h4>How It Started</h4>
                </div>
                <div class="about-started__text">
                    <p>
                        We started Chaka to remove global investment barriers between Africa and the
                        rest of the world making it easier to access opportunities at home and
                        abroad We believe that Africans should have ample opportunities to travel,
                        trade and invest around the world. We also believe it should be easier for
                        the world to trade and invest in Africa.
                    </p>
                    <br />
                    <p>
                        We’ve got a talented and passionate team of engineers, stockbrokers &amp;
                        financial professionals working to make this a reality.
                    </p>
                </div>
            </div>
        </section>

        <section class="about-careers">
            <div class="container">
                <div class="about-careers__title">
                    <h4>Careers</h4>
                </div>
                <div class="about-careers__text">
                    <p>
                        Interested in joining our mission? Email your GitHub, LinkedIn profile or
                        resume to<br />
                        <a class="underline" href="mailto:careers@chaka.ng">careers@chaka.ng.</a>
                    </p>
                </div>
            </div>
        </section>

        <email-subscribe />
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
        document.getElementsByTagName('meta').keywords.content = 'nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse';
        document.getElementsByTagName('meta').description.content = 'We started Chaka to remove global investment barriers for Nigerians and make it easy to access opportunities at home and abroad';
        // document.getElementsByTagName('meta')['og:title'].content = 'Chaka - About Us';
        // document.getElementsByTagName('meta')['og:description'].content =
        // 	'We started Chaka to remove global investment barriers for Nigerians and make it easy to access opportunities at home and abroad';
        // mixpanel.track("ABOUT_PAGE") //tracks the aboutpage
    }
};
</script>
