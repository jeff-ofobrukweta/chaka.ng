import { mutations, state } from '../../src/store/modules/news';


describe('setItemsByCategory', () => {
    it('should group items by categories and save them to store', () => {
        const state = { itemsByCategories: [] };
        const news = [
            { id: 1, group: 'A' },
            { id: 2, group: 'B' },
            { id: 3, group: 'A' }
        ];
        const newsResult = [
            { id: 1, group: 'A' },
            { id: 2, group: 'B' },
            { id: 3, group: 'A' }
        ];


        mutations.SET_NEWS(state, news);

        expect(state.itemsByCategories).toEqual(newsResult);
    });
});
