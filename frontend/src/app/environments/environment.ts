export const environment = {
    dev: true,
    apiUrl: '',
};

if (environment.dev) {
    environment.apiUrl = 'http://localhost:3000/';
} else {
    environment.apiUrl = 'https://e-commerce-purfit-backend.vercel.app/';
}
