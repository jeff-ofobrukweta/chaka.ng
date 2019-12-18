const TradeexchangeID = {
    methods: {
        exchangeIDmaping(index) {
            switch (index) {
            case 'NSQ':
                return 'NASDAQ';
            case 'NSENG':
                return 'NSENG';
            case 'NG':
                return 'NSENG';
            case 'NYQ':
                return 'NYSE';

            case 'PCQ':
                return 'AMEX';

            case 'BTQ':
                return 'AMEX';

            case 'NMQ':
                return 'NASDAQ';

            case 'NAQ':
                return 'NASDAQ';

            case 'NYS':
                return 'NYSE';

            case 'IOM':
                return 'ESZT';

            case 'ASQ':
                return '';

            case 'XNAS':
                return 'AMEX';

            case 'NYSE':
                return 'NYSE';

            case 'JCQ':
                return 'AMEX';

            default:
                return 'NASDAQ';
            }
        }
    }
};

export default TradeexchangeID;
