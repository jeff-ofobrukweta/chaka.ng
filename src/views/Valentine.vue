<template>
    <main class="main" role="main">
        <section class="val-banner">
            <form @submit.prevent="getResult">
                <div class="container">
                    <div class="val-banner__row">
                        <div class="val-banner__text">
                            <h2>
                                "We have been together for
                                <input
                                    type="number"
                                    class="val-form__input"
                                    name="duration"
                                    placeholder="1"
                                    :class="{ 'is-invalid': errors.duration }"
                                    @focus="errors = {}"
                                    v-model="itemData.duration"
                                />&nbsp;
                                <select name="interval" v-model="itemData.interval" class="val-form__select" :class="{ 'is-invalid': errors.interval }" @focus="errors = {}">
                                    <option value="M">Months</option>
                                    <option value="Y" selected>Years</option> </select
                                >.<br />In this period,
                                <select name="" class="val-form__select" @focus="errors = {}">
                                    <option value="B">Bae has given me</option>
                                    <option value="I" selected>I've given bae</option></select
                                ><br />$
                                <select
                                    v-if="amount !== 'manual'"
                                    name="amount-select"
                                    v-model="amount"
                                    class="val-form__select"
                                    @change="checkGiftValue"
                                    :class="{ 'is-invalid': errors.amount }"
                                    @focus="errors = {}"
                                >
                                    <option value="160" selected>Airpod ($160)</option>
                                    <option value="1000">iPhone ($1,000)</option>
                                    <option value="1800">MacBook ($1,800)</option>
                                    <option value="3000">Car ($3,000)</option>
                                    <option value="50000">House ($50,000)</option>
                                    <option value="manual">Enter your gift value</option></select
                                >
                                <input
                                    v-if="amount === 'manual'"
                                    type="number"
                                    class="val-form__input"
                                    name="amount"
                                    placeholder="1000"
                                    :class="{ 'is-invalid': errors.amount }"
                                    @focus="errors = {}"
                                    v-model="itemData.amount"
                                />
                                worth of gifts."
                            </h2>
                            <p class="mt-2 mb-1">
                                <b class="val-banner__b" :class="{ 'is-invalid': errors.symbol }"
                                    >Select/Type the asset that represents you and bae <span v-if="errors.symbol" class="val-red">**</span></b
                                >
                            </p>
                            <template v-if="searchStocks.length > 0">
                                <div
                                    v-for="(portfolio, i) in searchStocks"
                                    :key="i"
                                    :class="{ active: activePortfolio === portfolio.symbol }"
                                    class="val-banner__check"
                                    @click="setActive(portfolio.symbol)"
                                >
                                    <div class="val-banner__check--box" :class="{ active: activePortfolio === portfolio.symbol }"></div>
                                    <div class="val-banner__check--text">{{ portfolio.name }}</div>
                                </div>
                            </template>
                            <template v-else>
                                <small
                                    >Oops! No stocks related to <strong>{{ search }}</strong></small
                                >
                                <br />
                            </template>
                            <div>
                                <input
                                    placeholder="Enter Stock/ETF of Choice"
                                    type="text"
                                    name="search"
                                    class="form__input val-form__search"
                                    v-model="search"
                                    :class="{ inactive: searchStocks.length <= 0 }"
                                    @input="startSearch"
                                    autocomplete="off"
                                />
                            </div>
                            <error-block type="val" />
                        </div>
                        <div class="val-form__btn" v-if="getWindowWidth === 'mobile'">
                            <button class="btn" type="submit">
                                <span>See Results</span
                                ><svg v-if="!loading" width="84" height="27" viewBox="0 0 84 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 13.7556H81M81 13.7556L68.5981 2M81 13.7556L68.5981 25" stroke="white" stroke-width="4" />
                                </svg>
                                <img v-else :src="require('../assets/img/loader.gif')" alt="Loader" width="27px" />
                            </button>
                        </div>
                        <div class="val-banner__image" data-aos="fade-left" data-aos-duration="1000">
                            <img
                                src="../assets/img/val-lovers.png"
                                data-sizes="auto"
                                :data-src="require('../assets/img/val-lovers.png')"
                                :data-srcset="require('../assets/img/val-lovers.png')"
                                class="lazyload"
                                alt="Val Lovers"
                            />
                        </div>
                    </div>
                    <div class="val-form__btn" v-if="getWindowWidth !== 'mobile'">
                        <button class="btn" type="submit">
                            <span>See Results</span
                            ><svg v-if="!loading" width="84" height="27" viewBox="0 0 84 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 13.7556H81M81 13.7556L68.5981 2M81 13.7556L68.5981 25" stroke="white" stroke-width="4" />
                            </svg>
                            <img v-else :src="require('../assets/img/loader.gif')" alt="Loader" width="27px" />
                        </button>
                    </div>
                </div>
            </form>
        </section>

        <section class="section v2-mobile">
            <div class="container">
                <div class="row v2-mobile__row">
                    <div class="v2-mobile__image" data-aos="zoom-in-up" v-if="getWindowWidth === 'desktop'">
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
                            <span class="val-red">app</span> now
                        </h2>
                        <div>
                            <a
                                href="https://play.google.com/store/apps/details?id=ng.chaka.android"
                                target="_blank"
                                rel="noreferrer noopener"
                                class="v2-mobile__active v2-mobile__active--val"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <img src="../assets/img/playstore.svg" data-aos="fade-up" data-aos-delay="250" alt="Play Store" />
                            </a>
                        </div>
                        <p class="hero__text v2-mobilie__text" data-aos="fade-left" data-aos-delay="200">
                            Keep your opportunities closer
                        </p>
                        <template v-if="getWindowWidth !== 'mobile'">
                            <div class="v2-mobile__store--logo" data-aos="fade-left" data-aos-delay="250">
                                <img src="../assets/img/val/logo-white.svg" alt="Chaka" />
                            </div>
                            <div class="d-none d-md-block v2-mobile__store v2-mobile__store--light" data-aos="fade-left" data-aos-delay="200">
                                <img src="../assets/img/appstore.svg" alt="App Store" />
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=ng.chaka.android">
                                    <img src="../assets/img/playstore.svg" alt="Play Store" />
                                </a></div
                        ></template>
                        <div v-else class="d-md-none v2-mobile__store v2-mobile__store--dark" data-aos="fade-left" data-aos-delay="200">
                            <img src="../assets/img/appstore-dark.svg" alt="App Store" />
                            <a target="_blank" href="https://play.google.com/store/apps/details?id=ng.chaka.android">
                                <img src="../assets/img/playstore-dark.svg" alt="Play Store" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <email-subscribe />

        <transition name="modal" v-if="showModal">
            <div class="modal-mask">
                <div class="modal__underlay" @click="closeModal"></div>
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-body">
                            <div class="modal-flex">
                                <div class="modal-text" id="toImage">
                                    <p><strong>YOU GET</strong></p>
                                    <div class="modal-text__box">
                                        <h1>
                                            {{ (getValResult.capital + getValResult.netEarning) | kobo | currency("USD", true) }}
                                        </h1>
                                        <p class="modal-text__net-earning" :class="colorClass">({{ getValResult.netEarningPercentage }})</p>
                                        <div class="modal-text__powered" v-if="getWindowWidth === 'mobile'">
                                            Powered by<svg width="38" height="10" viewBox="0 0 38 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M5.72876 5.24049C5.23589 4.08035 4.52177 3.35089 3.72285 2.92277C4.04896 2.07533 4.7028 1.26658 5.81577 0.609314C6.49833 1.10058 7.28688 1.91535 7.7307 2.92489C6.93339 3.3533 6.22081 4.08226 5.72876 5.24049ZM5.57331 5.83106C5.38268 6.58386 5.30432 7.4775 5.37645 8.5345C3.37126 9.00071 -0.957297 7.30183 0.190279 2.844C1.87614 2.56927 4.81487 2.92901 5.57331 5.83106ZM5.79853 8.43647C7.61602 9.18209 12.5092 7.55103 11.2976 2.84424C9.20047 2.50249 5.16474 3.14249 5.79853 8.43647Z"
                                                    fill="#D22C30"
                                                />
                                                <path
                                                    d="M13.432 5.651C13.432 5.303 13.486 4.979 13.594 4.679C13.702 4.373 13.855 4.109 14.053 3.887C14.257 3.665 14.503 3.491 14.791 3.365C15.079 3.239 15.403 3.176 15.763 3.176C16.207 3.176 16.627 3.257 17.023 3.419L16.789 4.31C16.663 4.256 16.519 4.211 16.357 4.175C16.201 4.139 16.033 4.121 15.853 4.121C15.427 4.121 15.103 4.256 14.881 4.526C14.659 4.79 14.548 5.165 14.548 5.651C14.548 6.119 14.653 6.491 14.863 6.767C15.073 7.037 15.427 7.172 15.925 7.172C16.111 7.172 16.294 7.154 16.474 7.118C16.654 7.082 16.81 7.037 16.942 6.983L17.095 7.883C16.975 7.943 16.792 7.997 16.546 8.045C16.306 8.093 16.057 8.117 15.799 8.117C15.397 8.117 15.046 8.057 14.746 7.937C14.452 7.811 14.206 7.64 14.008 7.424C13.816 7.202 13.672 6.941 13.576 6.641C13.48 6.335 13.432 6.005 13.432 5.651ZM17.9381 8V1.196L19.0271 1.016V3.347C19.1471 3.305 19.2851 3.269 19.4411 3.239C19.6031 3.209 19.7621 3.194 19.9181 3.194C20.2961 3.194 20.6081 3.248 20.8541 3.356C21.1061 3.458 21.3071 3.605 21.4571 3.797C21.6071 3.983 21.7121 4.208 21.7721 4.472C21.8381 4.736 21.8711 5.03 21.8711 5.354V8H20.7821V5.525C20.7821 5.273 20.7641 5.06 20.7281 4.886C20.6981 4.706 20.6441 4.562 20.5661 4.454C20.4941 4.34 20.3951 4.259 20.2691 4.211C20.1431 4.157 19.9871 4.13 19.8011 4.13C19.6571 4.13 19.5101 4.145 19.3601 4.175C19.2101 4.205 19.0991 4.232 19.0271 4.256V8H17.9381ZM24.8324 7.235C25.1684 7.235 25.4234 7.217 25.5974 7.181V5.975C25.5374 5.957 25.4504 5.939 25.3364 5.921C25.2224 5.903 25.0964 5.894 24.9584 5.894C24.8384 5.894 24.7154 5.903 24.5894 5.921C24.4694 5.939 24.3584 5.972 24.2564 6.02C24.1604 6.068 24.0824 6.137 24.0224 6.227C23.9624 6.311 23.9324 6.419 23.9324 6.551C23.9324 6.809 24.0134 6.989 24.1754 7.091C24.3374 7.187 24.5564 7.235 24.8324 7.235ZM24.7424 3.176C25.1024 3.176 25.4054 3.221 25.6514 3.311C25.8974 3.401 26.0924 3.527 26.2364 3.689C26.3864 3.851 26.4914 4.049 26.5514 4.283C26.6174 4.511 26.6504 4.763 26.6504 5.039V7.892C26.4824 7.928 26.2274 7.97 25.8854 8.018C25.5494 8.072 25.1684 8.099 24.7424 8.099C24.4604 8.099 24.2024 8.072 23.9684 8.018C23.7344 7.964 23.5334 7.877 23.3654 7.757C23.2034 7.637 23.0744 7.481 22.9784 7.289C22.8884 7.097 22.8434 6.86 22.8434 6.578C22.8434 6.308 22.8944 6.08 22.9964 5.894C23.1044 5.708 23.2484 5.558 23.4284 5.444C23.6084 5.324 23.8154 5.24 24.0494 5.192C24.2894 5.138 24.5384 5.111 24.7964 5.111C24.9164 5.111 25.0424 5.12 25.1744 5.138C25.3064 5.15 25.4474 5.174 25.5974 5.21V5.03C25.5974 4.904 25.5824 4.784 25.5524 4.67C25.5224 4.556 25.4684 4.457 25.3904 4.373C25.3184 4.283 25.2194 4.214 25.0934 4.166C24.9734 4.118 24.8204 4.094 24.6344 4.094C24.3824 4.094 24.1514 4.112 23.9414 4.148C23.7314 4.184 23.5604 4.226 23.4284 4.274L23.2934 3.392C23.4314 3.344 23.6324 3.296 23.8964 3.248C24.1604 3.2 24.4424 3.176 24.7424 3.176ZM29.073 5.129C29.211 4.985 29.358 4.832 29.514 4.67C29.67 4.502 29.823 4.337 29.973 4.175C30.123 4.007 30.264 3.848 30.396 3.698C30.534 3.542 30.651 3.407 30.747 3.293H32.034C31.734 3.629 31.416 3.977 31.08 4.337C30.75 4.697 30.417 5.048 30.081 5.39C30.261 5.54 30.45 5.723 30.648 5.939C30.846 6.149 31.038 6.374 31.224 6.614C31.41 6.854 31.584 7.094 31.746 7.334C31.908 7.574 32.043 7.796 32.151 8H30.891C30.783 7.814 30.657 7.619 30.513 7.415C30.375 7.211 30.225 7.013 30.063 6.821C29.901 6.629 29.736 6.449 29.568 6.281C29.4 6.107 29.235 5.96 29.073 5.84V8H27.984V1.196L29.073 1.016V5.129ZM34.597 7.235C34.933 7.235 35.188 7.217 35.362 7.181V5.975C35.302 5.957 35.215 5.939 35.101 5.921C34.987 5.903 34.861 5.894 34.723 5.894C34.603 5.894 34.48 5.903 34.354 5.921C34.234 5.939 34.123 5.972 34.021 6.02C33.925 6.068 33.847 6.137 33.787 6.227C33.727 6.311 33.697 6.419 33.697 6.551C33.697 6.809 33.778 6.989 33.94 7.091C34.102 7.187 34.321 7.235 34.597 7.235ZM34.507 3.176C34.867 3.176 35.17 3.221 35.416 3.311C35.662 3.401 35.857 3.527 36.001 3.689C36.151 3.851 36.256 4.049 36.316 4.283C36.382 4.511 36.415 4.763 36.415 5.039V7.892C36.247 7.928 35.992 7.97 35.65 8.018C35.314 8.072 34.933 8.099 34.507 8.099C34.225 8.099 33.967 8.072 33.733 8.018C33.499 7.964 33.298 7.877 33.13 7.757C32.968 7.637 32.839 7.481 32.743 7.289C32.653 7.097 32.608 6.86 32.608 6.578C32.608 6.308 32.659 6.08 32.761 5.894C32.869 5.708 33.013 5.558 33.193 5.444C33.373 5.324 33.58 5.24 33.814 5.192C34.054 5.138 34.303 5.111 34.561 5.111C34.681 5.111 34.807 5.12 34.939 5.138C35.071 5.15 35.212 5.174 35.362 5.21V5.03C35.362 4.904 35.347 4.784 35.317 4.67C35.287 4.556 35.233 4.457 35.155 4.373C35.083 4.283 34.984 4.214 34.858 4.166C34.738 4.118 34.585 4.094 34.399 4.094C34.147 4.094 33.916 4.112 33.706 4.148C33.496 4.184 33.325 4.226 33.193 4.274L33.058 3.392C33.196 3.344 33.397 3.296 33.661 3.248C33.925 3.2 34.207 3.176 34.507 3.176Z"
                                                    fill="#031C2C"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <p class="modal-text__message">
                                        {{ getValResult.message }}
                                    </p>
                                </div>
                                <div class="modal-image">
                                    <img :src="getValResult.imageUrl" alt="Sample" />
                                </div>
                            </div>
                            <div class="modal-flex">
                                <!-- <div> -->
                                    <!-- TO-DO::Put back when final image is ready -->
                                <!-- <img :src="finalImage" alt="Final image" /> -->
                                <!-- </div> -->
                            </div>
                            <div class="modal-text__powered" v-if="getWindowWidth !== 'mobile'">
                                Powered by<svg width="45" height="13" viewBox="0 0 45 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.44491 7.81937C5.89044 6.51422 5.08706 5.69359 4.1883 5.21194C4.55518 4.25858 5.29075 3.34873 6.54284 2.60931C7.31071 3.16198 8.19781 4.07858 8.69712 5.2143C7.80013 5.69627 6.99847 6.51635 6.44491 7.81937ZM6.26995 8.48356C6.05545 9.33051 5.96728 10.3359 6.04843 11.5252C3.79253 12.0496 -1.07691 10.1383 0.214095 5.12333C2.11065 4.81426 5.41662 5.21894 6.26995 8.48356ZM6.52328 11.4149C8.56796 12.2537 14.0728 10.4188 12.7097 5.12361C10.3505 4.73914 5.81027 5.45914 6.52328 11.4149Z"
                                        fill="#D22C30"
                                    />
                                    <path
                                        d="M15.528 8.129C15.528 7.70367 15.594 7.30767 15.726 6.941C15.858 6.567 16.045 6.24433 16.287 5.973C16.5363 5.70167 16.837 5.489 17.189 5.335C17.541 5.181 17.937 5.104 18.377 5.104C18.9197 5.104 19.433 5.203 19.917 5.401L19.631 6.49C19.477 6.424 19.301 6.369 19.103 6.325C18.9123 6.281 18.707 6.259 18.487 6.259C17.9663 6.259 17.5703 6.424 17.299 6.754C17.0277 7.07667 16.892 7.535 16.892 8.129C16.892 8.701 17.0203 9.15567 17.277 9.493C17.5337 9.823 17.9663 9.988 18.575 9.988C18.8023 9.988 19.026 9.966 19.246 9.922C19.466 9.878 19.6567 9.823 19.818 9.757L20.005 10.857C19.8583 10.9303 19.6347 10.9963 19.334 11.055C19.0407 11.1137 18.7363 11.143 18.421 11.143C17.9297 11.143 17.5007 11.0697 17.134 10.923C16.7747 10.769 16.474 10.56 16.232 10.296C15.9973 10.0247 15.8213 9.70567 15.704 9.339C15.5867 8.965 15.528 8.56167 15.528 8.129ZM21.0355 11V2.684L22.3665 2.464V5.313C22.5131 5.26167 22.6818 5.21767 22.8725 5.181C23.0705 5.14433 23.2648 5.126 23.4555 5.126C23.9175 5.126 24.2988 5.192 24.5995 5.324C24.9075 5.44867 25.1531 5.62833 25.3365 5.863C25.5198 6.09033 25.6481 6.36533 25.7215 6.688C25.8021 7.01067 25.8425 7.37 25.8425 7.766V11H24.5115V7.975C24.5115 7.667 24.4895 7.40667 24.4455 7.194C24.4088 6.974 24.3428 6.798 24.2475 6.666C24.1595 6.52667 24.0385 6.42767 23.8845 6.369C23.7305 6.303 23.5398 6.27 23.3125 6.27C23.1365 6.27 22.9568 6.28833 22.7735 6.325C22.5901 6.36167 22.4545 6.39467 22.3665 6.424V11H21.0355ZM29.4618 10.065C29.8725 10.065 30.1842 10.043 30.3968 9.999V8.525C30.3235 8.503 30.2172 8.481 30.0778 8.459C29.9385 8.437 29.7845 8.426 29.6158 8.426C29.4692 8.426 29.3188 8.437 29.1648 8.459C29.0182 8.481 28.8825 8.52133 28.7578 8.58C28.6405 8.63867 28.5452 8.723 28.4718 8.833C28.3985 8.93567 28.3618 9.06767 28.3618 9.229C28.3618 9.54433 28.4608 9.76433 28.6588 9.889C28.8568 10.0063 29.1245 10.065 29.4618 10.065ZM29.3518 5.104C29.7918 5.104 30.1622 5.159 30.4628 5.269C30.7635 5.379 31.0018 5.533 31.1778 5.731C31.3612 5.929 31.4895 6.171 31.5628 6.457C31.6435 6.73567 31.6838 7.04367 31.6838 7.381V10.868C31.4785 10.912 31.1668 10.9633 30.7488 11.022C30.3382 11.088 29.8725 11.121 29.3518 11.121C29.0072 11.121 28.6918 11.088 28.4058 11.022C28.1198 10.956 27.8742 10.8497 27.6688 10.703C27.4708 10.5563 27.3132 10.3657 27.1958 10.131C27.0858 9.89633 27.0308 9.60667 27.0308 9.262C27.0308 8.932 27.0932 8.65333 27.2178 8.426C27.3498 8.19867 27.5258 8.01533 27.7458 7.876C27.9658 7.72933 28.2188 7.62667 28.5048 7.568C28.7982 7.502 29.1025 7.469 29.4178 7.469C29.5645 7.469 29.7185 7.48 29.8798 7.502C30.0412 7.51667 30.2135 7.546 30.3968 7.59V7.37C30.3968 7.216 30.3785 7.06933 30.3418 6.93C30.3052 6.79067 30.2392 6.66967 30.1438 6.567C30.0558 6.457 29.9348 6.37267 29.7808 6.314C29.6342 6.25533 29.4472 6.226 29.2198 6.226C28.9118 6.226 28.6295 6.248 28.3728 6.292C28.1162 6.336 27.9072 6.38733 27.7458 6.446L27.5808 5.368C27.7495 5.30933 27.9952 5.25067 28.3178 5.192C28.6405 5.13333 28.9852 5.104 29.3518 5.104ZM34.6448 7.491C34.8135 7.315 34.9931 7.128 35.1838 6.93C35.3745 6.72467 35.5615 6.523 35.7448 6.325C35.9281 6.11967 36.1005 5.92533 36.2618 5.742C36.4305 5.55133 36.5735 5.38633 36.6908 5.247H38.2638C37.8971 5.65767 37.5085 6.083 37.0978 6.523C36.6945 6.963 36.2875 7.392 35.8768 7.81C36.0968 7.99333 36.3278 8.217 36.5698 8.481C36.8118 8.73767 37.0465 9.01267 37.2738 9.306C37.5011 9.59933 37.7138 9.89267 37.9118 10.186C38.1098 10.4793 38.2748 10.7507 38.4068 11H36.8668C36.7348 10.7727 36.5808 10.5343 36.4048 10.285C36.2361 10.0357 36.0528 9.79367 35.8548 9.559C35.6568 9.32433 35.4551 9.10433 35.2498 8.899C35.0445 8.68633 34.8428 8.50667 34.6448 8.36V11H33.3138V2.684L34.6448 2.464V7.491ZM41.3964 10.065C41.8071 10.065 42.1187 10.043 42.3314 9.999V8.525C42.2581 8.503 42.1517 8.481 42.0124 8.459C41.8731 8.437 41.7191 8.426 41.5504 8.426C41.4037 8.426 41.2534 8.437 41.0994 8.459C40.9527 8.481 40.8171 8.52133 40.6924 8.58C40.5751 8.63867 40.4797 8.723 40.4064 8.833C40.3331 8.93567 40.2964 9.06767 40.2964 9.229C40.2964 9.54433 40.3954 9.76433 40.5934 9.889C40.7914 10.0063 41.0591 10.065 41.3964 10.065ZM41.2864 5.104C41.7264 5.104 42.0967 5.159 42.3974 5.269C42.6981 5.379 42.9364 5.533 43.1124 5.731C43.2957 5.929 43.4241 6.171 43.4974 6.457C43.5781 6.73567 43.6184 7.04367 43.6184 7.381V10.868C43.4131 10.912 43.1014 10.9633 42.6834 11.022C42.2727 11.088 41.8071 11.121 41.2864 11.121C40.9417 11.121 40.6264 11.088 40.3404 11.022C40.0544 10.956 39.8087 10.8497 39.6034 10.703C39.4054 10.5563 39.2477 10.3657 39.1304 10.131C39.0204 9.89633 38.9654 9.60667 38.9654 9.262C38.9654 8.932 39.0277 8.65333 39.1524 8.426C39.2844 8.19867 39.4604 8.01533 39.6804 7.876C39.9004 7.72933 40.1534 7.62667 40.4394 7.568C40.7327 7.502 41.0371 7.469 41.3524 7.469C41.4991 7.469 41.6531 7.48 41.8144 7.502C41.9757 7.51667 42.1481 7.546 42.3314 7.59V7.37C42.3314 7.216 42.3131 7.06933 42.2764 6.93C42.2397 6.79067 42.1737 6.66967 42.0784 6.567C41.9904 6.457 41.8694 6.37267 41.7154 6.314C41.5687 6.25533 41.3817 6.226 41.1544 6.226C40.8464 6.226 40.5641 6.248 40.3074 6.292C40.0507 6.336 39.8417 6.38733 39.6804 6.446L39.5154 5.368C39.6841 5.30933 39.9297 5.25067 40.2524 5.192C40.5751 5.13333 40.9197 5.104 41.2864 5.104Z"
                                        fill="#031C2C"
                                    />
                                </svg>
                            </div>
                            <div class="modal-socials">
                                <div><p>Share your result</p></div>
                                <a class="modal__share-button whatsapp" target="_blank" :href="whatsappLink" data-size="large"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.5959 10.2593L12.5899 10.2995C11.1413 9.7126 10.9898 9.63442 10.8027 9.86252C10.673 10.0205 10.2948 10.3787 10.1809 10.4847C10.0656 10.5891 9.95095 10.5972 9.7553 10.5249C9.55767 10.4446 8.92329 10.2759 8.1723 9.72973C7.58733 9.30405 7.19471 8.78199 7.07876 8.62136C6.88575 8.35042 7.28957 8.31187 7.65715 7.74643C7.72303 7.63399 7.68943 7.54564 7.64068 7.46586C7.59128 7.38554 7.198 6.59843 7.03331 6.28466C6.87521 5.97196 6.71249 6.01158 6.59062 6.01158C6.21118 5.98481 5.93384 5.98909 5.68944 6.19578C4.6262 7.14566 4.89432 8.12553 5.80406 9.16751C7.59194 11.0694 8.5445 11.4196 10.2863 11.9058C10.7566 12.0273 11.1855 12.0102 11.5247 11.9706C11.9029 11.9219 12.6888 11.5845 12.8528 11.207C13.0208 10.8295 13.0208 10.5163 12.9714 10.444C12.9226 10.3717 12.7935 10.3316 12.5959 10.2593V10.2593Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M13.97 4.01213C9.48475 -0.323706 2.06183 2.82099 2.05892 8.93771C2.05892 10.1604 2.37917 11.3527 2.98933 12.4056L2 16L5.69542 15.0364C10.3067 17.5271 15.9977 14.2197 16 8.94121C16 7.08858 15.2767 5.34503 13.9612 4.03488L13.97 4.01213ZM14.8345 8.92196C14.831 13.3745 9.94325 16.1552 6.0775 13.8825L5.8675 13.7577L3.68 14.3264L4.26625 12.2002L4.12683 11.9815C1.72117 8.15198 4.485 3.14706 9.042 3.14706C10.5902 3.14706 12.0432 3.7508 13.1376 4.84453C14.2313 5.92893 14.8345 7.38199 14.8345 8.92196V8.92196Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Whatsapp</span></a
                                >
                                <a class="modal__share-button twitter" target="_blank" :href="twitterLink" data-size="large"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.05075 6.19219L9.08223 6.71122L8.55762 6.64767C6.64804 6.40404 4.97978 5.57782 3.56334 4.1902L2.87085 3.50169L2.69248 4.01013C2.31477 5.14353 2.55609 6.34048 3.343 7.14552C3.76269 7.5904 3.66826 7.65396 2.9443 7.38914C2.69248 7.3044 2.47215 7.24085 2.45116 7.27263C2.37772 7.34677 2.62953 8.31069 2.82888 8.69202C3.10168 9.22165 3.65777 9.74068 4.26631 10.0479L4.78043 10.2915L4.17188 10.3021C3.58432 10.3021 3.56334 10.3127 3.62629 10.5351C3.83613 11.2236 4.66502 11.9545 5.58833 12.2723L6.23884 12.4947L5.67227 12.8337C4.83289 13.321 3.84662 13.5964 2.86036 13.6175C2.38821 13.6281 2 13.6705 2 13.7023C2 13.8082 3.28005 14.4014 4.02499 14.6344C6.25983 15.3229 8.91435 15.0264 10.9079 13.8506C12.3243 13.0138 13.7408 11.3507 14.4018 9.74068C14.7585 8.88269 15.1152 7.315 15.1152 6.56293C15.1152 6.07567 15.1467 6.01211 15.7343 5.42953C16.0805 5.09056 16.4058 4.71983 16.4687 4.6139C16.5736 4.41264 16.5632 4.41264 16.0281 4.59272C15.1362 4.91049 15.0103 4.86812 15.451 4.39146C15.7762 4.0525 16.1645 3.43813 16.1645 3.25806C16.1645 3.22628 16.0071 3.27924 15.8287 3.37458C15.6398 3.4805 15.2202 3.63939 14.9054 3.73472L14.3388 3.91479L13.8247 3.56524C13.5414 3.37458 13.1427 3.16273 12.9329 3.09917C12.3978 2.95087 11.5794 2.97206 11.0967 3.14154C9.7852 3.6182 8.95632 4.84694 9.05075 6.19219Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Twitter</span></a
                                >
                                <!-- <a
                                    class="modal__share-button instagram"
                                    target="_blank"
                                    :href="instagramLink"
                                    data-size="large"
                                    ><svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.9644 6.11605C15.9316 5.37217 15.8113 4.86077 15.6389 4.41762C15.4611 3.94724 15.1876 3.52611 14.8292 3.17601C14.4791 2.82048 14.0551 2.54421 13.59 2.36921C13.1442 2.19689 12.6354 2.0766 11.8914 2.0438C11.1418 2.00823 10.9039 2 9.00272 2C7.10159 2 6.86363 2.00823 6.11684 2.04102C5.37282 2.07382 4.86131 2.19422 4.41819 2.36644C3.94761 2.54421 3.5264 2.8177 3.17624 3.17601C2.82063 3.52611 2.54442 3.95002 2.36928 4.41495C2.19693 4.86077 2.07661 5.3694 2.04381 6.11327C2.00823 6.8627 2 7.10062 2 9.00139C2 10.9022 2.00823 11.1401 2.04103 11.8867C2.07384 12.6306 2.19426 13.142 2.36661 13.5852C2.54442 14.0555 2.82063 14.4767 3.17624 14.8268C3.5264 15.1823 3.95039 15.4586 4.41541 15.6336C4.86131 15.8059 5.37004 15.9262 6.11416 15.959C6.86085 15.9919 7.09892 16 9.00005 16C10.9012 16 11.1391 15.9919 11.8859 15.959C12.63 15.9262 13.1415 15.8059 13.5846 15.6336C14.5256 15.2698 15.2697 14.5259 15.6335 13.5852C15.8057 13.1393 15.9262 12.6306 15.959 11.8867C15.9918 11.1401 16 10.9022 16 9.00139C16 7.10062 15.9972 6.8627 15.9644 6.11605ZM14.7034 11.832C14.6733 12.5158 14.5584 12.885 14.4627 13.1311C14.2274 13.741 13.7433 14.2251 13.1332 14.4603C12.887 14.556 12.5151 14.6709 11.8339 14.7009C11.0953 14.7338 10.8738 14.7419 9.0055 14.7419C7.13718 14.7419 6.91289 14.7338 6.17699 14.7009C5.49313 14.6709 5.12385 14.556 4.87766 14.4603C4.57409 14.3482 4.29777 14.1704 4.07348 13.9379C3.84097 13.7109 3.66317 13.4374 3.55097 13.1339C3.45523 12.8877 3.34037 12.5158 3.31034 11.8348C3.27743 11.0964 3.26931 10.8748 3.26931 9.00684C3.26931 7.13887 3.27743 6.91463 3.31034 6.17898C3.34037 5.49525 3.45523 5.12603 3.55097 4.87989C3.66317 4.57627 3.84097 4.30011 4.07626 4.07576C4.30322 3.84329 4.57676 3.66552 4.88044 3.55345C5.12663 3.45773 5.49869 3.34289 6.17977 3.31276C6.91834 3.27996 7.13995 3.27174 9.00817 3.27174C10.8793 3.27174 11.1008 3.27996 11.8367 3.31276C12.5205 3.34289 12.8898 3.45773 13.136 3.55345C13.4396 3.66552 13.7159 3.84329 13.9402 4.07576C14.1727 4.30278 14.3505 4.57627 14.4627 4.87989C14.5584 5.12603 14.6733 5.49792 14.7034 6.17898C14.7362 6.9174 14.7445 7.13887 14.7445 9.00684C14.7445 10.8748 14.7362 11.0936 14.7034 11.832Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M9 5C6.79171 5 5 6.79159 5 9C5 11.2084 6.79171 13 9 13C11.2084 13 13 11.2084 13 9C13 6.79159 11.2084 5 9 5ZM9 11.5947C7.56737 11.5947 6.4053 10.4327 6.4053 9C6.4053 7.56725 7.56737 6.4053 9 6.4053C10.4327 6.4053 11.5947 7.56725 11.5947 9C11.5947 10.4327 10.4327 11.5947 9 11.5947V11.5947Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M14 5C14 5.55223 13.5523 6 12.9999 6C12.4477 6 12 5.55223 12 5C12 4.44764 12.4477 4 12.9999 4C13.5523 4 14 4.44764 14 5V5Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Instagram</span></a
                                > -->
                                <a class="modal__share-button facebook" target="_blank" :href="facebookLink" data-size="large"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.3438 16V8.99918H12.2763L12.5324 6.58666H10.3438L10.347 5.37917C10.347 4.74995 10.4068 4.41279 11.3106 4.41279H12.5187V2H10.5859C8.26429 2 7.44714 3.17033 7.44714 5.13846V6.58693H6V8.99945H7.44714V16H10.3438Z"
                                            fill="white"
                                        />
                                    </svg>

                                    <span>Facebook</span></a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <canvas style="display: none" id="canvas"></canvas>
    </main>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import "aos/dist/aos.css";
import EventBus from "../event-bus";
import AOS from "aos";
import html2canvas from "html2canvas";

export default {
    name: "Valentine",
    components: {
        EmailSubscribe: () => import("../components/EmailSubscription")
    },
    data() {
        return {
            message: null,
            amount: 0,
            errors: {},
            itemData: {},
            loading: false,
            search: null,
            activePortfolio: null,
            allPortfolios: [
                {
                    name: "Apple Inc",
                    symbol: "AAPL"
                },
                {
                    name: "Netflix Inc.",
                    symbol: "NFLX"
                },
                {
                    name: "Tesla Inc.",
                    symbol: "TSLA"
                },
                {
                    name: "Guaranty Trust Bank",
                    symbol: "GUARANTY"
                },
                {
                    name: "S&P 500 (SPDR ETF)",
                    symbol: "SPY"
                }
            ],
            showModal: false,
            finalImage: null,
            tempUrl: null
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth", "getSearchInstruments", "getValResult", "getErrorLog"]),
        searchStocks() {
            if (this.search) {
                const splice = [...this.getSearchInstruments].splice(0, 5);
                return splice;
            }
            return this.allPortfolios;
        },
        colorClass() {
            if (this.getValResult.netEarning >= 0) return "green";
            return "val-red";
        },
        facebookLink() {
            return "https://web.facebook.com/sharer/sharer.php?u=https://chaka.ng/relationship-calculator&hashtag=%23valentine&_rdc=1&_rdr";
        },
        twitterLink() {
            return "https://twitter.com/intent/tweet?text=This is my relationship net-worth. Find out yours https://chaka.ng/relationship-calculator";
        },
        whatsappLink() {
            return "https://api.whatsapp.com/send?text=This is my relationship net-worth. Find out yours https://chaka.ng/relationship-calculator";
        }
    },
    methods: {
        ...mapActions(["SEARCH_INSTRUMENTS", "GET_VAL_RESULT"]),
        ...mapMutations(["MODAL_OPENED", "RESET_REQ"]),
        async startSearch() {
            this.resetSymbols();
            const payload = { query: this.search };
            await this.SEARCH_INSTRUMENTS(payload);
        },
        setActive(symbol) {
            this.errors = {};
            if (symbol === this.activePortfolio) {
                this.itemData.symbol = null;
                this.activePortfolio = null;
            } else {
                this.activePortfolio = symbol;
                this.itemData.symbol = symbol;
            }
        },
        closeModal() {
            EventBus.$emit("MODAL_CLOSED");
            this.MODAL_OPENED(false);
            this.showModal = false;
        },
        getResult() {
            this.RESET_REQ();
            if (!this.itemData.duration) {
                this.$set(this.errors, "duration", true);
            }
            if (!this.itemData.amount) {
                this.$set(this.errors, "amount", true);
            }
            if (!this.itemData.symbol) {
                this.$set(this.errors, "symbol", true);
            }
            if (!this.itemData.interval) {
                this.$set(this.errors, "interval", true);
            }
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            this.loading = true;
            const payload = { ...this.itemData };
            payload.amount *= 100;
            this.GET_VAL_RESULT(payload).then(resp => {
                this.loading = false;
                if (resp) {
                    this.showModal = true;
                    this.MODAL_OPENED(true);
                    setTimeout(() => {
                        this.createImage();
                    }, 100);
                }
            });
        },
        checkGiftValue() {
            if (this.amount !== "manual") {
                this.itemData.amount = this.amount;
            }
        },
        resetSymbols() {
            this.activePortfolio = null;
            this.itemData.symbol = null;
        },
        async createImage() {
            const node = document.querySelector("#toImage");
            await this.toBase64(this.getValResult.imageUrl);
            html2canvas(node, { useCORS: true }).then(result => {
                const imgSrc = result.toDataURL("image/png");

                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");
                var imageObj1 = new Image();
                var imageObj2 = new Image();
                imageObj1.src = imgSrc;
                imageObj1.onload = () => {
                    canvas.width = imageObj1.width + 500;
                    canvas.height = 1000;
                    context.drawImage(imageObj1, 0, 0, imageObj1.width - 100, imageObj1.height - 100);
                    imageObj2.src = this.tempUrl;
                    imageObj2.onload = () => {
                        context.drawImage(imageObj2, imageObj1.width - 100, 200);
                        // this.finalImage = canvas.toDataURL("image/png");
                    };
                };
                imageObj2.onerror = err => console.error(err);
            });
        },
        toBase64(url) {
            var xhr = new XMLHttpRequest();
            xhr.onload = () => {
                var reader = new FileReader();
                reader.readAsDataURL(xhr.response);
                reader.onload = () => {
                    reader.onloadend = () => {
                        this.tempUrl = reader.result;
                    };
                };
            };
            xhr.onerror = err => console.error(err);
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.send();
        }
    },
    mounted() {
        // this.MODAL_OPENED(true);
        // this.showModal = true;
        document.title = "Chaka - Relationship Net worth Calculator";
        document.getElementsByTagName("meta").keywords.content =
            "nigerian stock exchange, US stock market, nigeria stock market, online investment, investing, capital market, stock trading, stockbroker, stocks, shares, investment passport, chaka, nse, nyse";
        document.getElementsByTagName("meta").description.content =
            "Invest and Trade thousands of companies across 40+ countries through the Nigerian and US Stock Exchanges. Regulated in both Nigeria and the US by Securities Exchange Commission, FINRA, IRS and SIPC.";
        this.itemData.interval = "Y";
        this.itemData.duration = 4;
        this.amount = 1000;
        this.checkGiftValue();
        this.setActive("AAPL");
    },
    created() {
        AOS.init({
            duration: 400,
            delay: 100,
            easing: "ease-in-out",
            mirror: false,
            startEvent: "DOMContentLoaded",
            anchorPlacement: "top-center",
            once: true,
            offset: 50
        });
    }
};
</script>

<style lang="scss" scoped>
.modal {
    &-container {
        padding: 0;
        @include tablet {
            max-width: 848px;
        }
    }
    &-body {
        margin: 0;
        padding: 2rem 3rem;

        @include mobile {
            padding: 2rem 1.5rem;
        }
    }
    &-flex {
        display: flex;
        flex-wrap: wrap;
    }
    &-image {
        display: flex;
        align-items: flex-end;
        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
            max-height: 350px;
            padding-left: 2rem;
            object-position: right;

            @include mobile {
                object-fit: cover;
                object-position: center;
                padding: 0;
                border-radius: 6px;
                margin-bottom: 1rem;
            }
        }
        flex: 0 0 100%;
        @include mobile {
            height: 200px;
            width: 100%;
        }
        @include tablet {
            flex: 0 0 60%;
            max-width: 60%;
        }
    }
    &-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
            word-break: break-word;
        }
        @include mobile {
            order: 1;
        }
        @include tablet {
            h1 {
                display: inline-block;
            }
        }
        @include tablet {
            flex: 0 0 40%;
            max-width: 40%;
        }

        &__box {
            margin-bottom: 1rem;
        }

        &__message {
            line-height: 2;
        }

        &__net-earning {
            font-size: 2rem;
            font-weight: bold;
            line-height: 1.2;
        }

        &__powered {
            text-align: right;
            font-size: 0.725rem;

            svg {
                vertical-align: text-top;
                margin-left: 2px;
            }
        }
    }
    &-socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1rem 0.5rem 1.5rem;
        border: 1px solid $primary;
        max-width: 500px;
        margin: 2rem auto 0;
        box-shadow: 0px 0px 30px 5px rgba($color: $box-shadow, $alpha: 0.425);

        & > div {
            flex: 0 0 100%;
            text-align: center;
            margin-bottom: 1rem;
        }
    }
    &__underlay {
        background-color: rgba($color: $black, $alpha: 0.625);
    }
}
</style>
