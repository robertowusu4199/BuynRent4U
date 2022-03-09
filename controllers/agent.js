const AgentModel = require("../models/agent")

const { validationResult } = require("express-validator")


const listAgentsController = (req, res) => {
    //Find agent by id

    const {id} = req.params

    if(id){

        AgentModel.find({ _id: id}).then(agents => {
            res.json({ data: agents })
        }).catch(err => console.log(err))
    } else {
        AgentModel.find().then(agents => {
            res.json({ data: agents })
        }).catch(err => console.log(err))
    }
}



const createAgentController = (req, res) => {

    //Validation checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ message: errors.array()[0].msg })
    }

    //Create an agent
    const { firstname, lastname, phone, location, email, gps, bio } = req.body

    const agent = new AgentModel({ firstname, lastname, phone, location, email, gps, bio })

    agent.save().then(result => {

        res
        .status(201)
        .json({ message: "create successful", data: result })

    }).catch(error => console.log(error))

}


const updateAgentController = (req, res) => {
    //Agent update
    const {id, location, phone, gps} = req.body 
    
    AgentModel.findById({_id: id}).then(agent => {
        if(agent){
            agent.location = location;
            agent.phone = phone;
            agent.gps = gps;

            agent.save()
            
            res
            .status(202)
            .json({message: "update successful", data: agent})
        }

        //res.json({message: "Cannot be found"})

    }).catch(err => console.log(err))

}



module.exports = {
    listAgentsController,
    createAgentController,
    updateAgentController,
}