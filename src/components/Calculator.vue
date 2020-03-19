<template>
    <div>
        <section class="calculator">
            <div class="calculator-text">
                <div>
                    <h2 class="hero__title">Do the Maths for yourself.</h2>
                    <br />
                    <p class="hero__text">
                        Calculate your costs upfront using our brokerage calculator. Know your entire brokerage costs and other charges even before you execute your trades - for
                        both local and global stocks.
                    </p>

                    <br />
                    <div class="calculator-body" v-if="getWindowWidth === 'mobile'">
                        <div class="calculator-body__select">
                            <input v-model="search" list="searchstocks" placeholder="Search stocks..." class="form__input" @input="startSearch" />
                            <img v-if="searchLoading" :src="require('../assets/img/loader.gif')" class="calculator-body__loader" alt="Loading..." width="20px" />
                            <div class="calculator-dropdown" v-if="showSearchResults">
                                <ul v-if="getSearchInstruments.length > 0" class="calculator-dropdown__ul">
                                    <li v-for="(stock, i) in filteredSearch" :key="i" class="calculator-dropdown__li">
                                        <a @click="selectStock(stock.symbol)">
                                            <div class="calculator-dropdown__box">
                                                <img :src="stock.logoUrl" :alt="stock.symbol" class="calculator-dropdown__logo" />
                                                <div>
                                                    <p>
                                                        <small>{{ stock.name | truncate(40) }}</small>
                                                    </p>
                                                    <p class="grey-cool">{{ stock.symbol }}</p>
                                                </div>
                                            </div>

                                            <img :src="stockCountry(stock.countryCode)" width="16px" :alt="stock.symbol" class="calculator-dropdown__country" />
                                        </a>
                                    </li>
                                </ul>
                                <div class="calculator-dropdown__empty" v-else>
                                    <p>
                                        There are no instruments related to
                                        <strong>{{ search }}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="calculator-body__select">
                            <select v-model="selectOption" class="form-control" @change="changeOption">
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                                <option value="profit">Net Profit</option>
                            </select>
                        </div>
                        <div class="calculator-body__form">
                            <div class="calculator-body__form--group" v-if="selectOption !== 'sell'">
                                <label>
                                    <span v-if="selectOption === 'buy'">SHARE PRICE</span>
                                    <span v-else>BUY PRICE</span>
                                    <span v-html="selectZone === 'local' ? '(&#8358;)' : '($)'"></span>
                                    <currency-input :currency="selectZone === 'local' ? 'NGN' : 'USD'" placeholder="Price" v-model="buy" @input="changeBuy" />
                                </label>
                            </div>
                            <div class="calculator-body__form--group" v-if="selectOption !== 'buy'">
                                <label>
                                    <span v-if="selectOption === 'sell'">SHARE PRICE</span>
                                    <span v-else>SELL PRICE</span>
                                    <span v-html="selectZone === 'local' ? '(&#8358;)' : '($)'"></span>
                                    <currency-input :currency="selectZone === 'local' ? 'NGN' : 'USD'" placeholder="Price" v-model="sell" @input="changeSell" />
                                </label>
                            </div>
                            <div class="calculator-body__form--group">
                                <label for>NO. OF SHARES <form-input name="quantity" type="number" placeholder="0" v-model="quantity" @input="changeQty" :min="0"/></label>
                            </div>
                        </div>
                        <div class="calculator-body__radio">
                            <label for="nse">
                                <input type="radio" name="calculator" id="market-order" value="local" v-model="selectZone" @change="changeZone" />
                                Local</label
                            >
                            <label for="bse"> <input type="radio" name="calculator" id="bse" value="global" v-model="selectZone" @change="changeZone" />Global</label>
                        </div>
                        <ul class="calculator__data" v-if="selectOption === 'buy' && selectZone === 'local'">
                            <li v-for="(list, index) in localBuyList" :key="index" class="calculator__data-row">
                                <p>{{ list.name }}</p>
                                <h6>{{ list.value | currency("NGN") }}</h6>
                            </li>
                        </ul>
                        <ul class="calculator__data" v-else-if="selectOption === 'sell' && selectZone === 'local'">
                            <li v-for="(list, index) in localSellList" :key="index" class="calculator__data-row">
                                <p>{{ list.name }}</p>
                                <h6>{{ list.value | currency("NGN") }}</h6>
                            </li>
                        </ul>
                        <ul class="calculator__data" v-else-if="selectOption === 'profit' && selectZone === 'local'">
                            <li v-for="(list, index) in localProfitList" :key="index" class="calculator__data-row">
                                <p>{{ list.name }}</p>
                                <h6>{{ list.value | currency("NGN") }}</h6>
                            </li>
                        </ul>
                        <ul class="calculator__data" v-else-if="selectZone === 'global'">
                            <li v-for="(list, index) in globalList" :key="index" class="calculator__data-row">
                                <p>{{ list.name }}</p>
                                <h6>{{ list.value | currency("USD") }}</h6>
                            </li>
                        </ul>
                        <div class="calculator__data-row">
                            <h4>{{ selectOption === "profit" ? "Net Profit" : "Total" }}</h4>
                            <h4>
                                {{ total.value | currency(selectZone === "local" ? "NGN" : "USD") }}
                            </h4>
                        </div>
                    </div>

                    <p class="grey-dark">COMPULSORY REGULATORY FEES</p>
                    <div v-for="(item, i) in fees" :key="i">
                        <p class="grey-cool">{{ item.title }}</p>
                        <p v-html="item.text"></p>
                        <br />
                    </div>
                </div>
            </div>
            <div class="calculator-body" v-if="getWindowWidth !== 'mobile'">
                <div class="calculator-body__select">
                    <input v-model="search" list="searchstocks" placeholder="Search stocks..." class="form__input" @input="startSearch" />
                    <img v-if="searchLoading" :src="require('../assets/img/loader.gif')" class="calculator-body__loader" alt="Loading..." width="20px" />
                    <div class="calculator-dropdown" v-if="showSearchResults">
                        <ul v-if="getSearchInstruments.length > 0" class="calculator-dropdown__ul">
                            <li v-for="(stock, i) in filteredSearch" :key="i" class="calculator-dropdown__li">
                                <a @click="selectStock(stock.symbol)">
                                    <div class="calculator-dropdown__box">
                                        <img :src="stock.logoUrl" :alt="stock.symbol" class="calculator-dropdown__logo" />
                                        <div>
                                            <p>
                                                <small>{{ stock.name | truncate(40) }}</small>
                                            </p>
                                            <p class="grey-cool">{{ stock.symbol }}</p>
                                        </div>
                                    </div>

                                    <img :src="stockCountry(stock.countryCode)" width="16px" :alt="stock.symbol" class="calculator-dropdown__country" />
                                </a>
                            </li>
                        </ul>
                        <div class="calculator-dropdown__empty" v-else>
                            <p>
                                There are no instruments related to
                                <strong>{{ search }}</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="calculator-body__select">
                    <select v-model="selectOption" class="form-control" @change="changeOption">
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                        <option value="profit">Net Profit</option>
                    </select>
                </div>
                <div class="calculator-body__form">
                    <div class="calculator-body__form--group" v-if="selectOption !== 'sell'">
                        <label>
                            <span v-if="selectOption === 'buy'">SHARE PRICE</span>
                            <span v-else>BUY PRICE</span>
                            <span v-html="selectZone === 'local' ? '(&#8358;)' : '($)'"></span>
                            <currency-input :currency="selectZone === 'local' ? 'NGN' : 'USD'" placeholder="Buy Price" v-model="buy" @input="changeBuy" />
                        </label>
                    </div>
                    <div class="calculator-body__form--group" v-if="selectOption !== 'buy'">
                        <label>
                            <span v-if="selectOption === 'sell'">SHARE PRICE</span>
                            <span v-else>SELL PRICE</span>
                            <span v-html="selectZone === 'local' ? '(&#8358;)' : '($)'"></span>
                            <currency-input :currency="selectZone === 'local' ? 'NGN' : 'USD'" placeholder="Sell Price" v-model="sell" @input="changeSell" />
                        </label>
                    </div>
                    <div class="calculator-body__form--group">
                        <label for>NO. OF SHARES <form-input name="quantity" type="number" placeholder="0" v-model="quantity" @input="changeQty"/></label>
                    </div>
                </div>
                <div class="calculator-body__radio">
                    <label for="nse">
                        <input type="radio" name="calculator" id="market-order" value="local" v-model="selectZone" @change="changeZone" />
                        Local</label
                    >
                    <label for="bse"> <input type="radio" name="calculator" id="bse" value="global" v-model="selectZone" @change="changeZone" />Global</label>
                </div>
                <ul class="calculator__data" v-if="selectOption === 'buy' && selectZone === 'local'">
                    <li v-for="(list, index) in localBuyList" :key="index" class="calculator__data-row">
                        <p>{{ list.name }}</p>
                        <h6>{{ list.value | currency("NGN") }}</h6>
                    </li>
                </ul>
                <ul class="calculator__data" v-else-if="selectOption === 'sell' && selectZone === 'local'">
                    <li v-for="(list, index) in localSellList" :key="index" class="calculator__data-row">
                        <p>{{ list.name }}</p>
                        <h6>{{ list.value | currency("NGN") }}</h6>
                    </li>
                </ul>
                <ul class="calculator__data" v-else-if="selectOption === 'profit' && selectZone === 'local'">
                    <li v-for="(list, index) in localProfitList" :key="index" class="calculator__data-row">
                        <p>{{ list.name }}</p>
                        <h6>{{ list.value | currency("NGN") }}</h6>
                    </li>
                </ul>
                <ul class="calculator__data" v-else-if="selectZone === 'global'">
                    <li v-for="(list, index) in globalList" :key="index" class="calculator__data-row">
                        <p>{{ list.name }}</p>
                        <h6>{{ list.value | currency("USD") }}</h6>
                    </li>
                </ul>
                <div class="calculator__data-row">
                    <h4>{{ selectOption === "profit" ? "Net Profit" : "Total" }}</h4>
                    <h4>
                        {{ total.value | currency(selectZone === "local" ? "NGN" : "USD") }}
                    </h4>
                </div>
            </div>
        </section>

        <section class="calculator-pricing">
            <h6 class="text-center grey-cool">Find out our rates</h6>
            <h2 class="text-center">Pricing</h2>
            <div class="card-pricing__box">
                <div class="card-pricing">
                    <h4 class="card-pricing__title">Local</h4>
                    <div class="card-pricing__body">
                        <div class="card-pricing__section">
                            <h4>&#8358;100 or 0.5%</h4>
                            <p>Broker Commissions</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>&#8358;0</h4>
                            <p>Account Opening Fee</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>&#8358;0</h4>
                            <p>Monthly Acct Maintenance</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>0%</h4>
                            <p>FX Fees</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>&#8358;1000</h4>
                            <p>Minimum Deposit</p>
                        </div>
                    </div>
                </div>
                <div class="card-pricing">
                    <h4 class="card-pricing__title">Global</h4>
                    <div class="card-pricing__body card-pricing__global">
                        <div class="card-pricing__section">
                            <h4 class="v2-pricing__mobile"><span class="stroke">$5</span> $2 or 1%</h4>
                            <p>Broker Commissions</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>$0</h4>
                            <p>Account Opening Fee</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>$0</h4>
                            <p>Monthly Acct Maintenance</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>0%</h4>
                            <p>FX Fees</p>
                        </div>
                        <div class="card-pricing__section">
                            <h4>$10</h4>
                            <p>Minimum Deposit</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "calculator",
    props: {
        dashboard: {
            type: Boolean
        }
    },
    components: {
        CurrencyInput: () => import("./form/CurrencyInput")
    },
    data() {
        return {
            selectOption: "buy",
            selectZone: "local",
            search: "",
            selectedStock: "",
            hideSearch: true,
            buy: null,
            sell: null,
            quantity: null,
            searchLoading: false,
            fees: [
                {
                    title: `
                        Securities & Exchange Commission, Nigeria (SEC) fee`,
                    text: `The SEC regulates the capital market, and one of its objectives is to
                        protect investors. There’s an SEC fee of
                        <strong>0.3%</strong> when you buy a stock.`
                },
                {
                    title: `
                        Nigerian Stock Exchange (NSE) fee`,
                    text: `
                        The NSE provides the exchange hub to buy and sell securities. There’s an NSE
                        fee of
                        <strong>0.3%</strong> when you sell a stock.`
                },
                {
                    title: `
                       Central Securities Clearing System (CSCS) fee`,
                    text: `
                        The CSCS ensures the ease of transfer and settlement of securities on the
                        Nigerian stock market. The CSCS fee when you sell a stock is
                        <strong>0.378%</strong> (including trade alert); and when buying, there’s a
                        CSCS trade alert fee of <strong>0.063%</strong>. Both charges are VAT
                        Inclusive.`
                },
                {
                    title: `
                       Stamp Duties`,
                    text: `
                        As required by Nigerian laws, stamp duties are imposed at the rate of
                        <strong>0.075%</strong> on every share bought or sold on the Nigerian stock
                        exchange.`
                }
            ],
            localBuyList: [
                {
                    name: "Investment",
                    value: 0
                },
                {
                    name: "SEC Fees",
                    value: 0
                },
                {
                    name: "CSCS Fees",
                    value: 0
                },
                {
                    name: "Stamp Duties",
                    value: 0
                },
                {
                    name: "Brokerage Fees (VAT Inclusive)",
                    value: 0
                }
            ],
            localSellList: [
                {
                    name: "Investment",
                    value: 0
                },
                {
                    name: "NSE Fees",
                    value: 0
                },
                {
                    name: "CSCS Fees",
                    value: 0
                },
                {
                    name: "Stamp Duties",
                    value: 0
                },
                {
                    name: "Brokerage Fees (VAT Inclusive)",
                    value: 0
                }
            ],
            localProfitList: [
                {
                    name: "Investment",
                    value: 0
                },
                {
                    name: "NSE/SEC Fees",
                    value: 0
                },
                {
                    name: "CSCS Fees",
                    value: 0
                },
                {
                    name: "Stamp Duties",
                    value: 0
                },
                {
                    name: "Brokerage Fees (VAT Inclusive)",
                    value: 0
                }
            ],
            globalList: [
                {
                    name: "Investment",
                    value: 0
                },
                {
                    name: "Broker & Regulatory Fee (VAT Inclusive)",
                    value: 0
                }
            ],
            total: {
                name: "Total",
                value: 0
            },
            totalValue: 0,
            totalBuy: 0,
            totalSell: 0
        };
    },
    computed: {
        ...mapGetters(["getWindowWidth", "getSearchInstruments", "getCalcInstrument"]),
        filteredSearch() {
            const splice = [...this.getSearchInstruments].splice(0, 4);
            return splice;
        },
        showSearchResults() {
            return this.search && !this.searchLoading && this.search !== this.selectedStock;
        },
        calcAskPrice() {
            return this.getCalcInstrument.InstrumentDynamic.askPrice / 100;
        }
    },
    methods: {
        ...mapMutations(["SET_SEARCH_INSTRUMENTS"]),
        ...mapActions(["SEARCH_INSTRUMENTS", "GET_CALC_INSTRUMENT"]),
        async changeOption() {
            await this.clearFields();
            if (this.selectedStock) {
                this.selectStock(this.selectedStock);
            }
        },
        async startSearch() {
            this.SET_SEARCH_INSTRUMENTS([]);
            if (this.search) {
                const payload = { query: this.search };
                this.searchLoading = true;
                await this.SEARCH_INSTRUMENTS(payload);
                this.searchLoading = false;
            }
        },
        async selectStock(symbol) {
            this.selectedStock = symbol;
            this.search = this.selectedStock;
            this.searchLoading = true;
            await this.GET_CALC_INSTRUMENT({ symbols: this.selectedStock });
            this.searchLoading = false;
            this.selectZone = this.getCalcInstrument.currency === "USD" ? "global" : "local";
            if (this.selectOption === "sell") {
                this.sell = this.calcAskPrice;
                this.changeSell();
            } else {
                this.buy = this.calcAskPrice;
                this.changeBuy();
            }
        },
        stockCountry(countryCode) {
            if (countryCode) return `https://chaka-storage.s3-eu-west-1.amazonaws.com/images/ui/flags/${countryCode.toLowerCase()}-flag.svg`;
            return "zz";
        },
        async changeZone() {
            await this.clearFields();
            this.search = "";
            this.selectedStock = "";
        },
        changeBuy() {
            if (this.calcAskPrice !== this.buy) {
                this.selectedStock = null;
                this.search = "";
            }
            const localZone = this.selectZone === "local";
            if (this.selectOption !== "profit") {
                if (!this.buy && this.quantity) {
                    this.totalValue = 0;
                    this.total.value = 0;
                } else if (!this.buy) {
                    this.totalValue = this.quantity || 0;
                } else if (!this.totalValue) {
                    if (!this.quantity) {
                        this.totalValue = this.buy;
                    } else {
                        this.totalValue = this.buy * this.quantity;
                    }
                } else if (!this.quantity) {
                    this.totalValue = this.buy;
                } else {
                    this.totalValue = this.buy * this.quantity;
                }
                this.calculateBuy(localZone ? "local" : "global");
            } else {
                if (!this.buy) {
                    this.totalBuy = 0;
                    if (!this.quantity) {
                        this.totalSell = this.sell;
                    } else {
                        this.totalSell = this.sell * this.quantity;
                    }
                } else if (!this.sell) {
                    this.totalSell = 0;
                    if (!this.quantity) {
                        this.totalBuy = this.buy;
                    } else {
                        this.totalBuy = this.buy * this.quantity;
                    }
                } else if (!this.quantity) {
                    this.totalBuy = this.buy;
                    this.totalSell = this.sell;
                } else {
                    this.totalBuy = this.buy * this.quantity;
                    this.totalSell = this.sell * this.quantity;
                }
                this.calculateProfit(localZone ? "local" : "global");
            }
        },
        changeSell() {
            if (this.calcAskPrice !== this.sell && this.selectOption === "sell") {
                this.selectedStock = null;
                this.search = "";
            }
            const localZone = this.selectZone === "local";
            if (this.selectOption !== "profit") {
                if (!this.sell && this.quantity) {
                    this.totalValue = 0;
                    this.total.value = 0;
                } else if (!this.sell) {
                    this.totalValue = this.quantity || 0;
                } else if (!this.totalValue) {
                    if (!this.quantity) {
                        this.totalValue = this.sell;
                    } else {
                        this.totalValue = this.sell * this.quantity;
                    }
                } else if (!this.quantity) {
                    this.totalValue = this.sell;
                } else {
                    this.totalValue = this.sell * this.quantity;
                }
                this.calculateSell(localZone ? "local" : "global");
            } else {
                if (!this.buy) {
                    this.totalBuy = 0;
                    if (!this.quantity) {
                        this.totalSell = this.sell;
                    } else {
                        this.totalSell = this.sell * this.quantity;
                    }
                } else if (!this.sell) {
                    this.totalSell = 0;
                    if (!this.quantity) {
                        this.totalBuy = this.buy;
                    } else {
                        this.totalBuy = this.buy * this.quantity;
                    }
                } else if (!this.quantity) {
                    this.totalBuy = this.buy;
                    this.totalSell = this.sell;
                } else {
                    this.totalBuy = this.buy * this.quantity;
                    this.totalSell = this.sell * this.quantity;
                }
                this.calculateProfit(localZone ? "local" : "global");
            }
        },
        changeQty() {
            const localZone = this.selectZone === "local";
            if (this.selectOption === "buy") {
                if (!this.quantity) {
                    this.totalValue = this.buy || 0;
                } else if (!this.totalValue) {
                    this.totalValue = this.quantity;
                } else {
                    this.totalValue = this.buy * this.quantity;
                }
                this.calculateBuy(localZone ? "local" : "global");
            } else if (this.selectOption === "sell") {
                if (!this.quantity) {
                    this.totalValue = this.sell || 0;
                } else if (!this.totalValue) {
                    this.totalValue = this.quantity;
                } else {
                    this.totalValue = this.sell * this.quantity;
                }
                this.calculateSell(localZone ? "local" : "global");
            } else {
                if (!this.buy) {
                    this.totalBuy = 0;
                    if (!this.quantity) {
                        this.totalSell = this.sell;
                    } else {
                        this.totalSell = this.sell * this.quantity;
                    }
                } else if (!this.sell) {
                    this.totalSell = 0;
                    if (!this.quantity) {
                        this.totalBuy = this.buy;
                    } else {
                        this.totalBuy = this.buy * this.quantity;
                    }
                } else if (!this.quantity) {
                    this.totalBuy = this.buy;
                    this.totalSell = this.sell;
                } else {
                    this.totalBuy = this.buy * this.quantity;
                    this.totalSell = this.sell * this.quantity;
                }
                this.calculateProfit(localZone ? "local" : "global");
            }
        },
        calculateBuy(zone) {
            let temp = 0;
            let tempBroker = 0;
            if (zone === "local") {
                this.localBuyList[0].value = +this.totalValue;
                this.localBuyList[1].value = (this.totalValue * 0.3) / 100;
                this.localBuyList[2].value = (this.totalValue * 0.063) / 100;
                this.localBuyList[3].value = (this.totalValue * 0.075) / 100;
                this.totalValue = parseFloat(this.totalValue);
                temp = (this.totalValue * 0.5) / 100;
                tempBroker = temp <= 100 ? 100 : temp;
                this.localBuyList[4].value = (7.5 / 100) * tempBroker + tempBroker;
                this.total.value = this.totalValue + this.localBuyList[1].value + this.localBuyList[2].value + this.localBuyList[3].value + this.localBuyList[4].value;
            } else if (zone === "global") {
                this.totalValue = +this.totalValue;
                this.globalList[0].value = this.totalValue;
                temp = this.totalValue / 100;
                tempBroker = temp <= 2 ? 2 : temp;
                this.globalList[1].value = (7.5 / 100) * tempBroker + tempBroker;
                this.total.value = this.totalValue + this.globalList[1].value;
            }
        },
        calculateSell(zone) {
            let temp = 0;
            let tempBroker = 0;
            this.totalValue = parseFloat(this.totalValue);
            if (zone === "local") {
                this.localSellList[0].value = +this.totalValue;
                this.localSellList[1].value = (this.totalValue * 0.3) / 100;
                this.localSellList[2].value = (this.totalValue * 0.378) / 100;
                this.localSellList[3].value = (this.totalValue * 0.075) / 100;
                temp = (this.totalValue * 0.5) / 100;
                tempBroker = temp <= 100 ? 100 : temp;
                this.localSellList[4].value = (7.5 / 100) * tempBroker + tempBroker;
                this.total.value = this.totalValue - this.localSellList[1].value - this.localSellList[2].value - this.localSellList[3].value - this.localSellList[4].value;
            } else if (zone === "global") {
                this.globalList[0].value = +this.totalValue;
                temp = this.totalValue / 100;
                tempBroker = temp <= 2 ? 2 : temp;
                this.globalList[1].value = (7.5 / 100) * tempBroker + tempBroker;
                this.total.value = +this.totalValue - this.globalList[1].value;
            }
        },
        calculateProfit(zone) {
            let temp = 0;
            let tempBuy = 0;
            let tempSell = 0;
            let tempBrokerBuy = 0;
            let tempBrokerSell = 0;
            this.totalBuy = parseFloat(this.totalBuy);
            this.totalSell = parseFloat(this.totalSell);
            if (zone === "local") {
                this.localBuyList[0].value = this.totalBuy;
                this.localBuyList[1].value = (this.totalBuy * 0.3) / 100;
                this.localBuyList[2].value = (this.totalBuy * 0.063) / 100;
                this.localBuyList[3].value = (this.totalBuy * 0.075) / 100;
                temp = (this.totalBuy * 0.5) / 100;
                tempBrokerBuy = temp <= 100 ? 100 : temp;
                this.localBuyList[4].value = (7.5 / 100) * tempBrokerBuy + tempBrokerBuy;
                if (this.totalBuy) {
                    tempBuy = this.totalBuy + this.localBuyList[1].value + this.localBuyList[2].value + this.localBuyList[3].value + this.localBuyList[4].value;
                }

                this.localSellList[0].value = this.totalSell;
                this.localSellList[1].value = (this.totalSell * 0.3) / 100;
                this.localSellList[2].value = (this.totalSell * 0.378) / 100;
                this.localSellList[3].value = (this.totalSell * 0.075) / 100;
                temp = (this.totalSell * 0.5) / 100;
                tempBrokerSell = temp <= 100 ? 100 : temp;
                this.localBuyList[4].value = (7.5 / 100) * tempBrokerSell + tempBrokerSell;
                if (this.totalSell) {
                    tempSell = this.totalSell - this.localSellList[1].value - this.localSellList[2].value - this.localSellList[3].value - this.localSellList[4].value;
                }

                // this.localProfitList[0].value =
                //     this.localSellList[0].value - this.localBuyList[0].value;
                this.localProfitList[0].value = this.localBuyList[0].value;
                this.localProfitList[1].value = this.localBuyList[1].value + this.localSellList[1].value;
                this.localProfitList[2].value = this.localBuyList[2].value + this.localSellList[2].value;
                this.localProfitList[3].value = this.localBuyList[3].value + this.localSellList[3].value;
                this.localProfitList[4].value = this.localBuyList[4].value + (this.totalSell ? this.localSellList[4].value : 0);
                this.total.value = tempSell - tempBuy;
            } else if (zone === "global") {
                const sellCharge = this.totalSell / 100;
                const buyCharge = this.totalBuy / 100;
                let tempSellCharge = 0;
                let tempBuyCharge = 0;

                if (this.totalBuy) tempBuyCharge = buyCharge <= 2 ? 2 : buyCharge;
                if (this.totalSell) tempSellCharge = sellCharge <= 2 ? 2 : sellCharge;

                tempBuy = this.totalBuy + tempBuyCharge;
                tempSell = this.totalSell - tempSellCharge;
                this.globalList[0].value = this.totalSell - this.totalBuy;
                this.globalList[1].value = tempSellCharge + tempBuyCharge;
                this.total.value = tempSell - tempBuy;
            }
        },
        clearFields() {
            this.buy = null;
            this.sell = null;
            this.quantity = null;
            this.totalValue = 0;
            this.total.value = 0;
            this.totalBuy = 0;
            this.totalSell = 0;
            this.localBuyList.forEach((el, index) => {
                this.localBuyList[index].value = 0;
                this.localSellList[index].value = 0;
                this.localProfitList[index].value = 0;
            });
            this.globalList[0].value = 0;
            this.globalList[1].value = 0;
            return true;
        }
    },
    watch: {
        buy(newVal) {
            if (!newVal) this.buy = null;
        },
        sell(newVal) {
            if (!newVal) this.sell = null;
        }
    }
};
</script>
