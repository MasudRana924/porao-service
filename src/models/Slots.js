const Slots = require("../schema/slotsSchema");
const createSlots=async(data)=>{
    const newSlot = new Slots(data);
    const createdSlot = await newSlot.save();
    return createdSlot;
};
module.exports={
    createSlots 
}