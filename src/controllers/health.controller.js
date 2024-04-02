const getHealth = async (req, res) => {
    res.status(200).send({ message: "Health Route is OK" });
  };
  
module.exports = {
  getHealth
}