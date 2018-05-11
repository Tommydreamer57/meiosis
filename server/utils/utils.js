module.exports = function convertOrders(orders) {
    return reduceOrders(orders).map(totalOrder);
}

function reduceOrders(orders) {
    return orders.reduce((all, curr) => {
        let { order_id, timestamp, product_id, name, price, quantity } = curr;
        let order = all.find(ord => ord.id === order_id)
        if (order) {
            order.products.push({ id: product_id, name, price, quantity });
        } else {
            order = {
                id: order_id,
                timestamp,
                products: [{ id: product_id, name, price, quantity }]
            };
            all.push(order);
        }
        return all;
    }, []);
}

function totalOrder(order) {
    let total = order.products.reduce((total, product) => add(total, multiply(product.price, product.quantity)), 0);
    return Object.assign({}, order, { total });
}

function add(one, two) {
    return toMoney(fromMoney(one) + fromMoney(two));
}

function multiply(price, quantity) {
    price = fromMoney(price);
    return toMoney(price * quantity);
}

function fromMoney(amt) {
    return Number(String(amt).replace(/\$/, ''));
}

function toMoney(amt) {
    console.log(amt);
    return '$' + amt.toFixed(2);
}