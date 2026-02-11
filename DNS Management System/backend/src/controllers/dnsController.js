import getExternalDnsRecords  from '../services/dnsService.js';

export const fetchDnsRecords = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;

    let data = await getExternalDnsRecords({
      type,
      page:Number(page),
      limit:Number(limit)
    });
    if(data.length > 0){
      res.json(data);
    }else{
      res.status(400).send("DNS Record with given type does not exist OR Invalid DNS Record type");
    }
    
    console.log("Fetched DNS records successfully");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch DNS records" });
    console.error("REAL ERROR:", error.response?.data || error.message);
    throw error; 
  }
};
