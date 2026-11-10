"use strict";
// Exercise 1
const AREAS = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'];
// Exercise 4
function deliveryFee(order) {
    if (order.totalSantim > 50000) {
        return 0;
    }
    if (order.area === 'Bole') {
        return 4000;
    }
    return 6000;
}
// Exercise 5
function statusMessage(status) {
    switch (status) {
        case 'PENDING':
            return 'Waiting for the restaurant to accept your order.';
        case 'PREPARING':
            return 'The restaurant is preparing your food.';
        case 'ON_THE_WAY':
            return 'Your order is on the way.';
        case 'DELIVERED':
            return 'Your order has been delivered. Enjoy your meal!';
        case 'CANCELLED':
            return 'Your order has been cancelled.';
        case 'REFUNDED':
            return 'Your payment has been refunded.';
        default: {
            const unreachable = status;
            return unreachable;
        }
    }
}
// Exercise 6 - helper function
function formatEtb(santim) {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
    }).format(santim / 100);
}
// Exercise 7
function receipt(order) {
    const dishLines = order.dishes
        .map((dish) => `- ${dish.name}: ${formatEtb(dish.priceSantim)}`)
        .join('\n');
    const feeSantim = deliveryFee(order);
    const amountDueSantim = order.totalSantim + feeSantim;
    const telebirrLine = order.telebirrPhone
        ? `TeleBirr phone: ${order.telebirrPhone}`
        : 'TeleBirr phone: Not provided';
    return `
Addis Eats - Order #${order.id}
Customer: ${order.customerName}
Area: ${order.area}
Status: ${statusMessage(order.status)}

Dishes:
${dishLines}

Subtotal: ${formatEtb(order.totalSantim)}
Delivery fee: ${formatEtb(feeSantim)}
Total: ${formatEtb(amountDueSantim)}
${telebirrLine}
  `.trim();
}
// Test
const sampleOrder = {
    id: 'ord_001',
    customerName: 'Abel Kebede',
    area: 'Bole',
    status: 'PREPARING',
    dishes: [
        {
            name: 'Doro Wat',
            priceSantim: 32000,
        },
        {
            name: 'Shiro',
            priceSantim: 18000,
        },
    ],
    telebirrPhone: '0912345678',
    totalSantim: 50000,
};
console.log(receipt(sampleOrder));
