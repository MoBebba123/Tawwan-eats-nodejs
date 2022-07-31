const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const Schema  = mongoose.Schema ;


const stepOptionSchema = new Schema({
  name: { type: String, required: true },
  isFree: { type: Boolean, required: true },
  price: { type: Number, default: 0.0 },
});

const multiChoiceItemStepSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'multi_choice', enum: ['multi_choice'], required: true },
  required: { type: Boolean, required: true },
  minNumberOfChoices: { type: Number, required: true },
  maxNumberOfChoices: { type: Number, required: true },
  options: { type: [stepOptionSchema], required: true },
});

const singleChoiceItemStepSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'single_choice', enum: ['single_choice'], required: true },
  required: { type: Boolean, required: true },
  options: { type: [stepOptionSchema], required: true },
});


const itemGroupSchema = new Schema({
  merchantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'item' },
  name: { type: String, required: true },
  itemIds: { type: [Schema.Types.ObjectId] },
});


const merchantItemSchema = new Schema({
    merchantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'item', index: true },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    description: { type: String, required: true },
    steps: { type: [singleChoiceItemStepSchema | multiChoiceItemStepSchema], default: [] },
}, { timestamps: true });


const merchantSchema = new Schema({
  name: { type: String, required: true },
  hero: { type: String, required: true },
  category: { type: String, required: true },
  email:{ type: String, required: true , unique:true},
  password:{ type: String, required: true},
  cuisine: { type: String },
  rating: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0.99 },
  isActive:{type: Boolean, default: false},
  status: {type: String,required: true ,default:"pending" },
  affordability: { type: String, default: '£' },
  deliveryPeriod: { type: String, default: '20-20 Min' },
  city: { type: String, required: true },
  street: { type: String, required: true },
  country: { type: String ,required: true},
  postcode: { type: String, required: true },
  longitude: { type: Number, required: true},
  latitude: { type: Number, required: true },
}, { timestamps: true });




// JWT TOKEN
merchantSchema.methods.getJWTToken = function () {
  return jwt.sign(
  {
      id: this._id,
      email: this.email,
      longitude: this.longitude,
      latitude: this.latitude,
      isActive: this.isActive,
    
  },
  process.env.JWT_SECRET,
  {
  expiresIn: process.env.JWT_EXPIRE,
  });
};




const Merchant = mongoose.model('Merchant', merchantSchema);
const ItemGroup = mongoose.model('Item_group', itemGroupSchema);
const MultiChoiceItemStep = mongoose.model('Multi_choice_item_step', multiChoiceItemStepSchema);
const SingleChoiceItemStep = mongoose.model('Single_choice_item_step', singleChoiceItemStepSchema);
const StepOption = mongoose.model('Step_option', stepOptionSchema);
const MerchantItem = mongoose.model('Merchant_item', merchantItemSchema);


module.exports = {
  Merchant,
  ItemGroup,
  MerchantItem,
  StepOption,
  MultiChoiceItemStep,
  SingleChoiceItemStep
};

