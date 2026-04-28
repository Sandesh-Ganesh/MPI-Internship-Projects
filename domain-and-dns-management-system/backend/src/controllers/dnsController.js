// import getExternalDnsRecords  from '../services/cloudflareService.js' 
import DNSRecord from "../models/DNSRecord.js"
import Domain from "../models/Domain.js"
import { getDnsRecords} from '../services/dnsService.js'
import { syncAllDomainsDnsRecords, syncDnsRecords } from "../services/dnsSyncService.js"

export const getAllDnsRecords = async (req, res) => {
  try {
    const records = await DNSRecord.findAll({
       include: [
        {
          model: Domain,
          as: "domain",
          attributes: ["domain_id", "domain_name"],
        },
      ],
  })

    return res.status(200).json(records)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
export const fetchDnsRecords = async (req, res) => {
  try {
    const { domainId } =  req.params
    const { type, page = 1, limit = 10 } = req.query

    let data = await getDnsRecords({
      domainId,
      type,
      page:Number(page),
      limit:Number(limit)
    })

    if(data.length > 0){
     return  res.status(200).json(data)
    }else{
      return res.status(400).json(
        {
          message:"DNS Record with given type does not exist OR Invalid DNS Record type"
        }) 
    }
  } catch (error) {
    // console.error(error.response?.data || error.message) 
    res.status(500).json(
      {message:error}//, error: "Failed to fetch DNS records" }
    ) 
    // console.error("REAL ERROR:", error.response?.data || error.message) 
    // throw error  
  }
} 

// Get DNS from DB
export const getDnsRecordsByDomain = async(req,res)=>{
  try{

    const {domainId} = req.params

    const records = await DNSRecord.findAll({
      where:{domain_id: domainId}
    })

    return res.status(200).json(records)

  }catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}


export const syncAllDomains = async (req, res) => {
  try {

    syncAllDomainsDnsRecords()
      .then(result => {
        console.log("Sync completed:", result) 
      })
      .catch(err => {
        console.error("Sync failed:", err.message) 
      }) 

    return res.json({
      message: "Sync started in background"
    }) 

  } catch (error) {
    return res.status(500).json({
      error: error.message
    }) 
  }
}

export const syncDomain = async ( req,res ) =>{
   try {
    const { domainId } = req.params

    syncDnsRecords(domainId)
      .then(result => {
        console.log("Sync completed:", result) 
      })
      .catch(err => {
        console.error("Sync failed:", err.message) 
      }) 

    return res.json({
      message: "Sync started in background"
    }) 

  } catch (error) {
    return res.status(500).json({
      error: error.message
    }) 
  }
}