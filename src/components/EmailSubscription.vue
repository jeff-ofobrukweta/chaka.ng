<template>
  <section class="section subscribe">
    <div class="container">
      <div class="row hero__row">
        <div class="col-md-7 subscribe__body" data-aos="fade-right">
          <h2>Stay up to date with news and new features</h2>
          <p
            class="section__text"
          >Join Chaka's mailing list and get updates on Chaka's new features. Also keep track of the latest news, trends and developments in local and global investment markets.</p>
        </div>
        <div class="col-md-5 subscribe__text">
          <form
            action="https://chaka.us20.list-manage.com/subscribe/post?u=3e738663e9ef19ff1ace10d97&amp;id=516765cbc1"
            v-if="!subscribed"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate subscribe__form"
            target="_blank"
            ref="subscribe"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <div>
                <input
                  type="email"
                  name="EMAIL"
                  id="email"
                  v-model="email"
                  placeholder="Enter your email address"
                  class="input-controlled-input-main-item-input subscribe__input"
                />
              </div>
              <div>
                <input
                  @click.passive="subscribe"
                  id="controlled-input-button"
                  class="input-controlled-input-main-item subscribe__btn"
                  value="I want to stay informed"
                  :disabled="!email"
                />
              </div>
            </div>
          </form>
          <div class="subscribe__form" v-else>
            <p class="subscribe__text">Thank you for subscribing.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: 'email-subscription',
  data() {
    return {
      subscribed: false,
      email: null,
    };
  },
  methods: {
    subscribe() {
      this.$refs.subscribe.submit();
      this.subscribed = true;
    },
  },
};
</script>
