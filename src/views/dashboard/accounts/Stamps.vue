<template>
    <Fragment>
        <!-- stamps start here -->
        <Stampscomponent :stamplists="getPositions.global || {}" />
        <!-- stamps end here -->
    </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import StatementsCard from '../../../components/accounts/StatementsCard';
import Stampscomponent from '../../../components/stamps_and_certificates/stamps';

export default {
    name: 'accounts-stamps',
    components: {
        StatementsCard,
        Stampscomponent,
        Fragment
    },
    data() {
        return {
            activeButton: 1,
            statementButtons: [
                {
                    name: 'Statement',
                    value: 1
                },
                {
                    name: 'Confirmations',
                    value: 2
                },
                {
                    name: 'Tax',
                    value: 3
                }
            ],
            statements: [
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                },
                {
                    description: 'Description',
                    detail: '2018 Tax Year 1099-B',
                    link: ''
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['getPositions'])
    },
    methods: {
        ...mapActions(['FETCH_POSITIONS_INSTRUMENTS'])
    },
    mounted() {
        this.FETCH_POSITIONS_INSTRUMENTS();
    }
};
</script>
