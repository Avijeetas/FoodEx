function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        menu(req, res) {

            res.render('customers/menu')
        },
        update(req, res) {
            // let cart = {
            //     items: {
            //         foodId: { item: foodObject, qty: 0 },

            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart

            if (!cart.items[req.body._id]) {

                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }

                cart.totalQty = cart.totalQty + 1;

                cart.totalPrice = cart.totalPrice + req.body.price;
            }
            else {
                cart.items[req.body._id].qty = 1 + cart.items[req.body._id].qty

                cart.totalQty += 1
                cart.totalPrice += req.body.price

            }

            return res.json({ totalQty: req.session.cart.totalQty })
        }


    }
}

module.exports = cartController