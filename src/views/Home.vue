<template>
  <main class="main" role="main">
    <section class="v2-landing">
      <div class="container v2-landing__vector">
        <span class="v2-landing__vector--span">
          <img
            src="../assets/img/landing-vector.svg"
            :data-srcset="require('../assets/img/landing-vector.svg')"
            class="v2-landing__vector--img"
            alt="Landing Vector"
          />
        </span>
      </div>
      <div class="container">
        <div class="row">
          <div class="v2-landing__text">
            <div>
              <div class="v2-width__md" data-aos="fade">
                <h5 class="section__caption">We Give You Access to 40+ Countries</h5>
                <h1 class="hero__title">Your Investment Passport.</h1>
                <p
                  class="hero__text"
                >Own Local and Global Companies - Apple, GTBank, Google, Dangote Cement, Alibaba, Manchester United and thousands more of your favourite companies right from your phone.</p>
              </div>
              <!-- <div
								v-if="message || getErrorLog.type === 'register'"
								class="alert"
								:class="{
								'alert-success' : getStatus === 'success', 
								'alert-danger' : getErrorLog.type === 'register' }"
								role="alert"
              >{{ message || getErrorLog.message}}</div>-->
              <div
                v-if="Object.keys(errors).length > 0"
                class="alert alert-danger"
                role="alert"
              >{{ Object.values(errors)[0]}}</div>
              <form class="v2-landing__form v2-layer__signup" @submit.prevent="create">
                <input
                  class="v2-landing__input"
                  v-model="itemData.email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  @focus="clearErrors($event.target.name)"
                />
                <input
                  class="v2-landing__input"
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  v-model="itemData.password"
                  required
                  @focus="clearErrors($event.target.name)"
                />
                <button
                  :to="{ name: 'register' }"
                  class="v2-btn v2-btn__primary v2-landing__btn"
                  type="submit"
                >
                  Get Started
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.8009 5.51985V4.05865L0.342752 4.05865C0.162356 4.05865 0 3.91433 0 3.71589V2.14646C0 1.96606 0.144317 1.8037 0.342752 1.8037L6.8009 1.8037V0.342503C6.8009 0.0719098 7.10757 -0.0904461 7.34209 0.0538701L9.14604 1.2986L11.0763 2.63352C11.2747 2.77784 11.2747 3.06647 11.0763 3.19275L9.14604 4.56375L7.34209 5.80848C7.10757 5.9528 6.8009 5.79044 6.8009 5.51985Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </form>
              <div class="v2-landing__stocks">
                <h5 class="section__caption">Featured In</h5>
                <div class="v2-landing__news">
                  <a
                    href="https://www.youtube.com/watch?v=ctLC7hWFtBM"
                    target="_blank"
                    class="v2-landing__news--link"
                    data-aos="fade-up"
                  >
                    <img
                      class="v2-landing__news--img"
                      src="../assets/img/news/channels.png"
                      alt="Channels"
                    />
                  </a>
                  <a
                    href="https://finance.yahoo.com/news/drivewealth-partners-chaka-global-trading-110000678.html"
                    target="_blank"
                    class="v2-landing__news--link"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    <img
                      class="v2-landing__news--img"
                      src="../assets/img/news/yahoo.png"
                      alt="Yahoo Finance"
                    />
                  </a>
                  <a
                    href="https://www.marketwatch.com/press-release/drivewealth-partners-with-chaka-new-global-trading-platform-in-nigeria-to-increase-access-to-us-stock-market-2019-10-16"
                    target="_blank"
                    class="v2-landing__news--link"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <img
                      class="v2-landing__news--img"
                      src="../assets/img/news/market-watch.png"
                      alt="Maket-Watch"
                    />
                  </a>
                  <a
                    href="https://businessday.ng/interview/article/our-goal-is-to-provide-borderless-trading-investment-opportunities/"
                    target="_blank"
                    class="v2-landing__news--link"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    <img
                      class="v2-landing__news--img"
                      src="../assets/img/news/business-day.png"
                      alt="Business Day"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="v2-landing__image-box">
            <img
              data-sizes="auto"
              :data-src="require('../assets/img/landing-phone.png')"
              :data-srcset="require('../assets/img/landing-phone.png')"
              data-aos="fade-right"
              class="lazyload v2-landing__phone"
              alt="Landing Phone"
            />
            <img
              data-sizes="auto"
              :data-src="require('../assets/img/landing-desktop.png')"
              :data-srcset="require('../assets/img/landing-desktop.png')"
              data-aos="fade-left"
              class="lazyload v2-landing__desktop"
              alt="Landing Desktop"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section v2-layer">
      <div class="container">
        <div class="row v2-layer__featured">
          <div class="v2-layer__column">
            <div class="v2-layer__stocks v2-layer__stocks--hide">
              <h5 class="section__caption">Featured In</h5>
              <div class="v2-layer__news">
                <a
                  href="https://www.youtube.com/watch?v=ctLC7hWFtBM"
                  target="_blank"
                  class="v2-layer__news--link"
                  data-aos="fade-up"
                >
                  <img
                    class="v2-layer__news--img"
                    src="../assets/img/news/channels.png"
                    alt="Channels"
                  />
                </a>
                <a
                  href="https://finance.yahoo.com/news/drivewealth-partners-chaka-global-trading-110000678.html"
                  target="_blank"
                  class="v2-layer__news--link"
                  data-aos="fade-up"
                  data-aos-delay="270"
                >
                  <img
                    class="v2-layer__news--img"
                    src="../assets/img/news/yahoo.png"
                    alt="Yahoo Finance"
                  />
                </a>
                <a
                  href="https://www.marketwatch.com/press-release/drivewealth-partners-with-chaka-new-global-trading-platform-in-nigeria-to-increase-access-to-us-stock-market-2019-10-16"
                  target="_blank"
                  class="v2-layer__news--link"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <img
                    class="v2-layer__news--img"
                    src="../assets/img/news/market-watch.png"
                    alt="Maket-Watch"
                  />
                </a>
                <a
                  href="https://businessday.ng/interview/article/our-goal-is-to-provide-borderless-trading-investment-opportunities/"
                  target="_blank"
                  class="v2-layer__news--link"
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  <img
                    class="v2-layer__news--img"
                    src="../assets/img/news/business-day.png"
                    alt="Business Day"
                  />
                </a>
              </div>
            </div>
            <div class="v2-layer__stocks">
              <h5 class="section__caption">Invest in 4000+ Stocks Including</h5>
              <div class="v2-layer__invest">
                <img
                  class="v2-layer__invest--img"
                  src="../assets/img/icons/APPLE.svg"
                  alt="Alibaba"
                  data-aos="zoom-in-up"
                  data-aos-delay="100"
                />
                <img
                  class="v2-layer__invest--img"
                  src="../assets/img/icons/GTB.svg"
                  alt="GTBank"
                  data-aos="zoom-in-up"
                  data-aos-delay="150"
                />
                <img
                  class="v2-layer__invest--img"
                  src="../assets/img/icons/manu.png"
                  alt="Alibaba"
                  data-aos="zoom-in-up"
                  data-aos-delay="170"
                />
                <img
                  class="v2-layer__invest--img"
                  src="../assets/img/icons/GOOGLE.png"
                  alt="Alibaba"
                  data-aos="zoom-in-up"
                  data-aos-delay="200"
                />
                <img
                  class="v2-layer__invest--img"
                  src="../assets/img/icons/DANGOTE.png"
                  alt="Dangote"
                  data-aos="zoom-in-up"
                  data-aos-delay="210"
                />
              </div>
            </div>
            <div class="v2-layer__stocks">
              <h5 class="section__caption">Invest in funds from</h5>
              <div class="v2-width__md v2-layer__logos">
                <div data-aos="fade-up">
                  <img
                    class="v2-layer__logos--img"
                    src="../assets/img/etfs/blackrock.png"
                    alt="Black Rock"
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="50">
                  <img
                    class="v2-layer__logos--img"
                    src="../assets/img/etfs/vanguard.png"
                    alt="Vanguard"
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="150">
                  <img
                    class="v2-layer__logos--img"
                    src="../assets/img/etfs/fidelity.png"
                    alt="Fidelity"
                  />
                </div>
              </div>
              <div class="v2-width__md v2-layer__logos">
                <div data-aos="fade-up">
                  <img class="v2-layer__logos--img" src="../assets/img/etfs/msci.png" alt="MSCI" />
                </div>
                <div data-aos="fade-up" data-aos-delay="150">
                  <img
                    class="v2-layer__logos--img"
                    src="../assets/img/etfs/invesco.png"
                    alt="Invesco"
                  />
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                  <img
                    class="v2-layer__logos--img"
                    src="../assets/img/etfs/schwab.png"
                    alt="Charles Schwab"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="v2-layer__image-box">
            <img
              data-sizes="auto"
              :data-src="require('../assets/img/layer-phone1.png')"
              :data-srcset="require('../assets/img/layer-phone1.png')"
              data-aos="fade-up-right"
              class="lazyload v2-layer__phone v2-layer__phone1"
            />
            <img
              data-sizes="auto"
              :data-src="require('../assets/img/layer-phone2.png')"
              :data-srcset="require('../assets/img/layer-phone2.png')"
              data-aos="fade-up-left"
              class="lazyload v2-layer__phone v2-layer__phone2"
            />
            <img
              data-sizes="auto"
              :data-src="require('../assets/img/layer-desktop.png')"
              :data-srcset="require('../assets/img/layer-desktop.png')"
              data-aos="fade-down-left"
              class="lazyload v2-layer__desktop"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section v2-realize">
      <div class="container">
        <div class="row">
          <div class="v2-realize__text">
            <div class="v2-width__md">
              <h1 class="hero__title" data-aos="fade-up">Realize your financial goals</h1>
              <p
                class="section__text"
                data-aos="fade-up"
                data-aos-delay="100"
              >Make your money work for you and be free. Go global, build your dream portfolio and earn dividends on your investments.</p>
              <div class="v2-layer__signup" data-aos="fade-up" data-aos-delay="50">
                <router-link :to="{ name: 'register' }" class="v2-btn v2-btn__primary">
                  Sign Up Now
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.8009 5.51985V4.05865L0.342752 4.05865C0.162356 4.05865 0 3.91433 0 3.71589V2.14646C0 1.96606 0.144317 1.8037 0.342752 1.8037L6.8009 1.8037V0.342503C6.8009 0.0719098 7.10757 -0.0904461 7.34209 0.0538701L9.14604 1.2986L11.0763 2.63352C11.2747 2.77784 11.2747 3.06647 11.0763 3.19275L9.14604 4.56375L7.34209 5.80848C7.10757 5.9528 6.8009 5.79044 6.8009 5.51985Z"
                      fill="white"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section v2-realize">
      <div class="container">
        <div class="row">
          <div class="v2-realize__box">
            <div class="v2-realize__card" data-aos="fade-up">
              <h6 class="v2-realize__card--bold">EMAIL CHECK-IN</h6>
              <p
                class="v2-realize__card--normal"
              >No red tape. We remove all the jargon so you can get on board with just your email.</p>
              <div class="v2-realize__card--box">
                <img src="../assets/img/email-checkin.svg" alt="Email Checkin" />
              </div>
            </div>
            <div class="v2-realize__card" data-aos="fade-up" data-aos-delay="200">
              <h6 class="v2-realize__card--bold">NAIRA &amp; DOLLAR FUNDING</h6>
              <p
                class="v2-realize__card--normal"
              >Invest with both Naira and Dollar. Frictionless and painless withdrawals.</p>
              <div class="v2-realize__card--box">
                <img src="../assets/img/naira-dollar.png" alt="Naira Dollar Funding" />
              </div>
            </div>
          </div>
          <div class="col-md-4 v2-realize__box">
            <div class="v2-realize__card" data-aos="fade-up" data-aos-delay="200">
              <h6 class="v2-realize__card--bold">FAST-TRACK VERIFICATION</h6>
              <p
                class="v2-realize__card--normal"
              >We speed up the KYC process while providing you robust security and regulatory protection locally and globally.</p>
              <div class="v2-realize__card--box">
                <img src="../assets/img/fast-track.svg" alt="Fast Track" />
              </div>
            </div>
          </div>
          <div class="col-md-4 v2-realize__box">
            <div class="v2-realize__card" data-aos="fade-up" data-aos-delay="300">
              <h6 class="v2-realize__card--bold">GO BORDERLESS</h6>
              <p
                class="v2-realize__card--normal"
              >Start trading and investing. Take advantage of both local and global opportunities with your premium access.</p>
              <div class="v2-realize__card--box">
                <img src="../assets/img/go-borderless.svg" alt="Go Borderless" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="v2-invest">
      <div class="container">
        <div class="row v2-invest__row">
          <div class="v2-invest__image" data-aos="fade-left" data-aos-duration="700">
            <img :src="require('../assets/img/invest.png')" alt="Invest" v-if="investNumber === 0" />
            <img
              :src="require('../assets/img/grow.png')"
              alt="Invest"
              v-else-if="investNumber === 1"
            />
            <img
              :src="require('../assets/img/share.png')"
              alt="Invest"
              v-else-if="investNumber === 2"
            />
          </div>
          <div class="v2-invest__text">
            <h2 class="hero__title">{{invest[investNumber].title}}</h2>
            <div class="v2-invest__height">
              <p class="section__text">{{invest[investNumber].text}}</p>
              <div
                class="pb-0 v2-layer__signup"
                data-aos="fade-left"
                data-aos-delay="0"
                data-aos-duration="200"
                v-if="investNumber === 0"
              >
                <router-link :to="{ name: 'register' }" class="v2-btn v2-btn__white">
                  Sign Up Now
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.8009 5.51985V4.05865L0.342752 4.05865C0.162356 4.05865 0 3.91433 0 3.71589V2.14646C0 1.96606 0.144317 1.8037 0.342752 1.8037L6.8009 1.8037V0.342503C6.8009 0.0719098 7.10757 -0.0904461 7.34209 0.0538701L9.14604 1.2986L11.0763 2.63352C11.2747 2.77784 11.2747 3.06647 11.0763 3.19275L9.14604 4.56375L7.34209 5.80848C7.10757 5.9528 6.8009 5.79044 6.8009 5.51985Z"
                      fill="white"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
            <div class="v2-invest__pick">
              <div class="v2-invest__bar">
                <div class="v2-invest__bar--ticker" :style="{ transform: slider }"></div>
              </div>
              <div class="v2-invest__selector">
                <h6 @click="investNumber = 0">Invest</h6>
                <h6 @click="investNumber = 1">Grow</h6>
                <h6 @click="investNumber = 2">Share Ownership</h6>
              </div>
            </div>
            <div class="v2-invest__mobile">
              <div
                class="v2-invest__mobile--bar"
                @click="investNumber = 0"
                :class="{ active: investNumber === 0 }"
              ></div>
              <div
                class="v2-invest__mobile--bar"
                @click="investNumber = 1"
                :class="{ active: investNumber === 1 }"
              ></div>
              <div
                class="v2-invest__mobile--bar"
                @click="investNumber = 2"
                :class="{ active: investNumber === 2 }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="v2-countries">
      <div class="container">
        <div class="row v2-countries__row">
          <div class="v2-countries__logos-box">
            <div class="row">
              <div class="v2-countries__logos">
                <div data-aos="fade-up">
                  <img src="../assets/img/countries/nigeria.svg" alt="Nigeria" />
                </div>
                <div data-aos="fade-up" data-aos-delay="340">
                  <img src="../assets/img/countries/usa.svg" alt="USA" />
                </div>
                <div data-aos="fade-up" data-aos-delay="380">
                  <img src="../assets/img/countries/china.svg" alt="China" />
                </div>
              </div>
              <div class="v2-countries__logos">
                <div data-aos="fade-up">
                  <img src="../assets/img/countries/uk.svg" alt="United Kingdom" />
                </div>
                <div data-aos="fade-up" data-aos-delay="340">
                  <img src="../assets/img/countries/france.svg" alt="France" />
                </div>
                <div data-aos="fade-up" data-aos-delay="380">
                  <img src="../assets/img/countries/sa.svg" alt="South Africa" />
                </div>
              </div>
              <div class="v2-countries__logos">
                <div data-aos="fade-up" data-aos-delay="340">
                  <img src="../assets/img/countries/japan.svg" alt="Japan" />
                </div>
                <div data-aos="fade-up" data-aos-delay="380">
                  <img src="../assets/img/countries/indonesia.svg" alt="Indonesia" />
                </div>
                <div data-aos="fade-up" data-aos-delay="400">
                  <img src="../assets/img/countries/brazil.svg" alt="Brazil" />
                </div>
              </div>
              <div class="v2-countries__logos">
                <div data-aos="fade-up">
                  <img src="../assets/img/countries/europian.svg" alt="Europian Union" />
                </div>
                <div data-aos="fade-up" data-aos-delay="340">
                  <img src="../assets/img/countries/russia.svg" alt="Russia" />
                </div>
                <div data-aos="fade-up" data-aos-delay="380">
                  <img src="../assets/img/countries/turkey.svg" alt="Turkey" />
                </div>
              </div>
              <div class="v2-countries__logos">
                <div data-aos="fade-up">
                  <img src="../assets/img/countries/canada.svg" alt="Canada" />
                </div>
                <div data-aos="fade-up" data-aos-delay="320">
                  <img src="../assets/img/countries/australia.svg" alt="Australia" />
                </div>
                <div data-aos="fade-up" data-aos-delay="340">
                  <img src="../assets/img/countries/belgium.svg" alt="Belgium" />
                </div>
              </div>
            </div>
          </div>
          <div class="v2-countries__body" data-aos="fade-left">
            <h6 class="section__caption">No Investment Barriers</h6>
            <h2 class="section__title">Trade and Invest in 40+ Countries</h2>
            <p
              class="section__text"
            >First-class access to stocks listed on the NG &amp; US stock exchanges as well as global blue-chip companies from around the world. Your limitless investment passport is finally here.</p>
            <router-link class="section__link link" href :to="{ name: 'faq' }">
              Learn More
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="#000" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta">
      <div class="cta__card-wrapper">
        <div class="container">
          <div class="cta__grid">
            <div class="cta__card" data-aos="fade-left">
              <div class="cta__icon">
                <img
                  data-sizes="auto"
                  :data-src="require('../assets/img/icons/local.png')"
                  :data-srcset="require('../assets/img/icons/local.png')"
                  class="lazyload"
                  alt="Local"
                  height="100px"
                />
              </div>
              <h4>Locally Regulated</h4>
              <p
                class="cta__text"
              >All local equities are offered through a locally licensed brokerage firm registered with the Nigerian Stock Exchange (NSE), Central Securities Clearing System (CSCS) and regulated by Nigeria’s Securities and Exchanges Commission (SEC). See disclosures at bottom of page for more</p>
            </div>
            <div class="cta__card" data-aos="fade-left" data-aos-delay="500">
              <div class="cta__icon">
                <img
                  data-sizes="auto"
                  :data-src="require('../assets/img/icons/international.png')"
                  :data-srcset="require('../assets/img/icons/international.png')"
                  class="lazyload"
                  alt="International"
                  height="100px"
                />
              </div>
              <h4>Internationally Regulated</h4>
              <p
                class="cta__text"
              >All global equities are offered through a US brokerage firm that is regulated by the US Financial Industry Regulatory Authority (FINRA) and the US Securities and Exchange Commission (SEC). Furthermore Dollar funds deposited and assets owned are insured by the US Securities Investor Protection Corporation (SIPC) up to $500,000. See disclosures at bottom of page for more.</p>
            </div>
            <div class="cta__card" data-aos="fade-left" data-aos-delay="600">
              <div class="cta__icon">
                <img
                  data-sizes="auto"
                  :data-src="require('../assets/img/icons/encrypt.png')"
                  :data-srcset="require('../assets/img/icons/encrypt.png')"
                  class="lazyload"
                  alt="Encrypt"
                  height="100px"
                />
              </div>
              <h4>Bank Level Encryption</h4>
              <p
                class="cta__text"
              >All website traffic is encrypted and protected by using AES bank level encryption. This provides security between your device and our servers ensuring your personal and transaction details are always kept private.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="v2-integration">
      <div class="container">
        <div class="row v2-integration__row">
          <div class="v2-countries__body">
            <h2 class="section__title">Easy Integration</h2>
            <p
              class="section__text"
            >Chaka's platform and API are available for both corporate and institutional clients. From corporates running progressive Employee Investment Programs to investment advisors, stockbrokers, and fund managers building bespoke tools, Chaka is interoperable and can be integrated seamlessly into your existing system.</p>
            <router-link :to="{ name: 'developers' }" class="section__link">
              Contact us for more info
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="#000" />
              </svg>
            </router-link>
          </div>
          <div class="v2-integration__image-box" data-aos="fade-down">
            <img src="../assets/img/integration.png" alt="Easy Integration" width="100%" />
          </div>
        </div>
      </div>
    </section>

    <section class="v2-testimonies">
      <div class="container">
        <div class="row v2-testimonies__row">
          <div class="col-md-6 v2-testimonies__half">
            <div class="v2-testimonies__text">
              <h5 class="section__caption">Verified Customer Stories</h5>
              <h2 class="section__title">What our customers say</h2>
              <p class="section__text">
                Reviews, comments and love from Chaka’s
                customers and community.
              </p>
              <div class="v2-layer__signup" data-aos="fade-up" data-aos-delay="50">
                <router-link :to="{ name: 'register' }" class="v2-btn v2-btn__primary">
                  Sign Up Now
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.8009 5.51985V4.05865L0.342752 4.05865C0.162356 4.05865 0 3.91433 0 3.71589V2.14646C0 1.96606 0.144317 1.8037 0.342752 1.8037L6.8009 1.8037V0.342503C6.8009 0.0719098 7.10757 -0.0904461 7.34209 0.0538701L9.14604 1.2986L11.0763 2.63352C11.2747 2.77784 11.2747 3.06647 11.0763 3.19275L9.14604 4.56375L7.34209 5.80848C7.10757 5.9528 6.8009 5.79044 6.8009 5.51985Z"
                      fill="white"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6 v2-testimonies__half" data-aos="fade-down" data-aos-delay="500">
            <div class="v2-testimonies__flickity">
              <Flickity ref="carousel" :options="carouselOptions">
                <div class="v2-testimonies-cell">
                  <div class="v2-testimonies__card">
                    <div>
                      <p>
                        <strong>Agozie E</strong>: I'm grateful for the platform you have designed. I'm your fan
                      </p>
                    </div>
                  </div>
                </div>
                <div class="v2-testimonies-cell">
                  <div class="v2-testimonies__card">
                    <div>
                      <p>
                        <strong>Girraj S</strong>: As an Indian based in Nigeria, this is a useful service as it is difficult for me to access local investments easily through trusted online parties in Nigeria. The global access is a plus.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="v2-testimonies-cell">
                  <div class="v2-testimonies__card">
                    <div>
                      <p>
                        <strong>Parker B</strong>: I am an investment enthusiast and loves the idea that I can buy stocks abroad right here in Nigeria thanks to Chaka. My experience so far has been an exciting one. As for my plans for the future, I am looking forward to transactions in their millions
                      </p>
                    </div>
                  </div>
                </div>
                <div class="v2-testimonies-cell">
                  <div class="v2-testimonies__card">
                    <div>
                      <p>
                        <strong>Adeyemo O.</strong>: I was an investor on the Nigerian Stock Exchange before the meltdown of the Nigerian Stock market, but I still love investment in stocks of reputable quoted companies, both Local &amp; International. That is why I have decided to sign up with Chaka
                      </p>
                    </div>
                  </div>
                </div>
              </Flickity>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section v2-mobile">
      <div class="container">
        <div class="row v2-mobile__row">
          <div class="v2-mobile__image" data-aos="zoom-in-up">
            <img
              data-sizes="auto"
              :data-src="require('../assets/img/chaka-mobile.png')"
              :data-srcset="require('../assets/img/chaka-mobile.png')"
              class="lazyload"
              alt="Chaka Mobile App"
            />
          </div>
          <div class="v2-mobile__text">
            <h2 class="hero__title" data-aos="fade-left">
              Get the
              <span class="primary">app</span> soon
            </h2>
            <p
              class="hero__text v2-mobilie__text"
              data-aos="fade-left"
              data-aos-delay="200"
            >Keep your opportunities closer</p>
            <div class="v2-mobile__store--logo" data-aos="fade-left" data-aos-delay="250">
              <img src="../assets/img/chaka-logo.svg" alt="Chaka" />
            </div>
            <div
              class="d-none d-md-block v2-mobile__store v2-mobile__store--light"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img src="../assets/img/appstore.svg" alt="App Store" />
              <img src="../assets/img/playstore.svg" alt="Play Store" />
            </div>
            <div
              class="d-md-none v2-mobile__store v2-mobile__store--dark"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img src="../assets/img/appstore-dark.svg" alt="App Store" />
              <img src="../assets/img/playstore-dark.svg" alt="Play Store" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <email-subscribe />
  </main>
</template>

<script>
import EmailSubscribe from "../components/EmailSubscription";
import Flickity from "vue-flickity";

export default {
  name: "Home",
  components: {
    EmailSubscribe,
    Flickity
  },
  data() {
    return {
      investNumber: 0,
      invest: [
        {
          title: "Invest",
          text:
            "More options of assets from around the world than ever before. Start with as low as $10 or N1, 000."
        },
        {
          title: "Grow",
          text:
            "Upgrade your investment knowledge. Whether you're less experienced or a professional, get access to tools and content from our in-house team and guests from around the world. Learn more about fundamental, technical and sentimental investing."
        },
        {
          title: "Share Ownership",
          text:
            "Own your favorite companies and share the gift of ownership with colleagues, friends and loved ones."
        }
      ],
      itemData: {},
      errors: {},
      loading: false,
      message: null,
      carouselOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        autoPlay: false,
        draggable: true,
        freeScroll: false,
        adaptiveHeight: true,
        selectedAttraction: 0.2,
        friction: 0.8,
        cellAlign: "left"
      }
    };
  },
  computed: {
    slider() {
      const num = this.investNumber * 50;
      return `translateY(${num}px)`;
    }
  },
  methods: {
    create() {
      console.log(this.itemData);
    }
  },
  mounted() {
    document.title =
      "Chaka - Your Investment Passport to Trade Nigerian, US & International Stock Markets";
    document.getElementsByTagName("meta")["keywords"].content =
      "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
    document.getElementsByTagName("meta")["description"].content =
      "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
  }
};
</script>

<style lang="scss" scoped>
.row {
  margin: 0;
}
</style>
