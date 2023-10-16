export const filter = (input) => {
    // input es un objeto que puede contener atributos de tipo string, ID, number o array

    let query = {}

    Object.keys(input).forEach((key) => {
        const value = input[key];
    
        if (typeof value === 'number') {
          query[key] = { $gte: value };
        } else if (Array.isArray(value)) {
          query[key] = { $in: value };
        } else if (typeof value === 'string') {
          if (value.match(/^[0-9a-fA-F]{24}$/)) {
            // Si es un ID de Mongoose, usar $eq
            query[key] = { $eq: value };
          } else {
            // Si es un string, aplicar búsqueda con expresión regular
            query[key] = { $regex: `.*${value}.*`, $options: 'i' };
          }
        }
      });

      return query
}