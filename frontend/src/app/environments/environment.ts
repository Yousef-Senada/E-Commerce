export const environment = {
    dev: false,
    apiUrl: '',
};

if (environment.dev) {
    environment.apiUrl = 'http://localhost:3000/';
} else {
    environment.apiUrl = 'https://e-commerce-api-ruddy.vercel.app/';
}
