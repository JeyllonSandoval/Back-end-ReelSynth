
export const filter = (input: {[key: string]: any}) => {
    if(!input) return {}
    let query:{[key:string]:any} = {}
    
    Object.keys(input).forEach((key) => {
        const value = input[key];
        console.log(`${key}: ${value}`)
          if (typeof value === 'number') {
            query[key] = { $gte: value };
          } else if (Array.isArray(value)) {
            query[key] = { $in: value };
          } else if (typeof value === 'string') {
            if (value.match(/^[0-9a-fA-F]{24}$/)) { // Esto es para identificar si es un ID de mongo
              query[key] = { $eq: value };
            } else {
              query[key] = { $regex: `.*${value}.*`, $options: 'i' };
            }
          }
      });

      return query
}