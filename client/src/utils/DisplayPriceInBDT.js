export const DisplayPriceInBDT = (price) => {
    return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0
    }).format(price);
};

//bn-BD 