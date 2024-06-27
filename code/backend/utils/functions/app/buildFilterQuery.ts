export const buildFilterQuery = (name: string, bodyPart: string, equipment: string, target: string) => {
    const query: any = {};

    if (name !== "") {
      query.name = { $regex: name.toLowerCase() };
    }
    if (bodyPart !== "") {
        query.bodyPart = { $regex: bodyPart.toLowerCase() };
    }
    if (equipment !== "") {
        query.equipment = { $regex: equipment.toLowerCase() };
    }
    if (target !== "") {
        query.target = { $regex: target.toLowerCase() };
    }

    return query;
}