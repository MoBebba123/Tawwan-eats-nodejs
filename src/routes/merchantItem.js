const express = require("express");
const {
  createMerchantItem,
  createMultiChoiseOptions,
  createSingleChoiseOptions,
  deleteSingleChoice,
  getItem,
  deleteMultiChoice,
  updateMerchantItem,
  getMerchantItems,
  getItemV2,
} = require("../controllers/merchantItem");
const { isAuthenticatedMerchant } = require("../middleware/auth");

const router = express.Router();

router
  .route("/merchant/createItem")
  .post(isAuthenticatedMerchant, createMerchantItem);
router
  .route("/merchants/createItem/singlechoise/:id")
  .post(isAuthenticatedMerchant, createSingleChoiseOptions);
router
  .route("/merchants/createItem/multichoise/:id")
  .post(isAuthenticatedMerchant, createMultiChoiseOptions);
router
  .route("/merchant/removeSinglechoice/:itemId/:stepId")
  .put(isAuthenticatedMerchant, deleteSingleChoice);
router
  .route("/merchant/removeMultichoice/:itemId/:stepId")
  .put(isAuthenticatedMerchant, deleteMultiChoice);
router.route("/merchant/item/:itemId").get(isAuthenticatedMerchant, getItem);

router
  .route("/merchantItem/update/:itemId")
  .put(isAuthenticatedMerchant, updateMerchantItem);
router.route("/merchantItems/:merchantId").get(getMerchantItems);
router.route("/v2/:merchantId").get(getItemV2);

module.exports = router;
