const Order = require("../models/Order");
const DetailOrder = require("../models/DetailOrder");
const Product = require("../models/Product");

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

const getBenefitAllProduct = async (req, res) => {
  try {
    const orderPaid = await Order.find({ status: 0 }); //loc hoa don da ban
    const orderId = orderPaid.map((item) => item._id); // lay orderid
    const detailPaid = await DetailOrder.find({ orderId: { $in: orderId } }); //tim orderid trong detailOrder
    let result = groupBy(detailPaid, "productId"); // groupby productId:[{}];
    let statistic = [];
    for (key in result) {
      // for qua tung key object
      const quantitys = result[key].map((item) => item.quantify); // tra ra quantity; 1 product : 2,3,4
      statistic.push({
        productId: key,
        quantity: quantitys.reduce((val, cur) => val + cur, 0),
      });
    }

    let staReturn = [];

    for (const index in statistic) {
      const product = await Product.findOne({
        _id: statistic[index].productId,
      });
      const sta = {
        product,
        totalQuantity: statistic[index].quantity,
        totalMoney: statistic[index].quantity * product.prices,
      };
      staReturn.push(sta);
    }

    return res.json({ success: true, statistic: staReturn });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

module.exports = { getBenefitAllProduct };
