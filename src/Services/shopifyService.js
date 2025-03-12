import api from './api';

const shopifyService = {
    connectShopify: async (shopDomain) => {
        const response = await api.get(`/shopify/connect/?shop=${shopDomain}`);
        return response.data;
    },
    
    handleCallback: async () => {
        const response = await api.get('/shopify/callback');
        return response.data;
    }
};

export default shopifyService; 