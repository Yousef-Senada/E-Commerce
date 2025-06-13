export const environment = {
    dev: false,
    apiUrl: 'https://purefit-backend.vercel.app/',
};

if (environment.dev) {
    environment.apiUrl = 'http://localhost:3000/';
} else {
    environment.apiUrl = 'https://purefit-backend.vercel.app/';
}
