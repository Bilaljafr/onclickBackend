import  express  from "express";
import mongoose from "mongoose";
const router = express.Router();
const health = mongoose.connection.collection('HealthPlan');
router.get('/', async(req, res)=>{
   
   
   
   
    const HealthPlan = await health.find({}).toArray();
    // res.status(200).send({"message": HealthPlan});

    const age = 27; // The customer's age





    // Assuming the data is stored in a variable called 'data'
    console.log(HealthPlan[0].company_policies[0])

    const companyPolicies = HealthPlan[0].company_policies;
    
    // Find the policy for the company and entity you're interested in (e.g., "UIC" and "Rose")
    const results = [];

    // Iterate through each company and entity
    companyPolicies.forEach(company => {
      const companyName = company.company_name;
      
      company.entity_policies.forEach(entity => {
       
  
        
        // Find the age-specific amount for the given age (age 18 in this case)
        const ageAmountRange = entity.age_amount_ranges.find(range => age >= range.min_age && age <= range.max_age);
        
        if (ageAmountRange) {
          const ageAmount = ageAmountRange.amount;
          delete entity.age_amount_ranges
          results.push({
            companyName,
            entity,
            ageAmount,
           
          });
        }
      });
    });
    
    // Display the results
    results.forEach(result => {
        delete result.age_amount_ranges
        
    });
    res.status(200).send({'message':results})
    
})
export default router;