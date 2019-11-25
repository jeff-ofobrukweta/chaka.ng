<template>
    <div class="graphholder">
            <div class="header-container">
                <div class="right-menue-item">
                    <div class="parent-container-main">
                        <section class="btn-sell"><button>Buy</button></section>
                        <section class="toogle-section">
                                <section class="option-container">
                                    <button class="btn-one">$</button>
                                    <button  class="btn-two">₦</button>
                                    <button>
                                        <div id="select" class="dropdown">
                                        <select class="drop-down">
                                            <option class="option">MONTH</option>
                                            <option class="option" value="1Y">1Y</option>
                                            <option class="option" value="1W">1W</option>
                                            <option class="option" value="1M">1M</option>
                                        </select>
                                        </div>
                                    </button>
                                </section>
                        </section>
                    </div>
                        <section class="btn-parent-container">
                            <section class="btn-container">
                                <button class="option">
                                    Normal
                                </button>
                                <button class="option">Technical</button>
                            </section>
                        </section>
                   
                </div>
            </div>
        <Graph/>
    </div>
</template>
<script>
import Graph from './linegraph';
export default {
  name: 'Linechartgraphchild',
  components: {
    Graph,
  },
};
</script>
<style src="../../assets/scss/components/singlelinebase.scss" lang="scss" scoped />
