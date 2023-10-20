
import Rate from "../Models/Rate.js"
import { filter } from "../helpers/Filter.js"
import User from "../Models/User.js"
import { verifyToken } from "../utils/Token.js"
import { getModel } from "../helpers/models.js"



const updateCounter = async (rating) => {

    const { entityID, entityType, status, rate } = rating;
  
    try {
      const entity = await getModel(entityType).findById(entityID);

      entity.rateCount += status !== 'DELETED' ? 1 : -1;
      entity.rateTotal += status !== 'DELETED' ? rate : -rate;
      entity.rating = entity.rateTotal / entity.rateCount;
      await entity.save();
      return entity
    } catch (error) {
      console.error('Error updating rate count:', error.message || error);
    }
  };


// Querys
const getRates = async (_, { input }) => {
    console.log(input)
    const query = filter(input)
    const rates = await Rate.find(query).populate({
        path: 'entityID'
    }).populate({
        path: 'user',
        populate: {
          path: 'role country'
        }
    })

    return rates
  }
  

  
const getRate = async (_, { entityID }, { token }) => { 

    const userToken = verifyToken(token)
    const rate = await Rate.findOne({user: userToken.id, entityID}).populate({
      path: 'entityID'
  }).populate({
      path: 'user',
      populate: {
        path: 'role country'
      }
  })

  
    return rate 
  }




// Mutations
const createRate = async (_, { input }, { token }) => {
    try {
        if(!input) throw new Error("No se ha enviado el input")
        const userToken = verifyToken(token)
        const newRate = new Rate({...input, user: userToken.id})
        await newRate.save()

        newRate.entityID = await getModel(newRate.entityType).findById(newRate.entityID)
        newRate.user = await User.findById(newRate.user).populate({
            path: 'role country'
        })
        await updateCounter(newRate)

        return newRate
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el Rate: "+error.message || error)
    }
}

const updateRate = async (_, { entityID, rate }, { token }) =>{
    // genera este codigo
    const userToken = verifyToken(token);
    const rated = await Rate.findOne({entityID, user: userToken.id});
    if(!rated) throw new Error("No se encontro el rate")


    const rateDiff = rate - rated.rate;
    rated.rate = rate;
    rated.status = 'EDITED'
    await rated.save();

    const entity = await getModel(rated.entityType).findById(rated.entityID);

    entity.rateTotal += rateDiff;
    entity.rating = entity.rateTotal / entity.rateCount;

    entity.save();

    rated.entityID = entity

    rated.user = await User.findById(rated.user).populate({
            path: 'role country'
        })
    
    return rated

}

const deleteRate = async (_, { entityID }, { token }) => {
    try {
        const userToken = verifyToken(token)
        const rate = await Rate.findOneAndDelete({
            user: userToken.id,
            entityID
        }, {new: true}).populate({
            path: 'entityID'
        }).populate({
            path: 'user',
            populate: {
              path: 'role country'
            }
        })
        if(!rate) throw new Error("No se ha encontrado el Rate")
        rate.status = 'DELETED'
        updateCounter(rate)
        return rate
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el Rate: "+error.message || error)
    }
}

  export const rateResolvers = {
    Query: {
        getRates,
        getRate
    },
    Mutation: {
        createRate,
        updateRate,
        deleteRate
    }
}